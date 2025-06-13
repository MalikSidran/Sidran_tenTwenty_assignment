import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useWatchStore from '../stores/watchStore';

type RootStackParamList = {
  watchmain: undefined;
  watchSearch: undefined;
  movieDetail: {id: number};
  videoPlayer: {movieId: number};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const VideoPlayer = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const {movieId} = route.params as {movieId: number};
  const {loading, movieVideosResponse, movieVideosService} = useWatchStore(
    state => state,
  );

  useEffect(() => {
    movieVideosService(movieId);
  }, [movieId]);

  if (loading || !movieVideosResponse) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  // Get the first official trailer
  const trailer = movieVideosResponse.results.find(
    video => video.type === 'Trailer' && video.official,
  );

  if (!trailer) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No trailer available</Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
        onEnd={() => navigation.goBack()}
      />
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
  doneButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VideoPlayer;
