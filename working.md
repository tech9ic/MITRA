# MITRA App Documentation

## App Structure and File Purposes

### Core Files

1. `app/index.js`
   - Main entry point of the application
   - Contains the Home screen with weather updates, calendar, and daily tips
   - Handles weather data fetching from weatherapi.com
   - Manages user authentication and navigation
   - Implements translation support for multiple languages

2. `app/components/Calendar.js`
   - Custom calendar component for displaying farming activities
   - Handles date selection and event marking
   - Integrates with crop planning system

3. `app/components/ProfileSidebar.js`
   - User profile management component
   - Handles user authentication and settings
   - Displays user information and preferences

4. `app/components/RuralServices.js`
   - Displays available rural services
   - Provides access to government schemes and farmer groups
   - Shows training programs and helpline information

5. `app/translations/index.js`
   - Contains all translation strings for the app
   - Supports multiple languages (English, Hindi, Odia)
   - Manages text content for all screens and components

6. `app/context/AuthContext.js`
   - Manages user authentication state
   - Handles login, logout, and user session
   - Provides authentication context to the entire app

7. `app/utils/database.js`
   - Handles local data storage
   - Manages weather data caching
   - Stores user preferences and settings

8. `app/crop-planner/CropSchedules.js`
   - Contains crop planning schedules and activities
   - Defines farming activities for different crops
   - Manages crop rotation and planting schedules

## App Workflow

1. **Initialization**
   - App starts from `app/index.js`
   - Checks for user authentication status
   - Loads translations based on user preference
   - Initializes database connections

2. **Home Screen**
   - Displays weather information for current location
   - Shows calendar with farming activities
   - Provides access to rural services
   - Displays daily farming tips

3. **Weather Updates**
   - Fetches real-time weather data from weatherapi.com
   - Displays temperature, precipitation, humidity, and wind speed
   - Updates automatically when the screen loads
   - Allows manual refresh on error

4. **Calendar and Activities**
   - Shows farming activities based on crop schedules
   - Allows date selection for planning
   - Displays important farming events
   - Integrates with crop planning system

5. **Rural Services**
   - Provides access to government schemes
   - Shows available training programs
   - Displays farmer groups and helpline information
   - Connects users with rural resources

6. **User Profile**
   - Manages user authentication
   - Stores user preferences
   - Handles language selection
   - Manages app settings

7. **Data Management**
   - Caches weather data locally
   - Stores user preferences
   - Manages crop planning data
   - Handles offline functionality

## Key Features

1. **Multi-language Support**
   - Supports English, Hindi, and Odia
   - Dynamic language switching
   - Culturally appropriate content

2. **Real-time Weather Updates**
   - Location-specific weather data
   - Multiple weather parameters
   - Offline data caching

3. **Farming Activity Management**
   - Crop-specific schedules
   - Activity tracking
   - Planning and reminders

4. **Rural Services Integration**
   - Government scheme information
   - Training program access
   - Farmer group connectivity

5. **User Authentication**
   - Secure login system
   - Profile management
   - Preference storage

## Technical Implementation

1. **API Integration**
   - Weather API (weatherapi.com)
   - Location services
   - Data caching

2. **State Management**
   - React Context for auth
   - Local state for UI
   - Database for persistence

3. **UI Components**
   - Custom calendar
   - Weather display
   - Service cards
   - Profile sidebar

4. **Data Flow**
   - API → Database → UI
   - User input → Database → API
   - Offline → Online sync

## Dependencies

1. **Core Libraries**
   - React Native
   - Expo
   - React Navigation
   - i18next

2. **UI Components**
   - @expo/vector-icons
   - react-native-calendars
   - react-native-linear-gradient

3. **Data Management**
   - expo-sqlite
   - expo-location
   - axios

## Development Guidelines

1. **Code Organization**
   - Components in `app/components/`
   - Screens in `app/screens/`
   - Utils in `app/utils/`
   - Translations in `app/translations/`

2. **State Management**
   - Use Context for global state
   - Local state for component-specific data
   - Database for persistent storage

3. **API Integration**
   - Implement error handling
   - Cache responses
   - Handle offline scenarios

4. **UI/UX**
   - Follow Material Design
   - Support multiple languages
   - Ensure accessibility

## Future Improvements

1. **Features**
   - Push notifications
   - Offline mode
   - Advanced crop planning
   - Weather alerts

2. **Performance**
   - Image optimization
   - Data caching
   - Lazy loading

3. **User Experience**
   - Dark mode
   - Custom themes
   - Enhanced animations

4. **Integration**
   - More weather sources
   - Additional services
   - Social features 