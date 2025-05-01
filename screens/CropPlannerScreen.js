import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, Modal, FlatList, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as database from '../app/utils/database';
import { useAuth } from '../app/context/AuthContext';
import broadCropCategoriesMultiLang from '../app/crop-planner/CropTypes';
import DistrictsSoilType from '../app/crop-planner/DistrictsSoilType';
import DatePicker from '../app/components/DatePicker';
import cropSchedules from '../app/crop-planner/CropSchedules';

// Custom Picker Component
const CustomPicker = ({ 
  label, 
  selectedValue, 
  onValueChange, 
  items = [], 
  enabled = true,
  placeholder = "Select an option"
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const displayLabel = items.find(item => (item.value || item) === selectedValue)?.label || selectedValue || placeholder;

  return (
    <View style={pickerStyles.inputGroup}>
      {label && <Text style={pickerStyles.label}>{label}</Text>}
      <TouchableOpacity
        style={[pickerStyles.pickerButton, !enabled && pickerStyles.disabledPicker]}
        onPress={() => enabled && setShowPicker(true)}
        disabled={!enabled}
      >
        <Text 
          style={[pickerStyles.pickerText, !selectedValue && pickerStyles.placeholderText]}
          numberOfLines={1}
        >
          {displayLabel}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#6c757d" />
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <TouchableOpacity 
          style={pickerStyles.modalBackdrop}
          activeOpacity={1} 
          onPressOut={() => setShowPicker(false)}
        >
          <View style={pickerStyles.pickerModal} onStartShouldSetResponder={() => true}>
            <View style={pickerStyles.pickerHeader}>
              <Text style={pickerStyles.pickerTitle}>{label || 'Select an option'}</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={pickerStyles.closeIcon}>
                <MaterialIcons name="close" size={24} color="#6c757d" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              keyExtractor={(item, index) => item.value?.toString() || item?.toString() || index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={pickerStyles.pickerItem}
                  onPress={() => {
                    onValueChange(item.value || item);
                    setShowPicker(false);
                  }}
                >
                  <Text style={pickerStyles.pickerItemText}>
                    {item.label || item} 
                  </Text>
                  {(item.value || item) === selectedValue && (
                    <MaterialIcons name="check" size={20} color="#28a745" />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={pickerStyles.separator} />}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Styles for CustomPicker
const pickerStyles = StyleSheet.create({
  inputGroup: {
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#495057',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    minHeight: 44,
  },
  disabledPicker: {
    backgroundColor: '#e9ecef',
    opacity: 0.7,
  },
  pickerText: {
    fontSize: 16,
    color: '#343a40',
    flex: 1,
    marginRight: 8,
  },
  placeholderText: {
    color: '#6c757d',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '70%', 
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
  },
  closeIcon: {
    padding: 4,
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pickerItemText: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
    marginRight: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginHorizontal: 16,
  },
});

export default function CropPlannerScreen({ route }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('running');
  const [plans, setPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [landSize, setLandSize] = useState('');
  const [landUnit, setLandUnit] = useState('hectare');
  const [plantingDate, setPlantingDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Get crop categories
  const cropCategories = broadCropCategoriesMultiLang?.map(cat => ({
    value: cat.category.en,
    label: cat.category.en
  })) || [];

  // Get crops for selected category
  const selectedCategoryCrops = selectedCategory 
    ? broadCropCategoriesMultiLang
        .find(cat => cat.category.en === selectedCategory)
        ?.crops?.flatMap(crop => {
          if (crop.subcategory) {
            return crop.items.map(item => ({
              value: item.value,
              label: item.label.en
            }));
          }
          return {
            value: crop.value,
            label: crop.label.en
          };
        }) || []
    : [];

  // Get districts
  const districts = Object.keys(DistrictsSoilType || {}).map(d => ({ value: d, label: d }));

  useEffect(() => {
    loadPlans();
  }, [activeTab]);

  const loadPlans = async () => {
    if (!user) return;
    const userPlans = await database.getCropPlans(user.id, activeTab);
    setPlans(userPlans || []);
  };

  const handleAddPlan = async () => {
    try {
      // Validate required fields
      if (!selectedCategory || !selectedCrop || !selectedDistrict || !landSize || !plantingDate) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      // Get the crop schedule
      const cropSchedule = cropSchedules[selectedCrop];
      if (!cropSchedule) {
        Alert.alert('Error', 'No schedule found for selected crop');
        return;
      }

      // Create the plan
      const planData = {
        userId: user.id,
        crop_category: selectedCategory,
        crop_name: selectedCategoryCrops.find(c => c.value === selectedCrop)?.label || selectedCrop,
        crop_value: selectedCrop,
        district: selectedDistrict,
        land_size: parseFloat(landSize),
        land_unit: landUnit,
        planting_date: plantingDate,
        status: 'running'
      };

      // Create plan and get the ID
      const newPlan = await database.createCropPlan(planData);
      
      if (!newPlan) {
        Alert.alert('Error', 'Failed to create crop plan');
        return;
      }

      // Add activities based on the schedule
      for (const activity of cropSchedule.activities) {
        const activityDate = new Date(plantingDate);
        activityDate.setDate(activityDate.getDate() + activity.daysFromStart);
        
        await database.addActivity(newPlan.id, {
          name: activity.name,
          scheduled_date: activityDate.toISOString().split('T')[0],
          icon: activity.icon || '',
          importance: activity.importance || 'medium',
          notes: activity.notes || ''
        });
      }

      // Reset form
      setSelectedCategory('');
      setSelectedCrop('');
      setSelectedDistrict('');
      setLandSize('');
      setLandUnit('hectare');
      setPlantingDate('');
      setShowDatePicker(false);
      
      // Reload plans
      loadPlans();
      Alert.alert('Success', 'Crop plan created successfully with activities!');
    } catch (error) {
      console.error('Error creating plan:', error);
      Alert.alert('Error', 'Failed to create crop plan');
    }
  };

  const handleDeletePlan = async (planId) => {
    Alert.alert(
      'Delete Plan',
      'Are you sure you want to delete this plan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await database.deleteCropPlan(planId);
            if (result) {
              loadPlans();
              setSelectedPlan(null);
            }
          }
        }
      ]
    );
  };

  const handleUpdateStatus = async (planId, newStatus) => {
    const result = await database.updateCropPlanStatus(planId, newStatus);
    if (result) {
      loadPlans();
      setSelectedPlan(null);
    }
  };

  const handleDateSelect = (day) => {
    setPlantingDate(day.dateString);
    setShowDatePicker(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Select planting date';
    try {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  // Handle hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (showDatePicker) {
          setShowDatePicker(false);
          return true; // Prevent default behavior
        }
        return false; // Let default behavior happen
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [showDatePicker])
  );

  // Safe navigation function
  const handleBackNavigation = () => {
    if (navigation) {
      if (showDatePicker) {
        setShowDatePicker(false);
      } else {
        navigation.goBack();
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
        <View style={styles.header}>
        <TouchableOpacity onPress={handleBackNavigation} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Planner</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Create New Plan</Text>
          <View style={styles.form}>
            <CustomPicker
              label="Crop Category"
              selectedValue={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedCrop('');
              }}
              items={cropCategories}
              placeholder="Select Category"
            />

            <CustomPicker
              label="Crop"
              selectedValue={selectedCrop}
              onValueChange={setSelectedCrop}
              items={selectedCategoryCrops}
              enabled={!!selectedCategory}
              placeholder="Select Crop"
            />

            <CustomPicker
              label="District"
              selectedValue={selectedDistrict}
              onValueChange={setSelectedDistrict}
              items={districts}
              placeholder="Select District"
            />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Land Size</Text>
              <View style={styles.landSizeInputContainer}>
                <TextInput
                  style={styles.landSizeValueInput}
                  keyboardType="numeric"
                  value={landSize}
                  onChangeText={setLandSize}
                  placeholder="Enter size"
                />
                <View style={styles.landUnitPickerContainer}>
                    <CustomPicker
                    selectedValue={landUnit}
                    onValueChange={setLandUnit}
                    items={[{value: 'hectare', label: 'hectare'}, {value: 'acre', label: 'acre'}, {value: 'guntha', label: 'guntha'}, {value: 'sqmeter', label: 'sq. meter'}]}
                    />
                </View>
              </View>
        </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Planting Date</Text>
              <TouchableOpacity
                style={styles.dateInputButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.dateText, !plantingDate && styles.datePlaceholder]}>
                  {formatDate(plantingDate)}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.datePickerModal}>
                    <View style={styles.datePickerHeader}>
                      <Text style={styles.datePickerTitle}>Select Planting Date</Text>
                      <TouchableOpacity 
                        onPress={() => setShowDatePicker(false)}
                        style={styles.closeButton}
                      >
                        <MaterialIcons name="close" size={24} color="#333" />
                      </TouchableOpacity>
                    </View>
                    <DatePicker
                      onDateSelect={handleDateSelect}
                      selectedDate={plantingDate}
                    />
                  </View>
                </View>
              </Modal>
            )}

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleAddPlan}
              disabled={showDatePicker}
            >
              <Text style={styles.createButtonText}>Create Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Plans Section */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Your Plans</Text>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'running' && styles.activeTab]}
              onPress={() => setActiveTab('running')}
            >
              <Text style={[styles.tabText, activeTab === 'running' && styles.activeTabText]}>
                Running
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'previous' && styles.activeTab]}
              onPress={() => setActiveTab('previous')}
            >
              <Text style={[styles.tabText, activeTab === 'previous' && styles.activeTabText]}>
                Previous
              </Text>
            </TouchableOpacity>
          <TouchableOpacity
              style={[styles.tab, activeTab === 'future' && styles.activeTab]}
              onPress={() => setActiveTab('future')}
          >
              <Text style={[styles.tabText, activeTab === 'future' && styles.activeTabText]}>
                Future
              </Text>
          </TouchableOpacity>
        </View>

          {/* Plans List */}
          {plans.length === 0 ? (
            <Text style={styles.noPlansText}>No {activeTab} plans found.</Text>
          ) : (
            <View style={styles.plansListContainer}> 
              {plans.map(plan => (
                <View key={plan.id} style={styles.planCard}> 
                  <View style={styles.planHeader}>
                    <Text style={styles.cropName}>{plan.crop_name}</Text>
                    <View style={styles.planActions}>
                      {activeTab === 'running' && (
                        <>
                          <TouchableOpacity onPress={() => handleUpdateStatus(plan.id, 'previous')} style={styles.actionButton}>
                            <MaterialIcons name="stop-circle" size={22} color="#FF5722" />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleUpdateStatus(plan.id, 'future')} style={styles.actionButton}>
                            <MaterialIcons name="schedule" size={22} color="#2196F3" />
                          </TouchableOpacity>
                        </>
                      )}
                      <TouchableOpacity onPress={() => handleDeletePlan(plan.id)} style={styles.actionButton}>
                        <MaterialIcons name="delete-forever" size={22} color="#F44336" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.planDetails}>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>District:</Text> {plan.district}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Land:</Text> {plan.land_size} {plan.land_unit}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Planted:</Text> {formatDate(plan.planting_date)}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
            </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#343a40',
  },
  formSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    margin: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 20,
  },
  form: {
    gap: 18,
  },
  inputGroup: {
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#495057',
  },
  landSizeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  landSizeValueInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  landUnitPickerContainer: {
    flex: 1,
  },
  dateInputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#343a40',
  },
  datePlaceholder: {
      color: '#6c757d',
  },
  createButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  plansSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeTabText: {
    color: '#007bff',
  },
  noPlansText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#6c757d',
  },
  plansListContainer: {
      gap: 12,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  cropName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#343a40',
  },
  planActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
      padding: 4,
  },
  planDetails: {
    gap: 6,
  },
  detailText: {
    fontSize: 14,
      color: '#495057',
  },
  detailLabel: {
      fontWeight: '500',
      color: '#343a40',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 16,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
}); 