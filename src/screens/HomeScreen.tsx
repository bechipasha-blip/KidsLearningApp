import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/useStore';
import { gradeLabels } from '../data/lessons';
import { RootStackParamList, GradeLevel } from '../types';
import { theme } from '../theme';

const gradeOrder: GradeLevel[] = ['preschool', 'kindergarten', 'grades1-2', 'grades3-5', 'grades6-7'];

export default function GradeSelectScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { hydrate, setSelectedGrade, selectedGrade } = useStore();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handlePress = async (grade: GradeLevel) => {
    await setSelectedGrade(grade);
    navigation.navigate('Home', { grade });
  };

  return (
    <LinearGradient colors={['#F5F3FF', '#EDE9FE', '#F8FAFC']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerBadge}>
            <Text style={styles.badgeText}>RuAli</Text>
          </View>

          <Text style={styles.emoji}>🌟</Text>
          <Text style={styles.title}>Choose a learning level</Text>
          <Text style={styles.subtitle}>Learn, play, and grow from preschool to grade 7.</Text>

          {gradeOrder.map((grade) => {
            const isSelected = selectedGrade === grade;
            return (
              <TouchableOpacity
                key={grade}
                activeOpacity={0.9}
                onPress={() => handlePress(grade)}
                style={[styles.gradeCard, isSelected && styles.selectedCard]}
              >
                <View style={styles.cardRow}>
                  <View style={styles.iconWrap}>
                    <Text style={styles.iconText}>{grade === 'preschool' ? '🎨' : grade === 'kindergarten' ? '📚' : grade === 'grades1-2' ? '🧠' : grade === 'grades3-5' ? '🚀' : '🏆'}</Text>
                  </View>

                  <View style={styles.textWrap}>
                    <Text style={styles.gradeName}>{gradeLabels[grade]}</Text>
                    <Text style={styles.gradeMeta}>Playful lessons and quizzes</Text>
                  </View>

                  <Text style={styles.arrow}>›</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 32 },
  headerBadge: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  badgeText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '800'
  },
  emoji: { fontSize: 56, textAlign: 'center', marginBottom: 12 },
  title: { fontSize: 30, fontWeight: '800', color: theme.colors.dark, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.darkSoft, textAlign: 'center', marginBottom: 28 },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.radius.lg,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadow
  },
  selectedCard: { borderColor: theme.colors.primary, backgroundColor: theme.colors.primarySoft },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#FDE68A', justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 28 },
  textWrap: { flex: 1, marginLeft: 14 },
  gradeName: { fontSize: 22, fontWeight: '700', color: theme.colors.dark },
  gradeMeta: { marginTop: 2, fontSize: 14, color: theme.colors.darkSoft },
  arrow: { fontSize: 30, color: theme.colors.primary, fontWeight: '700' }
});
