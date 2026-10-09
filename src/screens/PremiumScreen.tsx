import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList, GradeLevel } from '../types';
import { useStore } from '../store/useStore';
import { gradeLabels } from '../data/lessons';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const avatars = ['🐼', '🦊', '🐻', '🐰', '🐨', '🦄'];
const gradeOrder: GradeLevel[] = ['preschool', 'kindergarten', 'grades1-2', 'grades3-5', 'grades6-7'];

export default function OnboardingScreen({ navigation }: Props) {
  const { setProfile, setSelectedGrade, profile } = useStore();
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [selectedGrade, setSelectedGradeLocal] = useState<GradeLevel>('preschool');

  const handleStart = async () => {
    await setProfile({ name: name.trim() || 'Explorer', avatar, isPremium: true });
    await setSelectedGrade(selectedGrade);
    navigation.navigate('Home', { grade: selectedGrade });
  };

  return (
    <LinearGradient colors={['#F5F3FF', '#E9D5FF', '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.badge}>RuAli Premium</Text>
          <Text style={styles.title}>Welcome, {name || 'Explorer'}!</Text>
          <Text style={styles.subtitle}>Create a joyful learning journey for your child.</Text>

          <View style={styles.card}>
            <Text style={styles.fieldLabel}>Your child’s name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Choose a character</Text>
            <View style={styles.avatarRow}>
              {avatars.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setAvatar(item as any)}
                  style={[styles.avatarButton, avatar === item && styles.avatarSelected]}
                >
                  <Text style={styles.avatarText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fieldLabel}>Select a learning level</Text>
            <View style={styles.gradeWrap}>
              {gradeOrder.map((grade) => (
                <TouchableOpacity
                  key={grade}
                  onPress={() => setSelectedGradeLocal(grade)}
                  style={[styles.gradeChip, selectedGrade === grade && styles.gradeChipSelected]}
                >
                  <Text style={[styles.gradeChipText, selectedGrade === grade && styles.gradeChipTextSelected]}>{gradeLabels[grade]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
            <Text style={styles.primaryText}>Start learning</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('GradeSelect')} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Browse without setup</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: 24, paddingTop: 32 },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    color: theme.colors.primary,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 14
  },
  title: { fontSize: 32, fontWeight: '900', color: theme.colors.dark, marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.darkSoft, marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 26, padding: 20, ...theme.shadow },
  fieldLabel: { fontSize: 16, fontWeight: '700', color: theme.colors.dark, marginBottom: 10, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
    color: theme.colors.dark
  },
  avatarRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  avatarButton: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center', margin: 6 },
  avatarSelected: { backgroundColor: theme.colors.primarySoft, borderWidth: 2, borderColor: theme.colors.primary },
  avatarText: { fontSize: 28 },
  gradeWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  gradeChip: { backgroundColor: '#F3F4F6', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, margin: 6 },
  gradeChipSelected: { backgroundColor: theme.colors.primary, },
  gradeChipText: { color: theme.colors.dark, fontWeight: '700', fontSize: 12 },
  gradeChipTextSelected: { color: '#fff' },
  primaryButton: { marginTop: 22, backgroundColor: theme.colors.primary, borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  secondaryButton: { marginTop: 12, alignItems: 'center', paddingVertical: 12 },
  secondaryText: { color: theme.colors.primary, fontSize: 16, fontWeight: '700' }
});
