# LearnWise 📚

A smart learning companion that helps you track progress, create study plans, and take quizzes while adapting to your accessibility needs.

## Features

- 📊 Progress tracking with interactive charts
- 📝 Personalized study plans
- 🎯 Adaptive quizzes
- ♿️ Accessibility features (text-to-speech, high contrast mode)
- 🌓 Dark/Light theme support
- 📱 Cross-platform (iOS & Android)

## Tech Stack

- React Native with Expo
- NativeWind for styling
- Expo Router for navigation
- Context API for state management
- React Native Paper
- Expo Blur

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/learnwise.git
   cd learnwise
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your device
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator

## API Integration

This project uses the following APIs:
- OpenAI API for generating study plans and quiz questions
- Text-to-Speech API for accessibility features

To use these features, you'll need to:
1. Create a `.env` file in the root directory
2. Add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
