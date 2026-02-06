import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select(`username, full_name, phone_number`)
      .eq('id', session.user.id)
      .single();

    if (data) setProfile(data);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.info}>Welcome, {profile?.full_name}</Text>
          <Text style={styles.subInfo}>@{profile?.username}</Text>
          <Text style={styles.subInfo}>{profile?.phone_number}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.signOut} onPress={() => supabase.auth.signOut()}>
        <Text style={{ color: '#FF3B30', fontWeight: 'bold' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F9F9' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 20, width: '100%', alignItems: 'center', elevation: 2 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 20, fontWeight: '600' },
  subInfo: { fontSize: 16, color: '#666', marginTop: 5 },
  signOut: { marginTop: 40 }
});