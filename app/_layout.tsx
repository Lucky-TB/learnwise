import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { theme } from '../constants/theme';
import { ApiKeyProvider } from '../context/ApiKeyContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { ToastProvider } from '../components/ui/ToastProvider';
import { StyledComponent } from 'nativewind';
import '../app/global.css';

// Create a proper MD3 theme with all required properties
const createPaperTheme = (isDark: boolean) => ({
  ...(isDark ? MD3DarkTheme : MD3LightTheme),
  ...theme,
  fonts: {
    ...(isDark ? MD3DarkTheme.fonts : MD3LightTheme.fonts),
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
    ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
    ...theme.colors,
  },
  // Add any missing MD3 theme properties
  roundness: theme.roundness || 4,
  animation: {
    scale: 1.0,
  },
});

function AppContent() {
  const { isDark } = useTheme();
  const paperTheme = createPaperTheme(isDark);
  const { highContrast } = useSettings();

  return (
    <StyledComponent component={PaperProvider} theme={paperTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: highContrast 
              ? theme.colors.background.DARK 
              : theme.colors.background.DEFAULT,
          },
          headerTintColor: highContrast 
            ? theme.colors.text.light 
            : theme.colors.text.DEFAULT,
          contentStyle: {
            backgroundColor: highContrast 
              ? theme.colors.background.DARK 
              : theme.colors.background.DEFAULT,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
    </StyledComponent>
  );
}

export default function RootLayout() {
  const { theme } = useTheme();
  
  return (
    <ThemeProvider>
      <SettingsProvider>
        <PaperProvider theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </PaperProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
