import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/useStore';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Premium'>;

const features = [
  'Unlimited lesson packs',
  'Personalized smart path',
  'Ad-free learning experience',
  'Premium progress insights',
  'Offline access for trips and travel'
];

export default function PremiumScreen({ navigation }: Props) {
  const { togglePremium, profile } = useStore();

  const handleActivate = async () => {
    await togglePremium(true);
    navigation.navigate('Home', { grade: 'preschool' });
  };

  return (
    <LinearGradient colors={['#F5F3FF', '#FDF2F8', '#EFF6FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>RuAli Premium</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.heroCard}>
            <Text style={styles.heroBadge}>Best value</Text>
            <Text style={styles.title}>Unlock your child’s full learning journey</Text>
            <Text style={styles.price}>$9.99/mo</Text>
          </View>

          {features.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.primaryButton} onPress={handleActivate}>
            <Text style={styles.primaryText}>{profile.isPremium ? 'Premium active' : 'Activate Premium'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 10 },
  backButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', ...theme.shadow },
  backText: { fontSize: 22, color: theme.colors.primary, fontWeight: '700' },
  headerTitle: { marginLeft: 12, fontSize: 24, fontWeight: '800', color: theme.colors.dark },
  content: { padding: 20 },
  heroCard: { backgroundColor: '#fff', borderRadius: 28, padding: 22, marginBottom: 16, ...theme.shadow },
  heroBadge: { alignSelf: 'flex-start', backgroundColor: '#FDE68A', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, fontWeight: '800', color: theme.colors.dark },
  title: { fontSize: 28, fontWeight: '900', color: theme.colors.dark, marginTop: 14 },
  price: { fontSize: 28, fontWeight: '900', color: theme.colors.primary, marginTop: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, ...theme.shadow },
  check: { color: theme.colors.success, fontSize: 20, fontWeight: '900', marginRight: 12 },
  featureText: { fontSize: 16, color: theme.colors.dark, fontWeight: '700' },
  primaryButton: { marginTop: 18, backgroundColor: theme.colors.primary, borderRadius: 18, paddingVertical: 16, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 18, fontWeight: '800' }
});
