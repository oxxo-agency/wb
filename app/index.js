import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { createRootNavigator } from './router';

import './global';

export default class App extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			signedIn: false,
			checkedSignIn: false
		};
	}
	
	async getToken() {
		this.mounted = true;
		
		try {
			const id = await AsyncStorage.getItem('warungPid');
			
			if(id !== null && id != '') {
				if(this.mounted) {
					this.setState({
						signedIn: true
					});
				}
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
        const { checkedSignIn, signedIn } = this.state;
		const Layout = createRootNavigator(signedIn);
		return <Layout />
	}
}