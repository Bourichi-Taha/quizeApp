import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreenComponent from "./SplashScreenComponent";
import IntroSliders from "./IntroSliders";
import { QuizProvider } from "@/components/QuizContext";
/* import mobileAds from "react-native-google-mobile-ads"; */
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import LoadingScreen from "./LoadingScreen";
import TabLayout from "./(tabs)/_layout";
import Quizzes from "./(tabs)/Quizzes";
import Result from "./Result";

const MyStack = createStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Rancho: require("../assets/fonts/Rancho-Regular.ttf"),
    Abel: require("../assets/fonts/Abel-Regular.ttf"),
    Beiruti: require("../assets/fonts/Beiruti-Medium.ttf"),
    Museo: require("../assets/fonts/MuseoModerno-VariableFont_wght.ttf"),
    MuseoBold: require("../assets/fonts/MuseoModerno-Regular.ttf"),
  });

  /* useEffect(() => {
    (async () => {
      const { status: trackingStatus } =
        await requestTrackingPermissionsAsync();
      if (trackingStatus !== "granted") {
        // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
      }

      await mobileAds().initialize();
    })();
  }, []); */

  useEffect(() => {
    if (loaded) {
      setTimeout(() => SplashScreen.hideAsync(), 5000);
    }
  }, [loaded]);

  return (
    <QuizProvider>
      <NavigationContainer independent={true}>
        <MyStack.Navigator initialRouteName="SplashScreenComponent">
          <MyStack.Screen
            name="SplashScreenComponent"
            component={SplashScreenComponent}
            options={{ headerShown: false }}
          />
          <MyStack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <MyStack.Screen
            name="IntroSliders"
            component={IntroSliders}
            options={{ headerShown: false }}
          />
          <MyStack.Screen
            name="TabLayout"
            component={TabLayout}
            options={{ headerShown: false }}
          />
          <MyStack.Screen
            name="Quizzes"
            component={Quizzes}
            options={{ headerShown: false }}
          />
          <MyStack.Screen
            name="Result"
            component={Result}
            options={{ headerShown: false }}
          />
        </MyStack.Navigator>
      </NavigationContainer>
    </QuizProvider>
  );
}
