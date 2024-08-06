import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../utils/index";
import metaData from "../db.json";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomImages = () => {
  const shuffledCarousel = shuffleArray([...metaData.sliders]);
  return shuffledCarousel.slice(0, 3).map((imageKey) => images[imageKey]);
};

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const SlidersScreen = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const randomImages = getRandomImages();
    const newSlides = [
      {
        key: "one",
        title: "Discover Stunning Wallpapers",
        text: "Browse a diverse collection of  \nhigh-quality images to personalize your device.",
        image: randomImages[0],
      },
      {
        key: "two",
        title: "Effortless Customization",
        text: "Easily preview and set new wallpapers \nwith just a few taps.",
        image: randomImages[1],
      },
      {
        key: "three",
        title: "Stay Inspired",
        text: "Enjoy fresh, curated wallpapers regularly \nto keep your screen looking vibrant and new.",
        image: randomImages[2],
      },
    ];
    setSlides(newSlides);
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.optionButtonContainer}>
        <View style={styles.optionButton}>
          <Image
            source={require("../assets/images/next.png")}
            style={styles.nextIcon}
          />
        </View>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.optionButtonContainer}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "TabLayout" }],
          })
        }
      >
        <View style={styles.optionButton}>
          <Image
            source={require("../assets/images/next.png")}
            style={styles.nextIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const _renderPrevButton = () => {
    return (
      <View style={styles.prevButton}>
        <LinearGradient
          colors={["#BBBBBB", "#BBBBBB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.prevButton}
        >
          <Text style={styles.prevText}>Back</Text>
        </LinearGradient>
      </View>
    );
  };

  const onDoneAllSlides = () => {
    setShowRealApp(true);
  };

  const onSkipSlides = () => {
    setShowRealApp(true);
  };

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  if (showRealApp) {
    return navigation.navigate("TabLayout");
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        bottomButton
        onDone={onDoneAllSlides}
        onSlideChange={handleSlideChange}
        activeDotStyle={{
          backgroundColor: "#FF9F98",
          width: 40,
          height: 8,
          bottom: 150,
        }}
        dotStyle={{
          backgroundColor: "#BBBBBB",
          bottom: 150,
          width: 8,
          height: 8,
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: windowHeight,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: "Beiruti",
    bottom: 20,
    color: "#27224B",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Beiruti",
    color: "#75718E",
    marginBottom: 100,
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.7,
    top: -70,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgb(242, 177, 188)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    color: "white",
  },
  prevText: {
    fontSize: 16,
    color: "white",
  },
  optionButtonContainer: {
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 159, 152, 0.2)",
    alignSelf: "center",
  },
  optionButton: {
    borderRadius: 50,
    width: 60.51,
    height: 60.51,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9F98",
    alignSelf: "center",
  },
  nextIcon: {
    width: 27,
    height: 27,
    transform: [{ rotate: "90deg" }],
    tintColor: "white",
  },
  firstOptionButton: {
    borderRadius: 50,
    width: 300,
    height: 50,
    alignItems: "center",
    ...Platform.select({
      ios: {
        right: 115,
      },
      android: {
        right: 145,
      },
    }),
    justifyContent: "center",
  },
  prevButton: {
    borderRadius: 50,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  optionText: {
    fontSize: 18,
    color: "#666",
    marginHorizontal: -20,
    fontFamily: "Beiruti",
  },
});

export default SlidersScreen;
