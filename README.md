#

<div align="center">
   <p>
      <img src="https://img.shields.io/badge/React_Native-Expo-blueviolet.svg?logo=react" alt="React Native">
      <img src="https://img.shields.io/badge/TypeScript-4+-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript">
      <img src="https://img.shields.io/badge/Firebase-Cloud-yellow.svg?logo=firebase" alt="Firebase">
      <img src="https://img.shields.io/badge/OpenWeatherMap-API-orange.svg?logo=OpenWeatherMap&logoColor=white" alt="OpenWeatherMap">
      <img src="https://img.shields.io/badge/i18next-Localization-blue.svg?logo=i18next&logoColor=white" alt="i18next">
      <img src="https://img.shields.io/badge/Android-OS-3DDC84.svg?logo=android&logoColor=white" alt="Android">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
   </p>
   <h1 style="margin-bottom:0.2em; font-size:2.5em;">MITRA - Farmer's Companion 🌱</h1>
   <em>Empowering farmers with real-time agricultural information, crop planning, and market insights.</em>
</div>

---

<div align="center">

<table>
   <tr>
      <th>🌟 Key Feature</th>
      <th>✨ Details</th>
   </tr>
   <tr>
      <td>🌐 Multi-language Support</td>
      <td>English, Hindi, Odia</td>
   </tr>
   <tr>
      <td>⛅ Weather Updates</td>
      <td>Real-time, location-based, offline caching</td>
   </tr>
   <tr>
      <td>🌾 Crop & Activity Management</td>
      <td>Schedules, reminders, tracking</td>
   </tr>
   <tr>
      <td>🏢 Rural Services</td>
      <td>Govt. schemes, helplines, groups</td>
   </tr>
   <tr>
      <td>📴 Offline-first</td>
      <td>Critical data always available</td>
   </tr>
   <tr>
      <td>🎨 Modern UI/UX</td>
      <td>Material Design, accessibility</td>
   </tr>
</table>

</div>


A comprehensive, open-source mobile application designed to empower farmers with real-time agricultural information, crop planning, soil analysis, and market price tracking. Built with React Native, Expo, and Firebase, MITRA brings modern technology to the heart of agriculture.

---

## About the Initiative

**MITRA** stands for **Mutual Initiative for Transforming Rural Areas**. This app is the first in a series of open-source projects under the MITRA initiative, aiming to transform rural life through technology. In the future, expect more apps focused on health, education, and other vital sectors—all open source and community-driven.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

---

## Features

- **Multi-language Support**: English, Hindi, and Odia with dynamic switching.
- **Real-time Weather Updates**: Location-specific weather data, multiple parameters, and offline caching.
- **Farming Activity Management**: Crop-specific schedules, activity tracking, and reminders.
- **Rural Services Integration**: Access to government schemes, training programs, farmer groups, and helplines.
- **User Authentication**: Secure login, profile management, and preference storage.
- **Offline-first Architecture**: Data caching and offline access for critical features.
- **Modern UI/UX**: Material Design, accessibility, and responsive layouts.

---

## Screenshots

> _Add screenshots or demo GIFs here to showcase the app UI and features!_
>
> Example:
> ![Home Screen](assets/images/home-screenshot.png) > ![Weather Feature](assets/images/weather-screenshot.png)

---

## Tech Stack

- **Frontend**: React Native, Expo, React Navigation
- **Backend/Cloud**: Firebase (Authentication, Realtime Database)
- **APIs**: OpenWeatherMap, weatherapi.com
- **State Management**: React Context API
- **Localization**: i18next, react-i18next
- **Data Storage**: expo-sqlite, AsyncStorage
- **UI Libraries**: @expo/vector-icons, react-native-calendars, react-native-linear-gradient

---

## Project Structure

```
MITRA/
├── app/                    # Main app configuration and navigation
├── assets/                 # Static assets (images, fonts, etc.)
├── components/             # Reusable UI components
├── constants/              # App-wide constants and configurations
├── docs/                   # Documentation files
├── hooks/                  # Custom React hooks
├── screens/                # Main screen components
├── scripts/                # Build and utility scripts
├── .expo/                  # Expo configuration
├── node_modules/           # Dependencies
├── app.json                # Expo app configuration
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

See [`docs/directory-structure.md`](docs/directory-structure.md) for more details.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/mitra.git
   cd mitra
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the app:**
   ```bash
   npx expo start
   ```
   - Use the QR code to open in Expo Go, or run on an emulator/simulator.

---

## Development

- **Android:** `npm run android`
- **iOS:** `npm run ios`
- **Web:** `npm run web`
- **Reset Project:** `npm run reset-project`

### File-based Routing

MITRA uses Expo Router for file-based navigation. Edit or add screens in the `app/` directory.

### Environment Variables

- Set up your API keys (e.g., for weather APIs) in a `.env` file or directly in the config files as needed.

### Testing

- Run tests with:
  ```bash
  npm test
  ```

---

## Contributing

MITRA welcomes contributions from the community!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please follow the code style and commit message conventions. See the [Project Report](ProjectReport.md) for architecture and design details.

---

## License

> _MIT Licence_

---

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [i18next](https://www.i18next.com/)
- All contributors and the open-source community

---

## Contact

For questions, suggestions, or support, open an issue or contact the maintainers at **tech9ic@gmail.com**.

---

> _MITRA: Empowering Farmers, Enabling Growth._

---
