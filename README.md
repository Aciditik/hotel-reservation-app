# 🏨 Hotel Booking Mobile App

A modern, cross-platform mobile application for browsing and booking hotels, built with React Native and Expo.

## � About

This is a hotel booking application that allows users to search for hotels, view details, and make reservations. The app features a clean, intuitive interface inspired by modern hotel booking platforms.

**Design Reference:** [Hotel Booking Mobile App - Dribbble](https://dribbble.com/shots/26519070-Grandhaven-Hotel-Booking-App-Design)

## ✨ Features

### Screens Implemented

1. **Home Screen (Hotel Listings)**
   - Browse available hotels with beautiful card layouts
   - Search hotels by name or location
   - View hotel ratings, reviews, and pricing
   - Mark hotels as favorites
   - Sort hotels by distance from current location

2. **Hotel Details Screen**
   - View detailed hotel information and descriptions
   - Browse hotel image gallery with swipe navigation
   - View amenities with icon indicators
   - Select check-in/check-out dates
   - Choose number of guests
   - Complete booking with price calculation
   - Add custom photos to hotel gallery

### Native Features Implemented

The app integrates **4 native features** (exceeding the minimum requirement of 2):

1. **📍 Geolocation (expo-location)**
   - Request and handle location permissions
   - Get user's current location
   - Calculate distance between user and hotels
   - Sort hotels by proximity to user
   - Proper permission denial handling with user feedback

2. **📸 Image Picker (expo-image-picker)**
   - Request camera roll permissions
   - Allow users to add custom photos to hotel galleries
   - Image selection with editing capabilities
   - Permission handling with user-friendly alerts

3. **💾 Local Storage (AsyncStorage)**
   - Persist user favorites across app sessions
   - Save booking history locally
   - Retrieve saved data on app launch
   - Manage favorites (add/remove)

4. **🔔 Local Notifications (expo-notifications)**
   - Request notification permissions
   - Schedule booking confirmation notifications
   - Schedule check-in reminder notifications
   - Handle Android notification channels
   - Proper permission management

**Bonus Feature:**
5. **📳 Haptic Feedback (expo-haptics)**
   - Tactile feedback on button presses
   - Different feedback styles for different actions
   - Enhanced user experience with physical feedback

## 🏗️ Architecture

The project follows **Atomic Design** principles with a clean, scalable architecture:

```
cinema_application/
├── app/                          # Screens (file-based routing)
│   ├── index.tsx                 # Home screen - Hotel listings
│   ├── hotel/
│   │   └── [id].tsx             # Hotel details screen
│   └── _layout.tsx              # Navigation configuration
├── components/                   # UI Components (Atomic Design)
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Icon.tsx
│   │   └── Rating.tsx
│   ├── molecules/               # Simple component combinations
│   │   ├── HotelCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── DatePicker.tsx
│   │   └── AmenityChip.tsx
│   └── organisms/               # Complex component compositions
│       ├── HotelList.tsx
│       └── ImageGallery.tsx
├── services/                    # Business logic & API calls
│   ├── hotelService.ts         # Hotel data management
│   ├── storageService.ts       # AsyncStorage operations
│   ├── locationService.ts      # Geolocation handling
│   └── notificationService.ts  # Notification management
└── types/                       # TypeScript type definitions
    └── hotel.ts                # Hotel & Booking interfaces
```

### Architecture Principles

- **Separation of Concerns**: UI components separated from business logic
- **Atomic Design**: Components organized by complexity (atoms → molecules → organisms)
- **Service Layer**: All native feature interactions isolated in service files
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Error Handling**: Comprehensive error handling with user feedback
- **Permission Management**: Proper request and denial handling for all native features

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cinema_application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **TypeScript** - Type-safe development
- **Expo Router** - File-based navigation
- **Expo Location** - Geolocation services
- **Expo Image Picker** - Camera roll access
- **AsyncStorage** - Local data persistence
- **Expo Notifications** - Push notifications
- **Expo Haptics** - Tactile feedback

## 📋 Key Features Implementation

### Permission Handling
All native features properly request permissions and handle denial cases:
- Clear user feedback when permissions are denied
- Graceful degradation when features are unavailable
- Educational alerts explaining why permissions are needed

### State Management
- React hooks for local state management
- useEffect for data loading and side effects
- Proper loading and error states

### Navigation
- Stack navigation with Expo Router
- Smooth transitions between screens
- Back button handling
- Parameter passing between screens

### User Experience
- Haptic feedback on interactions
- Loading states for async operations
- Error handling with user-friendly messages
- Responsive design for different screen sizes

## 🎯 Project Requirements Compliance

✅ **Mobile-only application** (not web)  
✅ **Minimum 2 screens** (implemented 2 distinct screens)  
✅ **Logical navigation** (Stack navigation with proper flow)  
✅ **Realistic UI** (based on professional Dribbble design)  
✅ **Expo project** (created with create-expo-app)  
✅ **Atomic architecture** (atoms, molecules, organisms)  
✅ **Clear project structure** (screens, components, services)  
✅ **Functional navigation** (bug-free screen transitions)  
✅ **Visual hierarchy** (consistent spacing and typography)  
✅ **Appropriate components** (ScrollView, FlatList, Pressable, etc.)  
✅ **2+ native features** (implemented 4 native features)  
✅ **Permission management** (proper handling for all features)  
✅ **Contextual features** (all features serve the app's purpose)  
✅ **Clean code** (separation of concerns, no business logic in screens)  

## 🔄 Future Enhancements

- User authentication
- Real hotel API integration
- Payment processing
- Booking management screen
- Map view for hotel locations
- Filter and sort options
- Reviews and ratings system
- Dark mode support

## 📝 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as part of a mobile development course assignment.
