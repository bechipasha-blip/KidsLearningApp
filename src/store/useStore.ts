import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { GradeLevel, ProgressRecord, UserProfile } from '../types';

interface AppStore {
  selectedGrade: GradeLevel;
  progress: ProgressRecord;
  profile: UserProfile;
  setSelectedGrade: (grade: GradeLevel) => Promise<void>;
  setProfile: (profile: Partial<UserProfile>) => Promise<void>;
  togglePremium: (value?: boolean) => Promise<void>;
  completeLesson: (lessonId: string, points: number) => Promise<void>;
  setProgress: (progress: ProgressRecord) => Promise<void>;
  hydrate: () => Promise<void>;
}

const defaultProfile: UserProfile = {
  name: 'Explorer',
  avatar: '🦊',
  isPremium: true
};

const defaultProgress: ProgressRecord = {
  grade: 'preschool',
  completedLessons: [],
  starCount: 0,
  streak: 0,
  badges: []
};

export const useStore = create<AppStore>((set, get) => ({
  selectedGrade: 'preschool',
  progress: defaultProgress,
  profile: defaultProfile,

  setSelectedGrade: async (grade) => {
    const nextProgress = { ...get().progress, grade };
    set({ selectedGrade: grade, progress: nextProgress });
    await AsyncStorage.setItem('ruali_progress', JSON.stringify(nextProgress));
  },

  setProfile: async (profilePatch) => {
    const nextProfile = { ...get().profile, ...profilePatch };
    set({ profile: nextProfile });
    await AsyncStorage.setItem('ruali_profile', JSON.stringify(nextProfile));
  },

  togglePremium: async (value) => {
    const nextValue = value ?? !get().profile.isPremium;
    const nextProfile = { ...get().profile, isPremium: nextValue };
    set({ profile: nextProfile });
    await AsyncStorage.setItem('ruali_profile', JSON.stringify(nextProfile));
  },

  completeLesson: async (lessonId, points) => {
    const current = get().progress;

    if (current.completedLessons.includes(lessonId)) {
      return;
    }

    const updated: ProgressRecord = {
      ...current,
      completedLessons: [...current.completedLessons, lessonId],
      starCount: current.starCount + points,
      streak: current.streak + 1,
      badges: current.badges.includes('Learning Star')
        ? current.badges
        : [...current.badges, 'Learning Star']
    };

    set({ progress: updated });
    await AsyncStorage.setItem('ruali_progress', JSON.stringify(updated));
  },

  setProgress: async (progress) => {
    set({ selectedGrade: progress.grade, progress });
    await AsyncStorage.setItem('ruali_progress', JSON.stringify(progress));
  },

  hydrate: async () => {
    try {
      const progressValue = await AsyncStorage.getItem('ruali_progress');
      const profileValue = await AsyncStorage.getItem('ruali_profile');

      if (progressValue) {
        const parsedProgress = JSON.parse(progressValue) as ProgressRecord;
        set({ selectedGrade: parsedProgress.grade, progress: parsedProgress });
      }

      if (profileValue) {
        const parsedProfile = JSON.parse(profileValue) as UserProfile;
        set({ profile: parsedProfile });
      }
    } catch (error) {
      console.log('Hydration error', error);
    }
  }
}));
