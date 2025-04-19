import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../constants/theme';
import { ApiKeyProvider } from '../context/ApiKeyContext';

export default function Layout() {
  return (
    <ApiKeyProvider>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              title: 'LearnWise',
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }} 
          />
          <Stack.Screen 
            name="study-plan" 
            options={{ 
              title: 'Study Plan',
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }} 
          />
          <Stack.Screen 
            name="quiz" 
            options={{ 
              title: 'Quiz',
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              title: 'Settings',
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }} 
          />
          <Stack.Screen 
            name="api-key" 
            options={{ 
              title: 'API Key',
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
            }} 
          />
        </Stack>
      </PaperProvider>
    </ApiKeyProvider>
  );
}
