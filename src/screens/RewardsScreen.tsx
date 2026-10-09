import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types';
import { useStore } from '../store/useStore';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Progress'>;

export default function ProgressScreen({ navigation }: Props) {
  const { progress } = useStore();

  return (
    <LinearGradient colors={['#F5F3FF', '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Progress</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryEmoji}>🏆</Text>
            <Text style={styles.summaryValue}>{progress.starCount}</Text>
            <Text style={styles.summaryLabel}>Stars earned</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.miniCard}>
              <Text style={styles.miniEmoji}>📘</Text>
              <Text style={styles.miniValue}>{progress.completedLessons.length}</Text>
              <Text style={styles.miniLabel}>Lessons</Text>
            </View>

            <View style={styles.miniCard}>
              <Text style={styles.miniEmoji}>🔥</Text>
              <Text style={styles.miniValue}>{progress.streak}</Text>
              <Text style={styles.miniLabel}>Streak</Text>
            </View>
          </View>

          <View style={styles.badgeSection}>
            <Text style={styles.sectionTitle}>Badges</Text>
            {progress.badges.length > 0 ? (
              progress.badges.map((badge) => (
                <View key={badge} style={styles.badgeItem}>
                  <Text style={styles.badgeIcon}>⭐</Text>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No badges yet. Start learning to earn your first one!</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 12 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: theme.colors.primarySoft, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 22, color: theme.colors.primary, fontWeight: '700' },
  headerTitle: { marginLeft: 12, fontSize: 24, fontWeight: '800', color: theme.colors.dark },
  scrollContent: { padding: 20 },
  summaryCard: { backgroundColor: theme.colors.primary, borderRadius: 24, padding: 24, alignItems: 'center', ...theme.shadow },
  summaryEmoji: { fontSize: 42 },
  summaryValue: { fontSize: 42, fontWeight: '900', color: '#fff', marginTop: 8 },
  summaryLabel: { fontSize: 16, color: '#E9D5FF', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  miniCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 18, alignItems: 'center', marginRight: 8, ...theme.shadow },
  miniEmoji: { fontSize: 28 },
  miniValue: { fontSize: 28, fontWeight: '800', color: theme.colors.dark, marginTop: 8 },
  miniLabel: { fontSize: 14, color: theme.colors.darkSoft, marginTop: 4 },
  badgeSection: { marginTop: 20, backgroundColor: '#fff', borderRadius: 20, padding: 18, ...theme.shadow },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: theme.colors.dark, marginBottom: 14 },
  badgeItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.softYellow, borderRadius: 12, padding: 12, marginBottom: 10 },
  badgeIcon: { fontSize: 20, marginRight: 10 },
  badgeText: { fontSize: 16, fontWeight: '700', color: theme.colors.dark },
  emptyText: { color: theme.colors.darkSoft, fontSize: 15, lineHeight: 22 }
});
