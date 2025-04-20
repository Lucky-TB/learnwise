import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { Text, Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getDashboardData, getAverageQuizScore, getTopTopics, getQuizScoresByDate, getStudyTimeByDate, DashboardData } from '../../utils/dashboardData';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const loadDashboardData = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!dashboardData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          Failed to load dashboard data
        </Text>
      </View>
    );
  }

  const averageScore = getAverageQuizScore(dashboardData.quizScores);
  const topTopics = getTopTopics(dashboardData.topicsCovered);
  const quizScoresByDate = getQuizScoresByDate(dashboardData.quizScores);
  const studyTimeByDate = getStudyTimeByDate(dashboardData.studyTime);

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => theme.colors.primary,
    labelColor: (opacity = 1) => theme.colors.onSurface,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme.colors.primary,
    },
  };

  const pieChartData = topTopics.map((topic, index) => ({
    name: topic.name,
    count: topic.count,
    color: [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.tertiary,
      theme.colors.error,
      theme.colors.warning,
    ][index % 5],
    legendFontColor: theme.colors.onSurface,
    legendFontSize: 10,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Dashboard
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Your learning progress
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Surface style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="book-outline" size={20} color={theme.colors.primary} />
          <Text style={[styles.statsValue, { color: theme.colors.onSurface }]}>
            {dashboardData.quizzesCompleted}
          </Text>
          <Text style={[styles.statsLabel, { color: theme.colors.onSurfaceVariant }]}>
            Quizzes
          </Text>
        </Surface>

        <Surface style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="document-text-outline" size={20} color={theme.colors.secondary} />
          <Text style={[styles.statsValue, { color: theme.colors.onSurface }]}>
            {dashboardData.studyPlansCreated}
          </Text>
          <Text style={[styles.statsLabel, { color: theme.colors.onSurfaceVariant }]}>
            Plans
          </Text>
        </Surface>

        <Surface style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="flame-outline" size={20} color={theme.colors.error} />
          <Text style={[styles.statsValue, { color: theme.colors.onSurface }]}>
            {dashboardData.streakDays}
          </Text>
          <Text style={[styles.statsLabel, { color: theme.colors.onSurfaceVariant }]}>
            Streak
          </Text>
        </Surface>
      </View>

      {/* Charts Container */}
      <View style={styles.chartsContainer}>
        {/* Quiz Performance Chart */}
        <Surface style={[styles.chartCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
            Quiz Performance
          </Text>
          <LineChart
            data={{
              labels: quizScoresByDate.map(d => d.date.split('-')[2]),
              datasets: [{
                data: quizScoresByDate.map(d => d.score),
              }],
            }}
            width={width - 48}
            height={120}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Surface>

        {/* Study Time Chart */}
        <Surface style={[styles.chartCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
            Study Time
          </Text>
          <LineChart
            data={{
              labels: studyTimeByDate.map(d => d.date.split('-')[2]),
              datasets: [{
                data: studyTimeByDate.map(d => d.minutes),
              }],
            }}
            width={width - 48}
            height={120}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => theme.colors.secondary,
            }}
            bezier
            style={styles.chart}
          />
        </Surface>

        {/* Top Topics Chart */}
        <Surface style={[styles.chartCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
            Top Topics
          </Text>
          <PieChart
            data={pieChartData}
            width={width - 48}
            height={120}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </Surface>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Surface
          style={[styles.actionCard, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.push('/(tabs)/study-plan')}
        >
          <Ionicons name="create-outline" size={20} color={theme.colors.onPrimary} />
          <Text style={[styles.actionText, { color: theme.colors.onPrimary }]}>
            Study Plan
          </Text>
        </Surface>

        <Surface
          style={[styles.actionCard, { backgroundColor: theme.colors.secondary }]}
          onPress={() => router.push('/(tabs)/quiz')}
        >
          <Ionicons name="help-circle-outline" size={20} color={theme.colors.onSecondary} />
          <Text style={[styles.actionText, { color: theme.colors.onSecondary }]}>
            Take Quiz
          </Text>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statsLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  chartsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chartCard: {
    flex: 1,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chart: {
    marginVertical: 4,
    borderRadius: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
}); 