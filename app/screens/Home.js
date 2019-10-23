import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { Video } from 'expo-av';

import LoadingScreen from '../common/LoadingScreen';

import '../global';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
    }
  }

  async getToken() {
		try {
			// Fetch home data
			fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
          table: 'fetch_warung_ads',
          body: ''
				})
			}).then((response) => response.json())
			.then((responseJson) => {
        console.log(responseJson);
        
        if(responseJson['status'] == '200') {
          if(this.mounted) {
            this.setState({
              isLoading: false,
              data: responseJson['data']['ads']
            });
          }
				}
			}).catch((error) => {
				console.error(error);
			});
		} catch(error) {
			console.log(error);
		}
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.mounted = true;
    //this.timer = setInterval(() => this.getAds(), 1000);
    this.getToken();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async getAds() {
    console.log('abc');
  }

  videoUpdated(playbackStatus){
    if(playbackStatus['didJustFinish']){
      this.playNext();
    }
  }

  playNext(){
    // playNext() method takes the first item in the this.state.playlist array and moves it to the back
    console.log('video did just finish');
    let playlist = this.state.data;
      let temp = playlist[0];
      playlist.shift(); 
      playlist.push(temp);
      this.setState({playlist})
  }

  render() {
    if(this.state.isLoading) {
      return(<LoadingScreen />);
    }
    
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <Video
          onPlaybackStatusUpdate={(playbackStatus) => this.videoUpdated(playbackStatus)}
          source={{ uri: `https://noahadstest.s3-ap-southeast-1.amazonaws.com/wb_vid/${this.state.data[0].ads_vid}.mp4` }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ 
            flex: 1,
            width: '100%',
            height: '100%'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
