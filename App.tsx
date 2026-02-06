import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';

// Types & Constants
import { Language, Screen, User } from './types';
import { COLORS } from './constants';

// Components & Views
import Splash from './views/Splash';
import SignUp from './views/SignUp';
import Verify from './views/Verify';
import Dashboard from './views/Dashboard';
import Pods from './views/Pods';
import PodChat from './views/PodChat';
import NoorAIChat from './views/NoorAI';
import Experts from './views/Experts';
import Activities from './views/Activities';
import Profile from './views/Profile';
import Navbar from './components/Navbar';

export default function App() {
  // --- Auth State ---
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // --- Navigation & UI State ---
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [language, setLanguage] = useState<Language>('EN');

  // 1. Listen for Auth Changes
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setCurrentScreen(Screen.Dashboard);
    });

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCurrentScreen(Screen.Dashboard);
      } else {
        setCurrentScreen(Screen.Splash);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Navigation Logic
  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLangSelection = (lang: Language) => {
    setLanguage(lang);
    navigate(Screen.SignUp);
  };

  const handleSignUpComplete = (nickname: string, phone: string) => {
    setUser({
      nickname,
      phone,
      isVerified: false,
      avatar: 'https://picsum.photos/seed/nooruser/200/200',
    });
    navigate(Screen.Verify);
  };

  const handleVerificationComplete = () => {
    if (user) {
      setUser({ ...user, isVerified: true });
    }
    navigate(Screen.Dashboard);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate(Screen.Splash);
  };

  // 3. UI Helpers
  const isTabbedScreen = [
    Screen.Dashboard,
    Screen.Pods,
    Screen.AIChat,
    Screen.Activities,
    Screen.Profile,
    Screen.Experts,
  ].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Splash:
        return <Splash onSelectLanguage={handleLangSelection} />;
      case Screen.SignUp:
        return (
          <SignUp
            onContinue={handleSignUpComplete}
            onBack={() => navigate(Screen.Splash)}
          />
        );
      case Screen.Verify:
        return (
          <Verify
            onComplete={handleVerificationComplete}
            onBack={() => navigate(Screen.SignUp)}
          />
        );
      case Screen.Dashboard:
        return <Dashboard user={user} language={language} onNavigate={navigate} />;
      case Screen.Pods:
        return <Pods language={language} onJoinPod={() => navigate(Screen.PodChat)} />;
      case Screen.PodChat:
        return <PodChat language={language} onBack={() => navigate(Screen.Pods)} />;
      case Screen.AIChat:
        return <NoorAIChat language={language} />;
      case Screen.Experts:
        return <Experts language={language} />;
      case Screen.Activities:
        return <Activities language={language} />;
      case Screen.Profile:
        return (
          <Profile
            user={user}
            language={language}
            onLanguageChange={setLanguage}
            onLogout={handleLogout}
          />
        );
      default:
        return <Splash onSelectLanguage={handleLangSelection} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>{renderScreen()}</View>
      {isTabbedScreen && (
        <Navbar
          activeScreen={currentScreen}
          onNavigate={navigate}
          language={language}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});