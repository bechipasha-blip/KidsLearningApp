import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLessonById } from '../data/lessons';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;

export default function LessonScreen({ navigation, route }: Props) {
  const lesson = getLessonById(route.params.lessonId);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Lesson not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient colors={['#F5F3FF', '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{lesson.category}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.badge}>{lesson.badge}</Text>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.desc}>{lesson.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoBox}>⭐ {lesson.points} pts</Text>
            <Text style={styles.infoBox}>{lesson.difficulty}</Text>
            <Text style={styles.infoBox}>{lesson.duration} min</Text>
          </View>

          <Text style={styles.learningTitle}>What you'll practice</Text>
          <Text style={styles.learningText}>• Focus on key ideas and quick problem-solving</Text>
          <Text style={styles.learningText}>• Answer fun questions with confidence</Text>
          <Text style={styles.learningText}>• Earn stars and unlock the next challenge</Text>

          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Quiz', { lessonId: lesson.id })}>
            <Text style={styles.primaryText}>Start lesson</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.primarySoft, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 22, color: theme.colors.primary, fontWeight: '700' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: theme.colors.dark, marginLeft: 14, flex: 1 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 22, ...theme.shadow },
  badge: { alignSelf: 'flex-start', borderRadius: 10, backgroundColor: theme.colors.softYellow, color: theme.colors.dark, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 6, marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '900', color: theme.colors.dark, marginBottom: 10 },
  desc: { fontSize: 16, lineHeight: 24, color: theme.colors.darkSoft, marginBottom: 18 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  infoBox: { backgroundColor: theme.colors.primarySoft, color: theme.colors.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, marginRight: 10, marginBottom: 8, fontWeight: '700' },
  learningTitle: { fontSize: 20, fontWeight: '800', color: theme.colors.dark, marginBottom: 8 },
  learningText: { fontSize: 16, color: theme.colors.darkSoft, marginBottom: 6, lineHeight: 24 },
  primaryButton: { marginTop: 24, backgroundColor: theme.colors.primary, borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  errorText: { fontSize: 18, color: theme.colors.dark, textAlign: 'center' }
});
