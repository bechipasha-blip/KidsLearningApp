export type GradeLevel =
  | 'preschool'
  | 'kindergarten'
  | 'grades1-2'
  | 'grades3-5'
  | 'grades6-7';

export type Avatar = '🐼' | '🦊' | '🐻' | '🐰' | '🐨' | '🦄';

export type LessonCategory = 'Math' | 'Reading' | 'Science' | 'Logic' | 'Creative' | 'Games';

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  grade: GradeLevel;
  category: LessonCategory;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  description: string;
  points: number;
  badge: string;
  icon: string;
  questions: Question[];
};

export type ProgressRecord = {
  grade: GradeLevel;
  completedLessons: string[];
  starCount: number;
  streak: number;
  badges: string[];
};

export type UserProfile = {
  name: string;
  avatar: Avatar;
  isPremium: boolean;
};

export type RootStackParamList = {
  Onboarding: undefined;
  GradeSelect: undefined;
  Home: { grade?: GradeLevel };
  Lesson: { lessonId: string };
  Quiz: { lessonId: string };
  Progress: undefined;
  Rewards: undefined;
  ParentDashboard: undefined;
  Premium: undefined;
};
