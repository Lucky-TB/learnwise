import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  QUIZZES_COMPLETED: '@dashboard_quizzes_completed',
  STUDY_PLANS_CREATED: '@dashboard_study_plans_created',
  QUIZ_SCORES: '@dashboard_quiz_scores',
  STUDY_TIME: '@dashboard_study_time',
  TOPICS_COVERED: '@dashboard_topics_covered',
  STREAK_DAYS: '@dashboard_streak_days',
  LAST_ACTIVITY: '@dashboard_last_activity',
};

// Types
export interface QuizData {
  id: string;
  topic: string;
  score: number;
  date: string;
  questionCount: number;
}

export interface StudyPlanData {
  id: string;
  topic: string;
  date: string;
  learningStyle: string;
  skillLevel: string;
}

export interface TopicData {
  name: string;
  count: number;
}

export interface DashboardData {
  quizzesCompleted: number;
  studyPlansCreated: number;
  quizScores: QuizData[];
  studyTime: number; // in minutes
  topicsCovered: TopicData[];
  streakDays: number;
  lastActivity: string;
}

// Default data
const defaultDashboardData: DashboardData = {
  quizzesCompleted: 0,
  studyPlansCreated: 0,
  quizScores: [],
  studyTime: 0,
  topicsCovered: [],
  streakDays: 0,
  lastActivity: new Date().toISOString(),
};

// Get all dashboard data
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.QUIZZES_COMPLETED);
    if (data) {
      return JSON.parse(data);
    }
    return defaultDashboardData;
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    return defaultDashboardData;
  }
};

// Save all dashboard data
export const saveDashboardData = async (data: DashboardData): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.QUIZZES_COMPLETED, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving dashboard data:', error);
  }
};

// Add a completed quiz
export const addCompletedQuiz = async (quizData: QuizData): Promise<void> => {
  try {
    const data = await getDashboardData();
    
    // Update quiz count
    data.quizzesCompleted += 1;
    
    // Add quiz score
    data.quizScores.push(quizData);
    
    // Update topics covered
    const topicIndex = data.topicsCovered.findIndex(topic => topic.name === quizData.topic);
    if (topicIndex >= 0) {
      data.topicsCovered[topicIndex].count += 1;
    } else {
      data.topicsCovered.push({ name: quizData.topic, count: 1 });
    }
    
    // Update last activity
    data.lastActivity = new Date().toISOString();
    
    // Update streak
    await updateStreak(data);
    
    // Save updated data
    await saveDashboardData(data);
  } catch (error) {
    console.error('Error adding completed quiz:', error);
  }
};

// Add a created study plan
export const addCreatedStudyPlan = async (studyPlanData: StudyPlanData): Promise<void> => {
  try {
    const data = await getDashboardData();
    
    // Update study plan count
    data.studyPlansCreated += 1;
    
    // Update topics covered
    const topicIndex = data.topicsCovered.findIndex(topic => topic.name === studyPlanData.topic);
    if (topicIndex >= 0) {
      data.topicsCovered[topicIndex].count += 1;
    } else {
      data.topicsCovered.push({ name: studyPlanData.topic, count: 1 });
    }
    
    // Update last activity
    data.lastActivity = new Date().toISOString();
    
    // Update streak
    await updateStreak(data);
    
    // Save updated data
    await saveDashboardData(data);
  } catch (error) {
    console.error('Error adding created study plan:', error);
  }
};

// Add study time
export const addStudyTime = async (minutes: number): Promise<void> => {
  try {
    const data = await getDashboardData();
    
    // Update study time
    data.studyTime += minutes;
    
    // Update last activity
    data.lastActivity = new Date().toISOString();
    
    // Update streak
    await updateStreak(data);
    
    // Save updated data
    await saveDashboardData(data);
  } catch (error) {
    console.error('Error adding study time:', error);
  }
};

// Update streak
const updateStreak = async (data: DashboardData): Promise<void> => {
  try {
    const lastActivity = new Date(data.lastActivity);
    const today = new Date();
    
    // Check if last activity was yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // If last activity was today, no change to streak
    if (lastActivity.toDateString() === today.toDateString()) {
      return;
    }
    
    // If last activity was yesterday, increment streak
    if (lastActivity.toDateString() === yesterday.toDateString()) {
      data.streakDays += 1;
    } else {
      // If last activity was more than a day ago, reset streak
      data.streakDays = 1;
    }
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};

// Get average quiz score
export const getAverageQuizScore = (quizScores: QuizData[]): number => {
  if (quizScores.length === 0) return 0;
  
  const totalScore = quizScores.reduce((sum, quiz) => sum + quiz.score, 0);
  return Math.round((totalScore / quizScores.length) * 100) / 100;
};

// Get top topics
export const getTopTopics = (topics: TopicData[], limit: number = 5): TopicData[] => {
  return [...topics]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

// Get quiz scores by date (for charts)
export const getQuizScoresByDate = (quizScores: QuizData[], days: number = 7): { date: string; score: number }[] => {
  const result: { date: string; score: number }[] = [];
  const today = new Date();
  
  // Create array of last N days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Find quizzes for this date
    const quizzesForDate = quizScores.filter(quiz => 
      quiz.date.split('T')[0] === dateString
    );
    
    // Calculate average score for this date
    let score = 0;
    if (quizzesForDate.length > 0) {
      const totalScore = quizzesForDate.reduce((sum, quiz) => sum + quiz.score, 0);
      score = Math.round((totalScore / quizzesForDate.length) * 100) / 100;
    }
    
    result.push({ date: dateString, score });
  }
  
  return result;
};

// Get study time by date (for charts)
export const getStudyTimeByDate = (studyTime: number, days: number = 7): { date: string; minutes: number }[] => {
  // This is a placeholder - in a real app, you would track study time per day
  // For now, we'll just distribute the total study time evenly across days
  const result: { date: string; minutes: number }[] = [];
  const today = new Date();
  const minutesPerDay = Math.round(studyTime / days);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    result.push({ date: dateString, minutes: minutesPerDay });
  }
  
  return result;
}; 