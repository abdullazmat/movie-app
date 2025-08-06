import 'dotenv/config';

export default {
  expo: {
    name: "movie",
    slug: "movie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/adaptive-icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/adaptive-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.abdullahazmat.movie"
    },
    web: {
      favicon: "./assets/adaptive-icon.png"
    },
    extra: {
      eas: {
        projectId: "f0be34f6-bd23-4068-93c3-52d5e6fb000b"
      },
      MOVIE_API_KEY: process.env.MOVIE_API_KEY,
    }
  }
};
