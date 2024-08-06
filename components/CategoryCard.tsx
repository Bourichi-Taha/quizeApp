import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryCardProps {
  title: string;
  image: string;
  wallpapers: string[];
  style?: object | number | Array<object | number>;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  wallpapers,
  onPress,
}) => {
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.11,
      shadowOffset: { width: 0, height: 1.6 },
      shadowRadius: 5,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
    },
  });

  const gradientColors = ["rgba(0,0,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];

  return (
    <TouchableOpacity style={[styles.card, shadowStyle]} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.textsView}>
        <Text style={styles.cardTitle}>Chapter 1</Text>
        <Text style={styles.cardDescription}>Fancomic Rayman Nightmarish</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textsView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 20,
    marginBottom: 10,
    width: "94%",
    height: 210,
    overflow: "hidden",
  },
  cardImage: {
    height: 210,
    borderRadius: 20,
    width: "100%",
  },
  overlayContainer: {
    width: "100%",
    height: 210,
    top: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardTitle: {
    color: "rgba(255,255,255,.5)",
    fontSize: 22,
    position: "absolute",
    fontFamily: "MuseoBold",
    marginBottom: 10,
    zIndex: 1,
    bottom: 100,
    paddingHorizontal: 10,
  },
  cardDescription: {
    fontSize: 18,
    fontFamily: "MuseoBold",
    color: "white",
    position: "absolute",
    bottom: 80,
    paddingHorizontal: 10,
    zIndex: 1,
  },
});

export default CategoryCard;
