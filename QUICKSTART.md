# Quick Start Guide - Project NOOR

Get your NOOR app running in 5 minutes!

## Step 1: Verify Installation ✅

Check that dependencies are installed:
```bash
npm list --depth=0
```

You should see all packages listed without errors.

## Step 2: Configure API Key 🔑

1. Get a free Gemini API key:
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with Google
   - Click "Create API Key"
   - Copy your key

2. Open `services/gemini.ts`

3. Replace this line:
   ```typescript
   const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
   
   With your actual key:
   ```typescript
   const API_KEY = 'AIzaSy...your-actual-key';
   ```

## Step 3: Start the App 🚀

Run the development server:
```bash
npm start
```

You'll see a QR code and options:
- Press `w` - Open in web browser (easiest for testing)
- Press `a` - Open in Android emulator
- Press `i` - Open in iOS simulator
- Scan QR - Open in Expo Go app on your phone

## Step 4: Test the App 📱

### Test Flow:
1. **Splash Screen** → Select "English" or "العربية"
2. **Sign Up** → Enter:
   - Nickname: "Sarah"
   - Phone: "501234567"
   - PIN: "123456"
   - Click "Verify My Identity"
3. **Verification** → Click the capture button (auto-completes after 2.5s)
4. **Dashboard** → You're in! 🎉

### Try These Features:
- **Mood Tracker**: Tap an emoji to see personalized message
- **Pods**: Browse and "join" community groups
- **AI Chat**: Talk to Noor AI (requires API key)
- **Experts**: Book a session with a professional
- **Activities**: Browse events
- **Profile**: Switch language, view settings

## Common Issues & Fixes 🔧

### Issue: "Metro bundler not starting"
**Fix:**
```bash
npx expo start -c
```

### Issue: "Cannot find module"
**Fix:**
```bash
rm -rf node_modules
npm install
npm start
```

### Issue: "Gemini API not working"
**Fix:**
- Check your API key is correct in `services/gemini.ts`
- Verify you have internet connection
- Check API quota at https://makersuite.google.com

### Issue: "App crashes on startup"
**Fix:**
```bash
npx expo-doctor
```
This will diagnose and suggest fixes.

## Testing Without API Key 🧪

The app works without Gemini API! Features that need it:
- ✅ All screens and navigation work
- ✅ Mock data displays correctly
- ❌ AI chat will show "API not configured" message
- ❌ Thread summarization won't work

You can test everything else perfectly fine!

## Next Steps 🎯

1. **Customize Mock Data**: Edit `constants.ts` to add your own:
   - Community pods
   - Experts
   - Activities

2. **Add Real Authentication**: Configure Supabase in `lib/supabase.ts`

3. **Customize Colors**: Update `COLORS` in `constants.ts`

4. **Add More Languages**: Extend `AR_STRINGS` and `EN_STRINGS`

## Development Tips 💡

### Hot Reload
- Save any file and see changes instantly
- Shake device (or press `r` in terminal) to reload manually

### Debug Menu
- Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
- Access: Element Inspector, Performance Monitor, Remote Debugging

### View on Multiple Devices
- Run `npm start`
- Scan QR code on multiple phones
- All will update together!

## Project Structure Quick Reference 📁

```
Key Files to Edit:
├── constants.ts        → Colors, mock data, translations
├── services/gemini.ts  → AI configuration
├── views/              → All screens
│   ├── Dashboard.tsx   → Main home screen
│   ├── NoorAI.tsx      → AI chat
│   └── ...
└── App.tsx             → Navigation logic
```

## Need Help? 🆘

1. Check `README.md` for detailed documentation
2. Review error messages in terminal
3. Use `npx expo-doctor` for diagnostics
4. Check Expo documentation: https://docs.expo.dev

## Ready to Build? 🏗️

Once everything works:
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

Requires EAS account (free): https://expo.dev/signup

---

**You're all set! Enjoy building with NOOR! 🌟**
