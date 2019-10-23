import React from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Auth from './Auth';

import Home from './screens/Home';
import Register from './screens/Register';
import AdminLogin from './screens/AdminLogin';
import AdminHome from './screens/AdminHome';

// Admin Screen
const AdminScreen = createStackNavigator({
	AdminLogin: {
		screen: AdminLogin
	},
	AdminHome: {
		screen: AdminHome
	}
}, {
	headerMode: 'none',
	mode: 'modal',
});

export const AdminContainer = createAppContainer(AdminScreen);

// Index Screen
const Index = createSwitchNavigator({
	Auth: {
		screen: Auth
	},
	Home: {
		screen: Home
    },
    Admin: {
        screen: AdminContainer
    },
    Register: {
        screen: Register
    }
}, {
	headerMode: 'none',
	mode: 'modal',
	initialRouteName: "Auth"
});

export const IndexContainer = createAppContainer(Index);

// Root
export const createRootNavigator = (signedIn) => {
	return IndexContainer;
}