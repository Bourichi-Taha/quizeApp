import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  View,
  Text,
} from "react-native";

interface LevelCardProps {
  number: string;
  onPress: void;
  style?: object | number | Array<object | number>;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 100) / 2;

const LevelCard: React.FC<LevelCardProps> = ({ number, onPress }) => {
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.11,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 7,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: "#000000",
      shadowOpacity: 0.11,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 7,
    },
  });

  return (
    <View>
      <TouchableOpacity style={[styles.card, shadowStyle]} onPress={onPress}>
        <Image
          source={require("../assets/images/icons/medal.png")}
          style={[styles.cardImage, shadowStyle]}
        />
        <Text style={styles.cardTitle}> Level {number}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: 104,
    height: 126,
    flexDirection: "column",
    marginBottom: 15,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cardImage: {
    borderRadius: 20,
    width: 64,
    height: 75,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "MuseoBold",
    fontWeight: "400",
  },
});

export default LevelCard;
