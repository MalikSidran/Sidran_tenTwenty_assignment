import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import useWatchStore from "../../stores/watchStore";
import { NavigationProp } from "@react-navigation/native";
import { Movie } from "../../interfaces/watch";

type RootStackParamList = {
  movieDetail: { id: number };
};

export default function WatchSearch() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { loading, upcomingMovieResponse } = useWatchStore((state) => state);
  const [searchText, setSearchText] = useState<string>("");
  const [searchDone, setSearchDone] = useState<boolean>(false);
  const isSearching = searchText.length > 0;
  const [movieList, setMovieList] = useState<Movie[] | undefined>(
    upcomingMovieResponse?.results
  );

  console.log("movieList>>???", movieList);
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = upcomingMovieResponse?.results?.filter((item: Movie) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setMovieList(filtered);
    } else {
      setMovieList(upcomingMovieResponse?.results);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} />
      <View style={{ backgroundColor: "#FFFFFF", padding: 20 }}>
        {searchDone ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setSearchDone(false);
                handleSearch("");
              }}
              style={{ paddingHorizontal: 12 }}
            >
              <Image source={require("../../assets/images/Vector.png")} />
            </TouchableOpacity>
            <Text style={styles.resultText}>
              {movieList?.length} Results Found
            </Text>
          </View>
        ) : (
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => isSearching && setSearchDone(true)}
            >
              <Image
                source={require("../../assets/images/searchWithBack.png")}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="TV shows, movies and more"
              placeholderTextColor={"#202C434D"}
              style={styles.searchInput}
              value={searchText}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Image source={require("../../assets/images/Close.png")} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.container}>
        {isSearching && !searchDone && (
          <>
            <Text style={styles.topResultsText}>Top Results</Text>
            <View style={styles.separator} />
          </>
        )}
        <FlatList
          data={movieList}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          key={isSearching ? "oneColumn" : "twoColumn"}
          numColumns={isSearching ? 1 : 2}
          renderItem={({ item }: { item: Movie }) => (
            <>
              {isSearching ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("movieDetail", { id: item.id })
                  }
                  style={styles.singleItem}
                >
                  <View
                    style={{
                      width: "88%",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        height: responsiveScreenHeight(12),
                        width: responsiveScreenWidth(34),
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: "57%",
                        justifyContent: "center",
                        paddingLeft: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#202C43",
                          fontWeight: "500",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#DBDBDF",
                          fontWeight: "500",
                          marginTop: 8,
                        }}
                      >
                        Fantasy
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{ marginRight: 7 }}
                    source={require("../../assets/images/hdots.png")}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("movieDetail", { id: item.id })
                  }
                  style={styles.doubleItem}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
                    }}
                  />
                  <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#EFEFEF" }} />
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#EFEFEF",
    height: responsiveScreenHeight(6),
    borderRadius: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  searchInput: {
    padding: 0,
    height: responsiveScreenHeight(5.6),
    width: "78%",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F6FA",
    paddingHorizontal: 20,
  },
  resultText: {
    marginLeft: 16,
    color: "#202C43",
    fontWeight: "500",
    fontSize: 16,
  },
  topResultsText: {
    color: "#202C43",
    marginTop: 25,
    fontWeight: "500",
  },
  separator: {
    borderWidth: 0.7,
    borderColor: "#0000001C",
    marginTop: 8,
  },
  listContainer: {
    flexGrow: 1,
    backgroundColor: "#F6F6FA",
    paddingTop: 20,
  },
  singleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  doubleItem: {
    borderRadius: 10,
    overflow: "hidden",
    height: responsiveScreenHeight(12),
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 6,
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 25,
    right: 25,
    zIndex: 11,
    justifyContent: "space-between",
  },
  overlayText: {
    fontSize: responsiveScreenFontSize(2),
    color: "white",
    marginTop: 10,
  },
});
