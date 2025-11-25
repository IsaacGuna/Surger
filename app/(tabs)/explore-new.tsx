import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function DoctorProfileScreen() {
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

  const handleSave = () => {
    // TODO: Save to backend/storage
    Alert.alert('Profile Saved', 'Your surgeon profile has been updated successfully!');
  };

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
        <ThemedText type="title">Doctor Profile</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Professional Information</ThemedText>
        
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

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>Save Profile</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#4A90E2',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 48,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
