# Quick Reference Card - Project NOOR

## 🚀 Essential Commands

```bash
# Start app
npm start

# Clear cache & start
npx expo start -c

# Run on specific platform
npm run web      # Browser
npm run android  # Android
npm run ios      # iOS

# Diagnostics
npx expo-doctor

# Reinstall dependencies
rm -rf node_modules && npm install
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Main app & navigation |
| `types.ts` | TypeScript definitions |
| `constants.ts` | Colors, data, translations |
| `services/gemini.ts` | AI configuration |
| `views/*.tsx` | All screens |
| `components/Navbar.tsx` | Bottom navigation |

## 🎨 Color Codes

```typescript
primary:     '#B06D75'  // Rose
teal:        '#2AA79F'  // Teal
gold:        '#D4AF37'  // Gold
background:  '#FDF8F7'  // Cream
textDark:    '#2D2426'  // Dark
```

## 🗺️ Screen Flow

```
Splash → SignUp → Verify → Dashboard
                              ↓
         ┌────────────────────┼────────────────────┐
         ↓                    ↓                    ↓
       Pods              AI Chat            Activities
         ↓                                         ↓
     PodChat                                   Profile
         ↓
     Experts
```

## 🔧 Configuration

### Gemini API Key
**File:** `services/gemini.ts`
```typescript
const API_KEY = 'YOUR_KEY_HERE';
```
**Get key:** https://makersuite.google.com/app/apikey

### Supabase (Optional)
**File:** `lib/supabase.ts`
- Already configured
- Update for production

## 🐛 Quick Fixes

### App won't start
```bash
npx expo start -c
```

### Module not found
```bash
rm -rf node_modules
npm install
```

### Port in use
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

### TypeScript errors
Restart TS server in VS Code:
`Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

## 📱 Testing Flow

1. Start app: `npm start`
2. Press `w` for web
3. Select language
4. Sign up with test data:
   - Nickname: "Sarah"
   - Phone: "501234567"
   - PIN: "123456"
5. Complete verification
6. Explore all screens

## 🎯 Screen Shortcuts

In terminal after `npm start`:
- `w` - Web browser
- `a` - Android
- `i` - iOS
- `r` - Reload
- `m` - Toggle menu
- `c` - Clear cache

## 📊 Project Stats

- **Screens:** 10
- **Components:** 11
- **Services:** 1
- **Languages:** 2 (EN/AR)
- **Dependencies:** 720+
- **TypeScript:** 100%

## 🔍 Debug Menu

**Open:** Shake device or `Cmd+D` (iOS) / `Cmd+M` (Android)

**Options:**
- Reload
- Debug Remote JS
- Show Element Inspector
- Show Performance Monitor

## 📚 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Full documentation |
| `QUICKSTART.md` | 5-min setup |
| `TROUBLESHOOTING.md` | Problem solving |
| `INTEGRATION_SUMMARY.md` | Technical details |
| `PROJECT_STATUS.md` | Current status |

## 🎨 Component Patterns

### Basic Screen
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

export default MyScreen;
```

### With Navigation
```typescript
interface Props {
  onNavigate: (screen: Screen) => void;
}

const MyScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <TouchableOpacity 
      onPress={() => onNavigate(Screen.Dashboard)}
    >
      <Text>Go to Dashboard</Text>
    </TouchableOpacity>
  );
};
```

## 🌐 API Integration

### Gemini Chat
```typescript
import { generateNoorResponse } from './services/gemini';

const response = await generateNoorResponse(
  userMessage,
  conversationHistory
);
```

### Thread Summary
```typescript
import { summarizeThread } from './services/gemini';

const summary = await summarizeThread(messages);
```

## 🎯 Common Tasks

### Add New Screen
1. Create `views/NewScreen.tsx`
2. Add to `Screen` enum in `types.ts`
3. Add case in `App.tsx` renderScreen()
4. Add to Navbar if needed

### Change Colors
Edit `COLORS` in `constants.ts`

### Add Translation
Edit `EN_STRINGS` and `AR_STRINGS` in `constants.ts`

### Add Mock Data
Edit `MOCK_*` arrays in `constants.ts`

## 📞 Get Help

1. Check `TROUBLESHOOTING.md`
2. Run `npx expo-doctor`
3. Check terminal errors
4. Search Expo docs
5. Ask on forums

## 🔗 Useful Links

- **Expo Docs:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **Gemini API:** https://makersuite.google.com
- **Expo Forums:** https://forums.expo.dev

## ⚡ Performance Tips

- Use `FlatList` for long lists
- Optimize images
- Use `React.memo` for components
- Avoid inline functions in render
- Use `useCallback` for callbacks

## 🎓 Best Practices

- ✅ Always use TypeScript
- ✅ Test on both platforms
- ✅ Clear cache when switching branches
- ✅ Keep dependencies updated
- ✅ Use meaningful variable names
- ✅ Comment complex logic
- ✅ Handle errors gracefully

## 🚨 Before Asking for Help

1. ✅ Clear cache: `npx expo start -c`
2. ✅ Check error message
3. ✅ Search for similar issues
4. ✅ Try on different device
5. ✅ Check if reproducible

---

**Keep this handy for quick reference!** 📌
