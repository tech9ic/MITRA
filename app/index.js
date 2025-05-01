import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  BackHandler,
  Alert,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Calendar from "./components/Calendar";
import ProfileSidebar from "./components/ProfileSidebar";
import { useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import RuralServices from "./components/RuralServices";
import database from "./utils/database";
import cropSchedules from "./crop-planner/CropSchedules";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";

const farmingTips = [
  "Regularly test your soil to understand its nutrient content and pH level.",
  "Practice crop rotation to maintain soil fertility and reduce pest and disease cycles.",
  "Use organic fertilizers like compost and manure to enrich the soil.",
  "Implement efficient water management techniques like drip irrigation.",
  "Use natural pest control methods such as neem oil and intercropping.",
  "Choose high-yield and disease-resistant seed varieties.",
  "Sow seeds at the right time to ensure optimal growth and yield.",
  "Regularly remove weeds to prevent them from competing with crops for nutrients.",
  "Use mulch to retain soil moisture and suppress weed growth.",
  "Practice intercropping to maximize land use and reduce pest infestation.",
  "Diversify crops to reduce risk and improve soil health.",
  "Utilize mobile apps and online resources for weather forecasts and market prices.",
  "Combine crop cultivation with livestock and fish farming for better resource utilization.",
  "Grow green manure crops to improve soil structure and fertility.",
  "Integrate trees and shrubs into farming systems for additional income and environmental benefits.",
  "Implement soil conservation practices like contour plowing and terracing.",
  "Properly store and process crops to reduce post-harvest losses.",
  "Stay informed about market trends and demand to get better prices for your produce.",
  "Take advantage of government schemes and subsidies for farmers.",
  "Attend agricultural training programs and workshops to learn new techniques.",
  "Consider getting organic certification for better market access and prices.",
  "Integrate livestock into your farming system for additional income and manure.",
  "Grow climate-resilient crop varieties to withstand changing weather patterns.",
  "Use efficient and modern machinery to save time and labor.",
  "Collaborate with other farmers for bulk purchasing and selling.",
  "Insure your crops to protect against natural disasters and unforeseen events.",
  "Regularly aerate the soil to improve root growth and nutrient uptake.",
  "Use precision farming techniques to optimize inputs and increase yields.",
  "Maintain biodiversity on your farm to promote ecological balance.",
  "Use renewable energy sources like solar panels for irrigation and other needs.",
  "Implement vermicomposting to produce high-quality organic fertilizer.",
  "Monitor crops regularly for signs of disease and take prompt action.",
  "Explore agro-tourism opportunities to diversify income sources.",
  "Implement rainwater harvesting systems to conserve water.",
  "Use soil amendments like gypsum and lime to improve soil structure.",
  "Allow fields to lie fallow periodically to restore soil fertility.",
  "Use biopesticides to control pests without harming beneficial insects.",
  "Treat seeds before sowing to protect against soil-borne diseases.",
  "Establish direct market linkages to reduce dependency on middlemen.",
  "Invest in agro-processing units to add value to your produce.",
  "Implement balanced nutrient management practices for optimal crop growth.",
  "Use soil moisture sensors to optimize irrigation schedules.",
  "Grow cover crops to protect soil from erosion and improve fertility.",
  "Implement IPM strategies to manage pests sustainably.",
  "Use crop residues as mulch or fodder instead of burning them.",
  "Maintain detailed records of farm activities and expenses for better management.",
  "Participate in community seed banks to preserve local seed varieties.",
  "Follow agro-climate advisories for timely agricultural operations.",
  "Utilize soil health cards to guide fertilizer application.",
  "Adopt sustainable farming practices to ensure long-term productivity and environmental health.",
];

const Home = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [activities, setActivities] = useState([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  const [showSoilFeature, setShowSoilFeature] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const [showBottomHalf, setShowBottomHalf] = useState(false);
  const [todayWeather, setTodayWeather] = useState(null);
  const [dailyTip, setDailyTip] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastWeatherUpdate = useRef(null);

  const scrollViewRef = useRef(null);
  const { t } = useTranslation();

  // Load activities for calendar
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const plans = await database.getAllCropPlans(user?.id);
      const newMarkedDates = {};
      const newActivitiesByDate = {};

      plans.forEach((plan) => {
        const cropSchedule = cropSchedules[plan.crop_value];
        if (!cropSchedule || !cropSchedule.activities) {
          console.log(`No schedule found for crop: ${plan.crop_value}`);
          return;
        }

        const activities = cropSchedule.activities;

        activities.forEach((activity) => {
          const activityDate = new Date(plan.planting_date);
          activityDate.setDate(activityDate.getDate() + activity.daysFromStart);
          const dateString = activityDate.toISOString().split("T")[0];

          // Initialize the date in newMarkedDates if it doesn't exist
          if (!newMarkedDates[dateString]) {
            newMarkedDates[dateString] = {
              marked: true,
              dots: [],
              customStyles: {
                container: {},
                text: {},
              },
            };
          }

          // Add a dot for the activity based on importance
          let dotColor;
          switch (activity.importance) {
            case "critical":
            case "high":
              dotColor = "#FF5722";
              break;
            case "medium":
              dotColor = "#FFC107";
              break;
            case "low":
              dotColor = "#4CAF50";
              break;
            default:
              dotColor = "#2196F3";
          }

          newMarkedDates[dateString].dots.push({
            color: dotColor,
            key: `${plan.id}-${activity.name}`,
          });

          // Store activity details for the date
          if (!newActivitiesByDate[dateString]) {
            newActivitiesByDate[dateString] = [];
          }
          newActivitiesByDate[dateString].push({
            ...activity,
            cropName: plan.crop_name,
            planId: plan.id,
          });
        });
      });

      setMarkedDates(newMarkedDates);
      setActivities(newActivitiesByDate);
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  };

  const handleDatePress = (day) => {
    if (day && day.dateString) {
      setSelectedDate(day.dateString);
      const dateActivities = activities[day.dateString] || [];
      setSelectedDayInfo({
        date: day.dateString,
        activities: dateActivities,
        weather: {
          temperature: "28°C",
          condition: "Sunny",
          humidity: "65%",
        },
      });
    } else {
      setSelectedDate(null);
      setSelectedDayInfo(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Navigation functions
  const navigateToPlanner = () => {
    router.push("/crop-planner");
  };

  const navigateToWeather = () => {
    router.push("/weather");
  };

  const navigateToMarket = () => {
    router.push("/market-prices");
  };

  const navigateToHelp = () => {
    router.push("/help");
  };

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (showSoilFeature) {
          setShowSoilFeature(false);
          return true;
        }
        if (activeTab !== "home") {
          setActiveTab("home");
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [showSoilFeature, activeTab]);

  // Toggle search bar animation
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    Animated.spring(searchBarWidth, {
      toValue: isSearchExpanded ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const scrollToSection = (isBottom) => {
    setShowBottomHalf(isBottom);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: isBottom ? 500 : 0,
        animated: true,
      });
    }
  };

  const loadWeatherData = async () => {
    try {
      // Check if we have cached data that's less than 30 minutes old
      const now = new Date();
      if (
        lastWeatherUpdate.current &&
        now - lastWeatherUpdate.current < 30 * 60 * 1000 &&
        todayWeather
      ) {
        return; // Use cached data
      }

      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=82c7bcb3829c4538820185422252404&q=Bhubaneswar"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      if (data && data.current) {
        const newWeatherData = {
          temperature: `${data.current.temp_c}°C`,
          rain:
            data.current.precip_mm > 0 ? `${data.current.precip_mm}mm` : "0mm",
          condition: data.current.condition.text,
          humidity: `${data.current.humidity}%`,
          windSpeed: `${data.current.wind_kph} km/h`,
        };
        setTodayWeather(newWeatherData);
        lastWeatherUpdate.current = now;
      } else {
        setError("No weather data available");
      }
    } catch (err) {
      setError("Error loading weather data");
      console.error("Weather data error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load weather data on mount and set up refresh interval
  useEffect(() => {
    loadWeatherData();

    // Set up refresh interval (every 30 minutes)
    const interval = setInterval(loadWeatherData, 30 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * farmingTips.length);
    setDailyTip(farmingTips[randomIndex]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.welcomeText}>{t("welcome")}</Text>
          <Text style={styles.userName}>{user?.name || t("Farmer")}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => setShowProfile(true)}
        >
          <Ionicons name="person-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarWrapper}>
        <Calendar
          onDayPress={handleDatePress}
          markedDates={markedDates}
          markingType="custom"
          theme={{
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#333",
            selectedDayBackgroundColor: "#4CAF50",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#4CAF50",
            dayTextColor: "#333",
            textDisabledColor: "#d9d9d9",
            dotColor: "#4CAF50",
            selectedDotColor: "#ffffff",
            arrowColor: "#4CAF50",
            monthTextColor: "#333",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 18,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View style={styles.weatherSection}>
              <View style={styles.weatherHeader}>
                <Ionicons name="partly-sunny" size={24} color="#FF9800" />
                <Text style={styles.overviewTitle}>{t("Weather Updates")}</Text>
              </View>
              <View style={styles.weatherContent}>
                {loading ? (
                  <ActivityIndicator size="small" color="#4CAF50" />
                ) : error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={loadWeatherData}>
                      <Text style={styles.retryText}>{t("retry")}</Text>
                    </TouchableOpacity>
                  </View>
                ) : todayWeather ? (
                  <>
                    <View style={styles.weatherInfo}>
                      <Ionicons name="thermometer" size={20} color="#2196F3" />
                      <Text style={styles.weatherText}>
                        {todayWeather.temperature}
                      </Text>
                    </View>
                    <View style={styles.weatherInfo}>
                      <Ionicons name="water" size={20} color="#2196F3" />
                      <Text style={styles.weatherText}>
                        {todayWeather.rain}
                      </Text>
                    </View>
                    <View style={styles.weatherInfo}>
                      <Ionicons
                        name="water-outline"
                        size={20}
                        color="#2196F3"
                      />
                      <Text style={styles.weatherText}>
                        {todayWeather.humidity}
                      </Text>
                    </View>
                    <View style={styles.weatherInfo}>
                      <Ionicons
                        name="speedometer-outline"
                        size={20}
                        color="#2196F3"
                      />
                      <Text style={styles.weatherText}>
                        {todayWeather.windSpeed}
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </View>

          {/* Today's Events Section */}
          <View style={styles.eventsSection}>
            <View style={styles.eventsHeader}>
              <Ionicons name="calendar" size={20} color="#4CAF50" />
              <Text style={styles.eventsTitle}>
                {selectedDate ? formatDate(selectedDate) : t("Today's Events")}
              </Text>
            </View>
            <View style={styles.eventsContent}>
              {selectedDayInfo?.activities?.length > 0 ? (
                selectedDayInfo.activities.map((activity, index) => (
                  <View key={index} style={styles.eventItem}>
                    <Ionicons
                      name={
                        activity.importance === "high"
                          ? "alert-circle"
                          : activity.importance === "medium"
                          ? "time"
                          : "checkmark-circle"
                      }
                      size={16}
                      color={
                        activity.importance === "high"
                          ? "#FF5722"
                          : activity.importance === "medium"
                          ? "#FFC107"
                          : "#4CAF50"
                      }
                    />
                    <Text style={styles.eventText}>
                      {activity.name} - {activity.cropName}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.noEvents}>
                  <Ionicons name="happy" size={20} color="#4CAF50" />
                  <Text style={styles.noEventsText}>
                    {selectedDate
                      ? t("No events scheduled for this date.")
                      : t("No events today. Enjoy your time with your family!")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Today's Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>{t("todayTip")}</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color="#4CAF50" />
            <Text style={styles.tipText}>{dailyTip}</Text>
          </View>
        </View>

        {/* Rural Services */}
        <RuralServices />
      </ScrollView>

      {/* Navigation Arrow */}
      <TouchableOpacity
        style={styles.navigationArrow}
        onPress={() => scrollToSection(!showBottomHalf)}
      >
        <Ionicons
          name={showBottomHalf ? "chevron-up" : "chevron-down"}
          size={24}
          color="#4CAF50"
        />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => setActiveTab("home")}
        >
          <Ionicons name="home" size={24} color="#4CAF50" />
          <Text style={[styles.navText, styles.activeNavText]}>
            {t("Home")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToPlanner}>
          <Ionicons name="calendar" size={24} color="#666" />
          <Text style={styles.navText}>{t("Planner")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToWeather}>
          <Ionicons name="partly-sunny" size={24} color="#666" />
          <Text style={styles.navText}>{t("Weather")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToMarket}>
          <Ionicons name="trending-up" size={24} color="#666" />
          <Text style={styles.navText}>{t("Market")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHelp}>
          <Ionicons name="help-circle" size={24} color="#666" />
          <Text style={styles.navText}>{t("Help")}</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Sidebar */}
      <ProfileSidebar
        isVisible={showProfile}
        onClose={() => setShowProfile(false)}
        onLogout={handleLogout}
        userData={user}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 999,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  calendarWrapper: {
    position: "relative",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navigationArrow: {
    position: "absolute",
    bottom: 70,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1000,
  },
  overviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    margin: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewHeader: {
    marginBottom: 15,
  },
  weatherSection: {
    marginBottom: 15,
  },
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  weatherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    minHeight: 40,
    alignItems: "center",
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  eventsSection: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  eventsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  eventsContent: {
    minHeight: 60,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eventText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  noEvents: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  noEventsText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    textAlign: "center",
  },
  tipsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  activeNavItem: {
    backgroundColor: "#e8f5e9",
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  activeNavText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  weatherContainer: {
    flexDirection: "row",
    marginTop: 4,
    gap: 12,
  },
  weatherItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
  retryText: {
    color: "#4CAF50",
    textDecorationLine: "underline",
    fontSize: 14,
  },
});
