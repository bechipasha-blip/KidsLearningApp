import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ParentDashboard'>;

export default function ParentDashboardScreen({ navigation }: Props) {
  return (
    <LinearGradient colors={['#F5F3FF', '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Parent Dashboard</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryEmoji}>👩‍👧‍👦</Text>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Active learners</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>📈</Text>
              <Text style={styles.statValue}>82%</Text>
              <Text style={styles.statLabel}>Weekly progress</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🏅</Text>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>

          <View style={styles.listCard}>
            <Text style={styles.listTitle}>Today’s focus</Text>
            <Text style={styles.listItem}>• Reading confidence boost</Text>
            <Text style={styles.listItem}>• Math practice</Text>
            <Text style={styles.listItem}>• Science discovery</Text>
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
  summaryEmoji: { fontSize: 40 },
  summaryValue: { fontSize: 40, fontWeight: '900', color: '#fff', marginTop: 8 },
  summaryLabel: { fontSize: 16, color: '#E9D5FF', marginTop: 4 },
  row: { flexDirection: 'row', marginTop: 18 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 18, marginRight: 8, alignItems: 'center', ...theme.shadow },
  statEmoji: { fontSize: 28 },
  statValue: { fontSize: 28, fontWeight: '800', color: theme.colors.dark, marginTop: 8 },
  statLabel: { fontSize: 14, color: theme.colors.darkSoft, marginTop: 4, textAlign: 'center' },
  listCard: { marginTop: 20, backgroundColor: '#fff', borderRadius: 20, padding: 18, ...theme.shadow },
  listTitle: { fontSize: 22, fontWeight: '800', color: theme.colors.dark, marginBottom: 14 },
  listItem: { fontSize: 16, color: theme.colors.darkSoft, marginBottom: 8 }
});
