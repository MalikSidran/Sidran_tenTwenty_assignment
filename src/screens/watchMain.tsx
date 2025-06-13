import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import useWatchStore from '../stores/watchStore';
import {DefaultText} from '../utils/GlobalStyles/GlobalStyles';

// Define type for navigation props
type RootStackParamList = {
  watchmain: undefined;
  watchSearch: undefined;
  movieDetail: {id: number};
  videoPlayer: {movieId: number};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function WatchMain() {
  const navigation = useNavigation<NavigationProp>();
  const {
    loading,
    upcomingMovieResponse,
    movieVideosResponse,
    upcomingMoviesService,
    movieVideosService,
  } = useWatchStore(state => state);

  useEffect(() => {
    upcomingMoviesService();
  }, []);

  // useEffect(()=>{
  //   movieVideosService(Number(upcomingMovieResponse?.results[0].id))
  // },[upcomingMovieResponse])

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <DefaultText style={styles.headerText}>Watch</DefaultText>
          <TouchableOpacity onPress={() => navigation.navigate('watchSearch')}>
            <Image
              style={styles.searchIcon}
              source={require('../assets/images/searchWithBack.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Movie List */}
        <FlatList
          data={upcomingMovieResponse?.results}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('movieDetail', {
                  id: item?.id,
                })
              }
              style={styles.movieCard}>
              <Image
                style={styles.movieImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`,
                }}
              />
              <View style={styles.overlayContainer}>
                <DefaultText style={styles.movieTitle}>
                  {item?.title}
                </DefaultText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    minHeight: responsiveScreenHeight(8),
  },
  headerText: {
    color: '#202C43',
    fontSize: 18,
    fontWeight: '500',
  },
  searchIcon: {
    marginRight: 7,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: '#F6F6FA',
    paddingTop: 18,
  },
  movieCard: {
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    height: responsiveScreenHeight(24),
    marginHorizontal: 14,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 25,
    zIndex: 11,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: responsiveScreenFontSize(2),
    color: 'white',
    marginTop: 10,
    fontWeight: '500',
  },
});
