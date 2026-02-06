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
import VerifyOTP from './views/Verify-OTP'; // Updated Import
import Dashboard from './views/Dashboard';
import Navbar from './components/Navbar';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [language, setLanguage] = useState<Language>('EN');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setCurrentScreen(Screen.Dashboard);
    });

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

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleSignUpComplete = (nickname: string, phone: string) => {
    // Save the phone number to state so VerifyOTP can use it
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

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Splash:
        return <Splash onSelectLanguage={(lang) => { setLanguage(lang); navigate(Screen.SignUp); }} />;
      case Screen.SignUp:
        return <SignUp onContinue={handleSignUpComplete} onBack={() => navigate(Screen.Splash)} />;
      case Screen.Verify:
        return (
          <VerifyOTP
            phone={user?.phone || ''} // Passing the captured phone number
            onComplete={handleVerificationComplete}
            onBack={() => navigate(Screen.SignUp)}
          />
        );
      case Screen.Dashboard:
        return <Dashboard user={user} language={language} onNavigate={navigate} />;
      default:
        return <Splash onSelectLanguage={() => {}} />;
    }
  };

  const isTabbedScreen = [Screen.Dashboard].includes(currentScreen);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>{renderScreen()}</View>
      {isTabbedScreen && (
        <Navbar activeScreen={currentScreen} onNavigate={navigate} language={language} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1 },
});