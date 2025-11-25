import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/AuthContext';

export default function MainScreen() {
  const { user, login, logout, updateProfile, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user?.profile || {
    specialty: '',
    subspecialty: '',
    experienceYears: '',
    casesCompleted: '',
    successRate: '',
    certifications: '',
    currentWorkload: '',
    fatigueLevel: '1',
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    if (success) {
      Alert.alert('Success', 'Login successful! Welcome back!');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Invalid email or password. Try: doctor@hospital.com');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  // Show Dashboard if user is logged in
  if (user) {
    if (isEditing) {
      // Profile Edit Form
      return (
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#E8F5E8', dark: '#2D4A2D' }}
          headerImage={
            <IconSymbol
              size={310}
              color="#4A90E2"
              name="stethoscope"
              style={styles.headerImage}
            />
          }>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Edit Profile</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.formContainer}>
            <ThemedText type="subtitle">Professional Information</ThemedText>
            
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Specialty *</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.specialty}
                onChangeText={(text) => setProfileData({...profileData, specialty: text})}
                placeholder="e.g., Cardiothoracic Surgery"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Subspecialty</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.subspecialty}
                onChangeText={(text) => setProfileData({...profileData, subspecialty: text})}
                placeholder="e.g., Pediatric Cardiac Surgery"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Years of Experience *</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.experienceYears}
                onChangeText={(text) => setProfileData({...profileData, experienceYears: text})}
                placeholder="e.g., 15"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Total Cases Completed</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.casesCompleted}
                onChangeText={(text) => setProfileData({...profileData, casesCompleted: text})}
                placeholder="e.g., 1,250"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Success Rate (%)</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.successRate}
                onChangeText={(text) => setProfileData({...profileData, successRate: text})}
                placeholder="e.g., 96.5"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Certifications & Credentials</ThemedText>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profileData.certifications}
                onChangeText={(text) => setProfileData({...profileData, certifications: text})}
                placeholder="List your board certifications, licenses, and credentials"
                multiline={true}
                numberOfLines={3}
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Current Weekly Caseload</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.currentWorkload}
                onChangeText={(text) => setProfileData({...profileData, currentWorkload: text})}
                placeholder="e.g., 12 surgeries/week"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.label}>Current Fatigue Level (1-10)</ThemedText>
              <TextInput
                style={styles.input}
                value={profileData.fatigueLevel}
                onChangeText={(text) => setProfileData({...profileData, fatigueLevel: text})}
                placeholder="1 = Well rested, 10 = Exhausted"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </ThemedView>

            <ThemedView style={styles.actionButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ParallaxScrollView>
      );
    }

    // Dashboard View
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#E8F5E8', dark: '#2D4A2D' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#4A90E2"
            name="person.circle.fill"
            style={styles.headerImage}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome Back!</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.dashboardContainer}>
          <ThemedView style={styles.profileCard}>
            <ThemedText type="subtitle">{user.firstName} {user.lastName}</ThemedText>
            <ThemedText style={styles.email}>{user.email}</ThemedText>
            {user.profile && (
              <>
                <ThemedText style={styles.specialty}>{user.profile.specialty}</ThemedText>
                {user.profile.subspecialty && (
                  <ThemedText style={styles.subspecialty}>{user.profile.subspecialty}</ThemedText>
                )}
              </>
            )}
          </ThemedView>

          {user.profile && (
            <ThemedView style={styles.statsContainer}>
              <ThemedText type="subtitle">Your Statistics</ThemedText>
              <ThemedView style={styles.statsGrid}>
                <ThemedView style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{user.profile.experienceYears}</ThemedText>
                  <ThemedText style={styles.statLabel}>Years Experience</ThemedText>
                </ThemedView>
                <ThemedView style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{user.profile.casesCompleted}</ThemedText>
                  <ThemedText style={styles.statLabel}>Cases Completed</ThemedText>
                </ThemedView>
                <ThemedView style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{user.profile.successRate}%</ThemedText>
                  <ThemedText style={styles.statLabel}>Success Rate</ThemedText>
                </ThemedView>
                <ThemedView style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{user.profile.currentWorkload}</ThemedText>
                  <ThemedText style={styles.statLabel}>Current Load</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          )}

          <ThemedView style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={() => {
              setProfileData(user.profile || profileData);
              setIsEditing(true);
            }}>
              <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.matchButton} onPress={() => Alert.alert('Coming Soon', 'Patient matching feature coming soon!')}>
              <ThemedText style={styles.matchButtonText}>Find Patient Matches</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    );
  }

  // Show Login Screen if no user
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A90E2', dark: '#2D4A7A' }}
      headerImage={
        <IconSymbol
          size={310}
          color="white"
          name="person.badge.plus"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Welcome to Surger</ThemedText>
        <ThemedText style={styles.subtitle}>
          Sign in to access your surgeon profile and patient matching system
        </ThemedText>

        <ThemedView style={styles.formContainer}>
          {/* Email Input */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
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

          {/* Password Input */}
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              autoComplete="password"
            />
          </ThemedView>

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ThemedText style={styles.primaryButtonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </ThemedText>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <ThemedText style={styles.dividerText}>or</ThemedText>
            <View style={styles.dividerLine} />
          </View>

          {/* Register Button */}
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={handleRegister}
          >
            <ThemedText style={styles.secondaryButtonText}>
              Create New Account
            </ThemedText>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <ThemedText style={styles.linkText}>Forgot Password?</ThemedText>
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Dashboard styles
  dashboardContainer: {
    gap: 24,
  },
  profileCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  email: {
    opacity: 0.7,
    fontSize: 14,
  },
  specialty: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
  },
  subspecialty: {
    fontSize: 16,
    opacity: 0.8,
  },
  statsContainer: {
    gap: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    minWidth: '45%',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 4,
  },
  actionButtons: {
    gap: 12,
  },
  editButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  matchButton: {
    backgroundColor: '#2E8B57',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  matchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff6b6b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
  },
  // Form styles
  formContainer: {
    gap: 20,
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
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    opacity: 0.6,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#4A90E2',
    fontSize: 14,
  },
});
