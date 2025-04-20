import React, { useEffect, useState } from 'react';
import { View, Dimensions, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { getDashboardData, getAverageQuizScore, getTopTopics, getQuizScoresByDate, getStudyTimeByDate, DashboardData } from '../../utils/dashboardData';
import { useTheme } from '../../context/ThemeContext';
import { Text, Card, Button } from '../../components/ui';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background.DEFAULT }}>
      <View style={{ padding: 16 }}>
        <Text variant="h1">Welcome to LearnWise</Text>
        <Card
          title="Getting Started"
          subtitle="Learn the basics of our platform"
          icon="school"
          style={{ marginTop: 16 }}
        >
          <Text>Start your learning journey today!</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  content: {
    padding: 24,
    marginTop: -24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 16,
    ...theme.shadows.md,
  },
  statsContent: {
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    color: theme.colors.text.muted,
    fontSize: 12,
  },
  chartCard: {
    marginBottom: 24,
    borderRadius: 16,
    ...theme.shadows.md,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 6,
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
}); 