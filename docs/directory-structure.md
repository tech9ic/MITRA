# MITRA App Directory Structure

```
MITRA/
├── app/                    # Main app configuration and navigation
├── assets/                 # Static assets (images, fonts, etc.)
├── components/            # Reusable UI components
│   ├── common/           # Shared components
│   ├── home/             # Home screen components
│   ├── profile/          # Profile screen components
│   ├── rural/            # Rural services components
│   └── urban/            # Urban services components
├── constants/             # App-wide constants and configurations
├── docs/                  # Documentation files
├── hooks/                 # Custom React hooks
├── screens/               # Main screen components
│   ├── home/             # Home screen
│   ├── profile/          # Profile screen
│   ├── rural/            # Rural services screens
│   └── urban/            # Urban services screens
├── scripts/               # Build and utility scripts
├── .expo/                 # Expo configuration
├── node_modules/          # Dependencies
├── app.json              # Expo app configuration
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Dependency lock file
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
```

## Key Directories

### app/
Contains the main app configuration, navigation setup, and root layout components.

### components/
Reusable UI components organized by feature:
- common/: Shared components used across the app
- home/: Components specific to the home screen
- profile/: Components for user profile
- rural/: Components for rural services
- urban/: Components for urban services

### screens/
Main screen components organized by feature:
- home/: Home screen implementation
- profile/: Profile screen implementation
- rural/: Rural services screens
- urban/: Urban services screens

### constants/
App-wide constants, theme configurations, and other static data.

### hooks/
Custom React hooks for shared logic and state management.

### assets/
Static assets including images, fonts, and other media files. 