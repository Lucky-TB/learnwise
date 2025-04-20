import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { theme } from '../constants/theme';
import { ApiKeyProvider } from '../context/ApiKeyContext';

// Create a proper MD3 theme with all required properties
const paperTheme = {
  ...MD3LightTheme,
  ...theme,
  fonts: {
    ...MD3LightTheme.fonts,
    ...theme.fonts,
  },
  // Add the elevation property in the correct structure
  elevation: {
    level0: 0,
    level1: 1,
    level2: 2,
    level3: 3,
    level4: 4,
    level5: 5,
  },
  // Ensure the theme has the proper structure for MD3
  colors: {
    ...MD3LightTheme.colors,
    ...theme.colors,
  },
  // Add any missing MD3 theme properties
  roundness: theme.roundness || 4,
  animation: {
    scale: 1.0,
  },
};

export default function RootLayout() {
  return (
    <ApiKeyProvider>
      <PaperProvider theme={paperTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ApiKeyProvider>
  );
}
