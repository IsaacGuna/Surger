import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
  const { register, isLoading } = useAuth();
  
  // Account details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  // Profile details
  const [profile, setProfile] = useState({
    specialty: '',
    subspecialty: '',
    experienceYears: '',
    casesCompleted: '',
    successRate: '',
    certifications: '',
    currentWorkload: '',
    fatigueLevel: '1',
  });

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill in all required account fields');
      return;
    }

    if (!profile.specialty || !profile.experienceYears) {
      Alert.alert('Error', 'Please fill in required profile fields (Specialty and Experience)');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const userData = {
      email,
      password,
      firstName,
      lastName,
      profile,
    };

    const success = await register(userData);
    if (success) {
      Alert.alert('Success', 'Account created and profile saved! Welcome to Surger!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } else {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2E8B57', dark: '#1F5A3F' }}
      headerImage={
        <IconSymbol
          size={310}
          color="white"
          name="person.crop.circle.badge.plus"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
        <ThemedText style={styles.subtitle}>
          Set up your surgeon profile and join Surger
        </ThemedText>

        <ThemedView style={styles.formContainer}>
          <ThemedText type="subtitle">Account Information</ThemedText>
          
          {/* Name Fields */}
          <ThemedView style={styles.nameRow}>
            <ThemedView style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>First Name *</ThemedText>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="John"
                placeholderTextColor="#999"
                autoCapitalize="words"
              />
            </ThemedView>
            <ThemedView style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.label}>Last Name *</ThemedText>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Smith"
                placeholderTextColor="#999"
                autoCapitalize="words"
              />
            </ThemedView>
          </ThemedView>

          {/* Email */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email Address *</ThemedText>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="doctor@hospital.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </ThemedView>

          {/* Password */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Password *</ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              placeholderTextColor="#999"
              secureTextEntry
              autoComplete="new-password"
            />
          </ThemedView>

          {/* Confirm Password */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Confirm Password *</ThemedText>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              autoComplete="new-password"
            />
          </ThemedView>

          <ThemedView style={styles.divider} />
          
          <ThemedText type="subtitle">Professional Profile</ThemedText>
          
          {/* Specialty */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Specialty *</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.specialty}
              onChangeText={(text) => setProfile({...profile, specialty: text})}
              placeholder="e.g., Cardiothoracic Surgery"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Subspecialty */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Subspecialty</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.subspecialty}
              onChangeText={(text) => setProfile({...profile, subspecialty: text})}
              placeholder="e.g., Pediatric Cardiac Surgery"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Experience */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Years of Experience *</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.experienceYears}
              onChangeText={(text) => setProfile({...profile, experienceYears: text})}
              placeholder="e.g., 15"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Case History */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Total Cases Completed</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.casesCompleted}
              onChangeText={(text) => setProfile({...profile, casesCompleted: text})}
              placeholder="e.g., 1,250"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Success Rate */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Success Rate (%)</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.successRate}
              onChangeText={(text) => setProfile({...profile, successRate: text})}
              placeholder="e.g., 96.5"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Certifications */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Certifications & Credentials</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={profile.certifications}
              onChangeText={(text) => setProfile({...profile, certifications: text})}
              placeholder="List your board certifications, licenses, and credentials"
              multiline={true}
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Current Workload */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Current Weekly Caseload</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.currentWorkload}
              onChangeText={(text) => setProfile({...profile, currentWorkload: text})}
              placeholder="e.g., 12 surgeries/week"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Fatigue Level */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Current Fatigue Level (1-10)</ThemedText>
            <TextInput
              style={styles.input}
              value={profile.fatigueLevel}
              onChangeText={(text) => setProfile({...profile, fatigueLevel: text})}
              placeholder="1 = Well rested, 10 = Exhausted"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Register Button */}
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            <ThemedText style={styles.primaryButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account & Profile'}
            </ThemedText>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity 
            style={styles.backToLogin}
            onPress={handleBackToLogin}
          >
            <ThemedText style={styles.linkText}>
              Already have an account? Sign In
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 20,
  },
  formContainer: {
    gap: 20,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 56,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#2E8B57',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    alignSelf: 'center',
    marginTop: 12,
  },
  linkText: {
    color: '#2E8B57',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
});
