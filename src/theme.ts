import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { GradeLevel, ProgressRecord } from '../types';

interface AppStore {
  selectedGrade: GradeLevel;
  progress: ProgressRecord;
  setSelectedGrade: (grade: GradeLevel) => void;
  completeLesson: (lessonId: string, points: number) => void;
  setProgress: (progress: ProgressRecord) => void;
  hydrate: () => Promise<void>;
}

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

  setSelectedGrade: async (grade) => {
    const nextProgress = { ...get().progress, grade };
    set({ selectedGrade: grade, progress: nextProgress });
    await AsyncStorage.setItem('kids_app_progress', JSON.stringify(nextProgress));
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
    await AsyncStorage.setItem('kids_app_progress', JSON.stringify(updated));
  },

  setProgress: async (progress) => {
    set({ selectedGrade: progress.grade, progress });
    await AsyncStorage.setItem('kids_app_progress', JSON.stringify(progress));
  },

  hydrate: async () => {
    try {
      const value = await AsyncStorage.getItem('kids_app_progress');
      if (!value) {
        return;
      }

      const parsed = JSON.parse(value) as ProgressRecord;
      set({ selectedGrade: parsed.grade, progress: parsed });
    } catch (error) {
      console.log('Hydration error', error);
    }
  }
}));
