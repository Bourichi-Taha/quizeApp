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

interface CharacterCardProps {
  title: string;
  image: string;
  onPress: void;
  style?: object | number | Array<object | number>;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 100) / 2;

const CharacterCard: React.FC<CharacterCardProps> = ({ image, onPress }) => {
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
        <Image source={image} style={[styles.cardImage, shadowStyle]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    width: 167,
    height: 166,
    flexDirection: "row",
    marginBottom: 15,
    alignContent: "center",
    alignItems: "center",
  },
  cardImage: {
    borderRadius: 20,
    width: 167,
    height: 166,
  },
});

export default CharacterCard;
