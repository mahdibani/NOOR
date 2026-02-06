# Project NOOR - Women's Sanctuary Mobile App

A React Native mobile application built with Expo, providing a safe and verified sanctuary space for women in the UAE.

## Features

### 🌟 Core Features
- **Bilingual Support**: Full English and Arabic language support
- **Secure Authentication**: Multi-step verification process with identity shield
- **Dashboard**: Personalized home with mood tracking and daily wellness vibes
- **Community Pods**: Join verified women-only groups based on interests
- **AI Companion**: Chat with Noor AI for wellness guidance and support
- **Expert Directory**: Book sessions with vetted professionals
- **Activities**: Discover and join women-only events and meetups
- **Profile Management**: Customize settings and manage privacy

### 🛡️ Safety & Privacy
- Verified-only community
- End-to-end encrypted communications
- Founder-vetted experts
- Safe-chat enabled by AI moderation

## Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **AI Integration**: Google Gemini API
- **Backend**: Supabase (authentication & database)
- **State Management**: React Hooks
- **Styling**: React Native StyleSheet

## Prerequisites

- Node.js v20.15.0 or higher
- npm v10.7.0 or higher
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

## Installation

1. **Clone the repository**
   ```bash
   cd NOOR
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Keys**
   
   Update the Gemini API key in `services/gemini.ts`:
   ```typescript
   const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```

   Get your API key from: https://makersuite.google.com/app/apikey

4. **Configure Supabase** (Optional)
   
   Update `lib/supabase.ts` with your Supabase credentials if you want real authentication.

## Running the App

### Start Development Server
```bash
npm start
```

### Run on Specific Platform
```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web browser
```

### Using Expo Go
1. Install Expo Go on your mobile device
2. Scan the QR code from the terminal
3. App will load on your device

## Project Structure

```
NOOR/
├── components/          # Reusable components
│   └── Navbar.tsx      # Bottom navigation bar
├── views/              # Screen components
│   ├── Splash.tsx      # Language selection
│   ├── SignUp.tsx      # User registration
│   ├── Verify.tsx      # Identity verification
│   ├── Dashboard.tsx   # Main home screen
│   ├── Pods.tsx        # Community groups
│   ├── PodChat.tsx     # Group chat
│   ├── NoorAI.tsx      # AI chat companion
│   ├── Experts.tsx     # Expert directory
│   ├── Activities.tsx  # Events & activities
│   └── Profile.tsx     # User profile
├── services/           # API services
│   └── gemini.ts       # Google Gemini AI integration
├── lib/                # Libraries
│   └── supabase.ts     # Supabase client
├── types.ts            # TypeScript type definitions
├── constants.ts        # App constants & mock data
├── App.tsx             # Main app component
└── package.json        # Dependencies
```

## Key Screens

### 1. Splash Screen
- Language selection (English/Arabic)
- Welcome message
- Trust indicators

### 2. Sign Up
- Nickname input
- Phone number with UAE country code
- Security PIN
- Progress indicator

### 3. Identity Verification
- Face verification (simulated)
- Privacy protection notice
- AI identity shield

### 4. Dashboard
- Personalized greeting
- Mood tracker with 5 emotions
- Daily wellness vibe card
- Quick access to Experts and Pods

### 5. Community Pods
- Browse verified women-only groups
- Filter by category
- See online members
- Join groups

### 6. Noor AI Chat
- 24/7 AI companion
- Wellness guidance
- Safe conversation
- Quick prompts

### 7. Expert Directory
- Browse vetted professionals
- View ratings and specialties
- Book sessions
- Select date and time slots

### 8. Activities
- Discover women-only events
- See attendee count
- View location and time
- Join activities

### 9. Profile
- Language toggle
- Privacy settings
- Download data
- Contact founder
- Account management

## Color Palette

```typescript
{
  primary: '#B06D75',      // Rose/Mauve
  primaryDark: '#965C63',  // Darker rose
  teal: '#2AA79F',         // Teal accent
  gold: '#D4AF37',         // Gold accent
  warmCream: '#FFF9FA',    // Warm cream
  textDark: '#2D2426',     // Dark text
  background: '#FDF8F7'    // Background
}
```

## Mock Data

The app includes mock data for:
- Community pods (3 groups)
- Experts (2 professionals)
- Activities (4 events)

Replace with real data from your backend when ready.

## AI Features

### Noor AI Companion
- Powered by Google Gemini
- Wellness-focused responses
- Hate speech detection
- Conversation history

### Thread Summarization
- Summarize pod chat conversations
- AI-generated bullet points
- Private to user

## Customization

### Adding New Screens
1. Create component in `views/` folder
2. Add screen enum to `types.ts`
3. Add navigation case in `App.tsx`
4. Update Navbar if needed

### Changing Colors
Update `constants.ts` COLORS object

### Adding Languages
1. Add language strings to `constants.ts`
2. Update Language type in `types.ts`
3. Add language option in Splash screen

## Troubleshooting

### Metro Bundler Issues
```bash
npx expo start -c
```

### Dependency Issues
```bash
rm -rf node_modules
npm install
```

### iOS Build Issues
```bash
cd ios && pod install && cd ..
```

## Deployment

### Build for Production

**Android APK:**
```bash
eas build --platform android
```

**iOS IPA:**
```bash
eas build --platform ios
```

Requires Expo Application Services (EAS) account.

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement proper authentication before production
- Enable SSL/TLS for all API calls
- Follow GDPR/data protection guidelines

## Future Enhancements

- [ ] Real-time chat with WebSockets
- [ ] Push notifications
- [ ] Video calls with experts
- [ ] Payment integration for bookings
- [ ] Advanced AI features
- [ ] Social sharing
- [ ] Offline mode
- [ ] Analytics dashboard

## Contributing

This is a private project for women's safety and empowerment. Contributions should maintain the sanctuary's values and security standards.

## License

Proprietary - All rights reserved

## Support

For support, contact the NOOR team or reach out through the in-app founder chat feature.

---

**Built with ❤️ for women's empowerment in the UAE**
