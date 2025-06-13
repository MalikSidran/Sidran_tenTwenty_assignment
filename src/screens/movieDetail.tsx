import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import useWatchStore from '../stores/watchStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Define navigation params type
type RootStackParamList = {
  watchmain: undefined;
  watchSearch: undefined;
  movieDetail: {id: number};
  videoPlayer: {movieId: number};
};

// Define props type
type Props = NativeStackScreenProps<RootStackParamList, 'movieDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MovieDetail = ({route}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const {loading, movieDetailResponse, movieDetailService} = useWatchStore(
    state => state,
  );
  console.log('🚀 ~ MovieDetail ~ movieDetailResponse:', movieDetailResponse);

  useEffect(() => {
    movieDetailService(route.params.id);
  }, [route.params.id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetailResponse?.backdrop_path}`,
        }}
        resizeMode="cover"
        style={styles.image}>
        <View style={{marginBottom: 20}}>
          <Text style={styles.text}>In Theaters December 22, 2021</Text>
          <TouchableOpacity style={styles.ticketButton}>
            <Text style={styles.buttonText}>Get Tickets</Text>
          </TouchableOpacity>
          <View style={{margin: 6}} />
          <TouchableOpacity
            style={styles.trailerButton}
            onPress={() =>
              navigation.navigate('videoPlayer', {movieId: route.params.id})
            }>
            <Image source={require('../assets/images/play.png')} />
            <View style={{margin: 4}} />
            <Text style={styles.buttonText}>Watch Trailer</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.genreContainer}>
          <Text style={styles.genreTitle}>Genres</Text>
          <View style={styles.genreList}>
            {['Action', 'Thriller', 'Science', 'Fiction'].map(
              (genre, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.genreItem,
                    {backgroundColor: genreColors[index]},
                  ]}>
                  <Text style={styles.genreText}>{genre}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
          <View style={styles.separator} />
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>
            {movieDetailResponse?.overview}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const genreColors = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F'];

const styles = StyleSheet.create({
  container: {flex: 1},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {height: responsiveHeight(48), justifyContent: 'flex-end'},
  text: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  ticketButton: {
    width: '70%',
    backgroundColor: '#61C3F2',
    alignSelf: 'center',
    borderRadius: 10,
  },
  trailerButton: {
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: '#61C3F2',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  genreContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  genreTitle: {
    color: '#202C43',
    fontSize: 17,
  },
  genreList: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
  },
  genreItem: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginRight: 10,
  },
  genreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  separator: {
    height: 0.8,
    backgroundColor: '#00000030',
    marginTop: 20,
  },
  overviewContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#202C43',
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#8F8F8F',
    marginTop: 10,
  },
});

export default MovieDetail;
