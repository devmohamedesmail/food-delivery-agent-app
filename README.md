# Uber Agent - Food Delivery Platform

A comprehensive food delivery platform built with React Native and Expo, featuring separate interfaces for restaurant owners and delivery drivers. The app supports multi-language functionality (Arabic/English) and provides a complete ecosystem for food ordering and delivery management.

## 🚀 Features

### 🏪 Restaurant Owner Features
- **Restaurant Registration & Management**: Complete restaurant profile setup with images, descriptions, and operating hours
- **Menu Management**: Add, edit, and manage meal items with images, descriptions, and pricing
- **Order Management**: Real-time order tracking and status updates
- **Dashboard**: Comprehensive overview of restaurant performance and orders
- **Business Settings**: Configure delivery times, operating hours, and restaurant information

### 🚗 Driver Features
- **Driver Registration**: Vehicle information and documentation setup
- **Real-time Order Tracking**: Accept and manage delivery requests
- **Navigation Integration**: Location-based order assignments
- **Earnings Dashboard**: Track delivery performance and earnings
- **Status Management**: Online/offline availability toggle

### 🌐 General Features
- **Multi-language Support**: Arabic and English localization
- **Authentication System**: Secure login/registration for different user roles
- **Image Upload**: Profile pictures and meal images with camera/gallery integration
- **Form Validation**: Comprehensive input validation using Yup
- **Toast Notifications**: User-friendly feedback system
- **Responsive Design**: Tailwind CSS with NativeWind for consistent styling

## 🛠️ Tech Stack

### Frontend Framework
- **React Native**: 0.79.6
- **Expo**: ~53.0.23
- **Expo Router**: ~5.1.7 for navigation

### Styling & UI
- **NativeWind**: ^4.1.23 (Tailwind CSS for React Native)
- **Tailwind CSS**: ^3.4.17
- **Custom Fonts**: Cairo font family for Arabic/English text

### State Management & Forms
- **Formik**: ^2.4.6 for form handling
- **Yup**: ^1.7.0 for form validation
- **React Context**: For authentication and global state

### Internationalization
- **i18next**: ^25.5.2
- **react-i18next**: ^15.7.3
- **expo-localization**: ^16.1.6

### Media & Storage
- **expo-image-picker**: ~16.1.4 for photo selection
- **AsyncStorage**: ^2.1.2 for local storage
- **Axios**: ^1.11.0 for API calls

### Development Tools
- **TypeScript**: ~5.8.3
- **Jest**: ^29.2.1 for testing
- **Prettier**: Code formatting with Tailwind plugin

## 📱 Installation & Setup

### Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uber-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   npm run ios
   
   # Android  
   npm run android
   
   # Web
   npm run web
   ```

## 🏗️ Project Structure

```
├── app/                    # Screen components using Expo Router
│   ├── auth/              # Authentication screens
│   │   ├── login.tsx      # Login screen
│   │   └── register.tsx   # Registration screen
│   ├── restaurant/        # Restaurant owner screens
│   │   ├── meal.tsx       # Add/edit meals
│   │   ├── menu.tsx       # Menu management
│   │   └── orders.tsx     # Order management
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen (role-based routing)
│   └── account.tsx        # User settings and profile
├── components/            # Reusable components
│   ├── custom/           # Custom UI components
│   │   ├── custombutton.tsx
│   │   ├── custominput.tsx
│   │   ├── customdropdown.tsx
│   │   └── ...
│   ├── auth_header.tsx   # Authentication header
│   ├── DriverHomeScreen.tsx
│   ├── RestaurantHomeScreen.tsx
│   ├── driver_register.tsx
│   ├── resturant_register.tsx
│   └── LanguageSwitcher.tsx
├── context/              # React Context providers
│   └── auth_context.tsx  # Authentication context
├── constants/            # App constants
│   ├── Colors.ts         # Color definitions
│   └── config.ts         # App configuration
├── locales/             # Internationalization files
│   ├── en.json          # English translations
│   └── ar.json          # Arabic translations
├── items/               # Item components
│   └── mealitem.tsx     # Meal item component
└── assets/              # Static assets
    ├── fonts/           # Custom fonts (Cairo)
    └── images/          # App images and icons
```

## 🔧 Configuration

### Environment Setup
The app uses configuration files for API endpoints and other settings:
- `constants/config.ts` - Contains API base URLs and configuration

### Styling Configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `nativewind-env.d.ts` - NativeWind type definitions

### Metro Configuration  
- `metro.config.js` - Metro bundler configuration for Expo

## 🌍 Internationalization

The app supports both Arabic and English languages:

- Translation files located in `locales/`
- Language switcher component available in navigation
- RTL (Right-to-Left) support for Arabic
- Cairo font family for proper Arabic text rendering

## 👥 User Roles & Authentication

### Authentication Flow
1. Users register with phone number and password
2. Select role: Restaurant Owner or Driver
3. Complete role-specific profile setup
4. Access role-based dashboard

### Role-Based Features
- **Restaurant Owners**: Menu management, order tracking, business settings
- **Drivers**: Vehicle registration, order delivery, earnings tracking

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The app includes Jest configuration for unit testing React components.

## 📦 Building for Production

### Android
```bash
expo build:android
```

### iOS  
```bash
expo build:ios
```

### Web
```bash
npm run web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- [ ] Real-time GPS tracking for drivers
- [ ] Push notifications for order updates
- [ ] Payment gateway integration
- [ ] Customer mobile application
- [ ] Advanced analytics dashboard
- [ ] Multi-restaurant support
- [ ] Rating and review system
- [ ] Promotional codes and discounts

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React Native and Expo**# food-delivery-agent-app
