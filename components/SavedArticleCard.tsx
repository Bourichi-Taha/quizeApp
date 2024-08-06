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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorites } from "./favouritesContext";

interface SavedCharacterCardProps {
  index: number;
  title: string;
  images: string[];
  image: string;
  onPress: () => void;
  onPressHeart: () => void;
  isFavorite: boolean;
  style?: object | number | Array<object | number>;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 45) / 2;

const SavedCharacterCard: React.FC<SavedCharacterCardProps> = ({
  index,
  title,
  images,
  image,
  onPress,
  onPressHeart,
  isFavorite,
}) => {
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const currentImage = images[currentImageIndex];

  const category = {
    id: index,
    images: images,
    category: title,
    image: image,
  };

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        const favourites = await AsyncStorage.getItem("@userFavourites");
        const favouritesArray = favourites ? JSON.parse(favourites) : [];
        const exists = favouritesArray.some((fav) => fav.title === title);
        setIsFavourite(exists);
      } catch (error) {
        console.error("Error checking if favourite", error);
      }
    };
    checkIfFavourite();
  }, [title]);

  const handleToggleFavourite = () => {
    onPressHeart();
    setIsFavourite(!isFavourite);
  };
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  return (
    <View style={[styles.card]}>
      <TouchableOpacity style={[styles.card, shadowStyle]} onPress={onPress}>
        <Image source={currentImage} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Fancomic Rayman Nightmarish</Text>
        <TouchableOpacity
          style={[styles.likeButton]}
          onPress={() => onPressHeart()}
        >
          <Image
            source={require("../assets/images/icons/icons8-saved-100.png")}
            style={styles.likeButtonImage}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#ffffff",
    width: cardWidth,
    height: 220,
    overflow: "hidden",
    flexDirection: "column",
    marginBottom: 5,
  },
  cardImage: {
    borderRadius: 20,
    width: 180,
    height: 180,
    shadowColor: "#000000",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
  },
  likeButton: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  likeButtonImage: {
    width: 24,
    height: 24,
    tintColor: "#FF9F98",
    alignSelf: "center",
  },
  cardTitle: {
    color: "grey",
    fontSize: 11,
    left: 5,
    top: 5,
    fontFamily: "MuseoBold",
    marginRight: 7,
  },
  cardText: {
    color: "grey",
    fontSize: 9,
    top: 7,
    left: 5,
    marginRight: 150,
    fontFamily: "MuseoBold",
  },
});

export default SavedCharacterCard;
