import React, { useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/useStore';
import { getLessonsByGrade, gradeLabels } from '../data/lessons';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: Props) {
  const grade = route.params.grade ?? 'preschool';
  const lessons = useMemo(() => getLessonsByGrade(grade), [grade]);
  const { progress } = useStore();

  return (
    <LinearGradient colors={['#F5F3FF', '#EEF2FF', '#F8FAFC']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('GradeSelect')} style={styles.navButton}>
              <Text style={styles.navText}>←</Text>
            </TouchableOpacity>

            <View style={styles.titleWrap}>
              <Text style={styles.appName}>RuAli</Text>
              <Text style={styles.gradeText}>{gradeLabels[grade]}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Progress')} style={styles.progressButton}>
              <Text style={styles.progressText}>⭐ {progress.starCount}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.heroEmoji}>🚀</Text>
            <Text style={styles.heroTitle}>Ready for today’s challenge?</Text>
            <Text style={styles.heroSubtitle}>Complete a lesson, earn stars, and unlock your next bright idea.</Text>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Rewards')}>
              <Text style={styles.actionIcon}>🏆</Text>
              <Text style={styles.actionLabel}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('ParentDashboard')}>
              <Text style={styles.actionIcon}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.actionLabel}>Parent</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning path</Text>
            <Text style={styles.sectionMeta}>{lessons.length} activities</Text>
          </View>

          <FlatList
            data={lessons}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const completed = progress.completedLessons.includes(item.id);

              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
                  style={[styles.lessonCard, completed && styles.completedCard]}
                >
                  <View style={styles.lessonTop}>
                    <View style={styles.iconCircle}><Text style={styles.lessonIcon}>{item.icon}</Text></View>
                    <View style={styles.lessonHeaderText}>
                      <Text style={styles.lessonCategory}>{item.category}</Text>
                      <Text style={styles.lessonTitle}>{item.title}</Text>
                    </View>
                    <Text style={styles.lessonPoints}>⭐ {item.points}</Text>
                  </View>

                  <Text style={styles.lessonDescription}>{item.description}</Text>

                  <View style={styles.lessonFooter}>
                    <Text style={styles.lessonMeta}>{item.difficulty}</Text>
                    <Text style={styles.lessonMeta}>{item.duration} min</Text>
                  </View>

                  <Text style={styles.lessonCta}>{completed ? 'Completed ✓' : 'Play now'}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 28 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  navButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', ...theme.shadow },
  navText: { color: theme.colors.primary, fontSize: 24, fontWeight: '800' },
  titleWrap: { alignItems: 'center', flex: 1 },
  appName: { fontSize: 24, fontWeight: '900', color: theme.colors.dark },
  gradeText: { fontSize: 14, color: theme.colors.primary, fontWeight: '700' },
  progressButton: { backgroundColor: '#FDE68A', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  progressText: { color: theme.colors.dark, fontWeight: '800' },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 18,
    ...theme.shadow
  },
  heroEmoji: { fontSize: 36, marginBottom: 8 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: theme.colors.dark, marginBottom: 6 },
  heroSubtitle: { fontSize: 15, color: theme.colors.darkSoft, lineHeight: 22 },
  quickActions: { flexDirection: 'row', marginBottom: 22 },
  actionCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 16, alignItems: 'center', marginRight: 10, ...theme.shadow },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionLabel: { fontSize: 16, fontWeight: '700', color: theme.colors.dark },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: theme.colors.dark },
  sectionMeta: { color: theme.colors.darkSoft, fontWeight: '700' },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadow
  },
  completedCard: { borderColor: '#22C55E', backgroundColor: '#ECFDF5' },
  lessonTop: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 52, height: 52, borderRadius: 16, backgroundColor: theme.colors.primarySoft, justifyContent: 'center', alignItems: 'center' },
  lessonIcon: { fontSize: 26 },
  lessonHeaderText: { flex: 1, marginLeft: 12 },
  lessonCategory: { color: theme.colors.primary, fontWeight: '800', fontSize: 12 },
  lessonTitle: { fontSize: 21, fontWeight: '800', color: theme.colors.dark },
  lessonPoints: { color: theme.colors.secondary, fontWeight: '800' },
  lessonDescription: { marginTop: 12, color: theme.colors.darkSoft, lineHeight: 21 },
  lessonFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  lessonMeta: { fontSize: 13, fontWeight: '700', color: theme.colors.darkSoft },
  lessonCta: { marginTop: 14, fontWeight: '800', color: theme.colors.primary, fontSize: 16 }
});
