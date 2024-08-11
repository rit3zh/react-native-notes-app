# React Native Notes App

A basic note-taking app built with React Native for iOS using `expo-sqlite` for database management. This app allows users to create, fetch, and delete notes, each with a title, color, icon, content, and creation date.

## Features

- Create new notes with a title, color, icon, and content.
- Fetch and display a list of notes.
- Delete notes as needed.
- Manage notes with a local SQLite database.

## Installation

Follow these steps to set up and run the app:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rit3zh/react-native-notes-app.git
   cd react-native-notes-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Prepare the iOS Project**

   ```bash
   npx expo prebuild
   cd ios
   pod install
   ```

4. **Run the App on iOS**
   ```bash
   npm run ios
   ```

## Development

For local development, you can use the following commands:

- **Start the Expo development server**

  ```bash
  npm start
  ```

- **Run the app on an iOS simulator or connected device**
  ```bash
  npm run ios
  ```

## Contributing

Feel free to fork the repository and submit pull requests. For issues or feature requests, please open an issue on the [GitHub repository](https://github.com/rit3zh/react-native-notes-app/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)

Replace `https://github.com/rit3zh/react-native-notes-app.git` with the actual URL of your repository. Adjust any other specifics as needed for your project.
