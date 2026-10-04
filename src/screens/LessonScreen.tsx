import React, { useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStore } from '../store/useStore';
import { getLessonsByGrade, gradeLabels } from '../data/lessons';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: Props) {
  const grade = route.params.grade;
  const lessons = useMemo(() => getLessonsByGrade(grade), [grade]);
  const { progress } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('GradeSelect')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{gradeLabels[grade]}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Progress')} style={styles.progressButton}>
          <Text style={styles.progressText}>⭐ {progress.starCount}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Today’s adventure</Text>
        <Text style={styles.bannerSubtitle}>Keep learning with one fun challenge at a time.</Text>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const completed = progress.completedLessons.includes(item.id);

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
              style={[styles.card, completed && styles.completedCard]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardBadge}>{item.category}</Text>
                <Text style={styles.cardStars}>⭐ {item.points}</Text>
              </View>

              <Text style={styles.lessonTitle}>{item.title}</Text>
              <Text style={styles.lessonDesc}>{item.description}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.metaText}>{item.difficulty}</Text>
                <Text style={styles.metaText}>{item.duration} min</Text>
              </View>

              <Text style={styles.ctaText}>{completed ? 'Completed ✓' : 'Play now'}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backText: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: '700'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.dark
  },
  progressButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FDE68A'
  },
  progressText: {
    fontWeight: '700',
    color: theme.colors.dark
  },
  banner: {
    backgroundColor: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
    marginHorizontal: 18,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    backgroundColor: theme.colors.primary
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800'
  },
  bannerSubtitle: {
    color: '#E9D5FF',
    marginTop: 6,
    fontSize: 14
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 28
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadow
  },
  completedCard: {
    borderColor: theme.colors.success,
    backgroundColor: '#ECFDF5'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardBadge: {
    backgroundColor: theme.colors.softBlue,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: '700',
    color: theme.colors.primary
  },
  cardStars: {
    fontWeight: '700',
    color: theme.colors.secondary
  },
  lessonTitle: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.dark
  },
  lessonDesc: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.darkSoft
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14
  },
  metaText: {
    color: theme.colors.darkSoft,
    fontWeight: '600'
  },
  ctaText: {
    marginTop: 12,
    fontWeight: '800',
    color: theme.colors.primary,
    fontSize: 16
  }
});
