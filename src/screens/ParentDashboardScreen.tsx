import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Rewards'>;

const rewards = [
  { id: '1', title: 'Spark Starter', icon: '⭐', description: 'Finish your first lesson' },
  { id: '2', title: 'Brave Learner', icon: '🏅', description: 'Earn 50 stars' },
  { id: '3', title: 'Curious Explorer', icon: '🚀', description: 'Complete 3 lessons' },
  { id: '4', title: 'RuAli Champion', icon: '👑', description: 'Finish a full level' }
];

export default function RewardsScreen({ navigation }: Props) {
  return (
    <LinearGradient colors={['#F5F3FF', '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rewards</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <Text style={styles.rewardIcon}>{reward.icon}</Text>
              <View style={styles.rewardTextWrap}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
              </View>
              <Text style={styles.rewardLock}>Unlocked</Text>
            </View>
          ))}
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
  rewardCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 14, ...theme.shadow },
  rewardIcon: { fontSize: 34, marginRight: 14 },
  rewardTextWrap: { flex: 1 },
  rewardTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.dark },
  rewardDescription: { color: theme.colors.darkSoft, marginTop: 4 },
  rewardLock: { color: theme.colors.primary, fontWeight: '800' }
});
