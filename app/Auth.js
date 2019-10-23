import React from 'react';
import {
    AsyncStorage, 
    Alert,
    Text,
    View
} from 'react-native';

export default class Auth extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			signedIn: false,
			checkedSignIn: false
		};
	}
	
	async getToken() {
        this.mounted = true;
		navigation = this.props.navigation;
	
		try {
			const pid = await AsyncStorage.getItem('pid');

			if(pid !== null && pid != '') {
				navigation.navigate('Home');
			} else {
				navigation.navigate('Register');
			}
		} catch(error) {
			console.log(error);
		}
	}
	
	componentDidMount() {
		this.getToken();
	}
	
	componentWillUnmount() {
		this.mounted = false;
	}
    
    render() {
        return(
            <View></View>
        );
    }

}