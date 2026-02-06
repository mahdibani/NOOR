# Troubleshooting Guide - Project NOOR

Common issues and their solutions.

## Installation Issues

### ❌ "npm install" fails
**Symptoms:** Errors during package installation

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

### ❌ Node version warnings
**Symptoms:** "Unsupported engine" warnings

**Solution:** These are warnings, not errors. Your Node v20.15.0 works fine. To silence them:
- Upgrade to Node v20.19.4+ (optional)
- Or ignore the warnings (they don't affect functionality)

## Startup Issues

### ❌ "Metro bundler won't start"
**Symptoms:** Stuck on "Starting Metro Bundler..."

**Solutions:**
```bash
# Clear Metro cache
npx expo start -c

# Kill any existing Metro processes
# Windows:
taskkill /F /IM node.exe

# Mac/Linux:
killall node

# Restart
npm start
```

### ❌ "Port 8081 already in use"
**Symptoms:** Error about port being occupied

**Solutions:**
```bash
# Find and kill process on port 8081
# Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8081 | xargs kill -9

# Or use different port
npx expo start --port 8082
```

### ❌ "Cannot find module"
**Symptoms:** Module not found errors

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear watchman cache (Mac/Linux)
watchman watch-del-all

# Restart with clean cache
npx expo start -c
```

## Runtime Issues

### ❌ App crashes on startup
**Symptoms:** White screen or immediate crash

**Solutions:**
1. Check terminal for error messages
2. Run diagnostics:
   ```bash
   npx expo-doctor
   ```
3. Check for syntax errors:
   ```bash
   npm run tsc
   ```
4. Clear cache and restart:
   ```bash
   npx expo start -c
   ```

### ❌ "Invariant Violation" errors
**Symptoms:** Red screen with invariant violation

**Common Causes:**
- Missing return statement in component
- Incorrect component nesting
- Invalid props passed to component

**Solution:**
- Check the error stack trace
- Verify component syntax
- Ensure all components return valid JSX

### ❌ Images not loading
**Symptoms:** Broken image placeholders

**Solutions:**
1. Check internet connection (images are from URLs)
2. Verify image URLs are accessible
3. For local images, use require():
   ```jsx
   <Image source={require('./path/to/image.png')} />
   ```

## AI Features Issues

### ❌ "Gemini API not configured"
**Symptoms:** AI chat shows error message

**Solution:**
1. Get API key from https://makersuite.google.com/app/apikey
2. Open `services/gemini.ts`
3. Replace:
   ```typescript
   const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
   With your actual key

### ❌ "API quota exceeded"
**Symptoms:** AI responses fail after working

**Solution:**
- Check quota at https://makersuite.google.com
- Wait for quota reset (usually daily)
- Upgrade to paid plan if needed

### ❌ "Network request failed"
**Symptoms:** AI features timeout

**Solutions:**
- Check internet connection
- Verify API key is correct
- Check if Gemini API is down: https://status.cloud.google.com
- Try again after a few minutes

## Platform-Specific Issues

### iOS Issues

#### ❌ "Unable to boot simulator"
**Solution:**
```bash
# Reset simulator
xcrun simctl erase all

# Or open Xcode and reset from there
```

#### ❌ "No devices found"
**Solution:**
- Open Xcode
- Go to Window → Devices and Simulators
- Add a simulator

### Android Issues

#### ❌ "SDK location not found"
**Solution:**
1. Install Android Studio
2. Set ANDROID_HOME environment variable:
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

#### ❌ "Emulator won't start"
**Solution:**
- Open Android Studio
- Go to AVD Manager
- Create/start emulator from there
- Then run `npm run android`

### Web Issues

#### ❌ "Module not found" on web
**Solution:**
```bash
# Install web dependencies
npx expo install react-dom react-native-web

# Restart
npm run web
```

## Development Issues

### ❌ Hot reload not working
**Symptoms:** Changes don't reflect automatically

**Solutions:**
1. Shake device or press `r` in terminal to reload
2. Enable Fast Refresh in dev menu
3. Restart Metro bundler:
   ```bash
   npx expo start -c
   ```

### ❌ TypeScript errors
**Symptoms:** Red squiggly lines in editor

**Solutions:**
1. Check if types are installed:
   ```bash
   npm install --save-dev @types/react @types/react-native
   ```
2. Restart TypeScript server in VS Code:
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"

### ❌ Slow performance
**Symptoms:** App is laggy

**Solutions:**
1. Enable Hermes (already enabled in Expo)
2. Use production build:
   ```bash
   npx expo start --no-dev --minify
   ```
3. Optimize images (reduce size)
4. Use FlatList instead of ScrollView for long lists

## Build Issues

### ❌ "eas build" fails
**Symptoms:** Build errors on EAS

**Solutions:**
1. Ensure you're logged in:
   ```bash
   eas login
   ```
2. Configure project:
   ```bash
   eas build:configure
   ```
3. Check eas.json is valid
4. Try building locally first:
   ```bash
   npx expo prebuild
   ```

### ❌ "Gradle build failed" (Android)
**Solution:**
```bash
# Clean gradle cache
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

### ❌ "Pod install failed" (iOS)
**Solution:**
```bash
# Update CocoaPods
sudo gem install cocoapods

# Clean and reinstall
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Rebuild
npm run ios
```

## Debugging Tips

### Enable Debug Mode
1. Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
2. Select "Debug Remote JS"
3. Open Chrome DevTools

### View Console Logs
```bash
# In terminal where you ran npm start
# All console.log() output appears here
```

### Inspect Elements
1. Open dev menu
2. Select "Show Element Inspector"
3. Tap elements to inspect

### Check Network Requests
1. Open dev menu
2. Select "Debug Remote JS"
3. Open Chrome DevTools → Network tab

## Still Having Issues?

### Check These Resources
1. **Expo Documentation**: https://docs.expo.dev
2. **React Native Docs**: https://reactnative.dev
3. **Expo Forums**: https://forums.expo.dev
4. **Stack Overflow**: Tag with `expo` and `react-native`

### Diagnostic Commands
```bash
# Check Expo installation
npx expo --version

# Check for issues
npx expo-doctor

# View environment info
npx expo config

# Check dependencies
npm list --depth=0
```

### Get Help
1. Check error message carefully
2. Search error on Google/Stack Overflow
3. Check if issue exists on Expo GitHub
4. Ask on Expo forums with:
   - Error message
   - Steps to reproduce
   - Environment info (`npx expo-doctor`)

## Prevention Tips

### Best Practices
1. ✅ Always clear cache when switching branches
2. ✅ Keep dependencies up to date
3. ✅ Use TypeScript for type safety
4. ✅ Test on both iOS and Android
5. ✅ Commit working code frequently
6. ✅ Use version control (git)

### Before Asking for Help
1. ✅ Clear cache and restart
2. ✅ Check error message carefully
3. ✅ Search for similar issues
4. ✅ Try on different device/simulator
5. ✅ Check if issue is reproducible

---

**Most issues are solved by clearing cache and restarting! 🔄**
