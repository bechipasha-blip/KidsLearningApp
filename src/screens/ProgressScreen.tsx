import React, { useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLessonById } from '../data/lessons';
import { RootStackParamList } from '../types';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ navigation, route }: Props) {
  const lesson = getLessonById(route.params.lessonId);
  const { completeLesson } = useStore();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = useMemo(() => lesson?.questions[questionIndex], [lesson, questionIndex]);

  if (!lesson || !currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Quiz not found.</Text>
      </SafeAreaView>
    );
  }

  const handleAnswer = async (index: number) => {
    if (selectedIndex !== null) {
      return;
    }

    setSelectedIndex(index);
    setShowAnswer(true);

    if (index === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (questionIndex < lesson.questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setShowAnswer(false);
      return;
    }

    const finalScore = score + (selectedIndex === currentQuestion.answerIndex ? 1 : 0);
    const earnedPoints = Math.round((finalScore / lesson.questions.length) * lesson.points);

    await completeLesson(lesson.id, earnedPoints);
    navigation.navigate('Home', { grade: lesson.grade });
  };

  const answeredCorrectly = selectedIndex === currentQuestion.answerIndex;

  return (
    <LinearGradient colors={['#F5F3FF', '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.progressText}>Question {questionIndex + 1} / {lesson.questions.length}</Text>
          <Text style={styles.question}>{currentQuestion.prompt}</Text>

          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.answerIndex;
            const isSelected = index === selectedIndex;
            const optionStyle = showAnswer ? isCorrect ? styles.correctOption : isSelected ? styles.wrongOption : styles.option : styles.option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.8}
                onPress={() => handleAnswer(index)}
                style={[styles.optionButton, optionStyle]}
                disabled={selectedIndex !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}

          {showAnswer && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>{answeredCorrectly ? 'Great job!' : 'Nice try!'}</Text>
              <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
            <Text style={styles.primaryText}>{questionIndex === lesson.questions.length - 1 ? 'Finish lesson' : 'Next question'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.primarySoft, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 22, color: theme.colors.primary, fontWeight: '700' },
  headerTitle: { marginLeft: 12, fontSize: 22, fontWeight: '800', color: theme.colors.dark, flexShrink: 1 },
  scrollContent: { padding: 20, paddingTop: 10 },
  progressText: { fontSize: 16, fontWeight: '700', color: theme.colors.primary, marginBottom: 12 },
  question: { fontSize: 28, fontWeight: '800', color: theme.colors.dark, marginBottom: 18 },
  optionButton: { borderRadius: 16, paddingHorizontal: 18, paddingVertical: 16, marginBottom: 12, borderWidth: 2, borderColor: theme.colors.border, backgroundColor: '#fff' },
  option: { backgroundColor: '#fff' },
  correctOption: { backgroundColor: '#DCFCE7', borderColor: '#22C55E' },
  wrongOption: { backgroundColor: '#FEE2E2', borderColor: '#EF4444' },
  optionText: { fontSize: 18, color: theme.colors.dark, fontWeight: '700' },
  explanationBox: { marginTop: 8, backgroundColor: '#EEF2FF', borderRadius: 16, padding: 16, marginBottom: 18 },
  explanationTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.primary, marginBottom: 6 },
  explanationText: { fontSize: 15, lineHeight: 20, color: theme.colors.darkSoft },
  primaryButton: { backgroundColor: theme.colors.primary, paddingVertical: 16, borderRadius: 18, alignItems: 'center', marginTop: 8 },
  primaryText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  title: { fontSize: 24, fontWeight: '800', color: theme.colors.dark }
});
