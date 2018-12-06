import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Decks, NewDeck, DeckDetail, AddCard, Quiz } from './components'
import { blue, white } from './constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/notifications'


function FlashcardsStatusBar ({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.StatusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

const Tabs = createBottomTabNavigator({
	Decks: {
		screen: Decks,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
		}
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-plus' size={30} color={tintColor} />
		}
	}
},
{
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: blue,
		style: {
			height: 56,
			backgroundColor:  white,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			title: 'Flashcards',
			headerTintColor: white,
			headerStyle: {
				backgroundColor: blue
			}
		}
	},
	DeckDetail: {
		screen: DeckDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: blue
			}
		}
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: blue
			}
		}
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: blue
			}
		}
	}
})

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
	}
	render() {
		return (
			<View style={{flex:1}}>
				<FlashcardsStatusBar backgroundColor={blue} barStyle='light-content' />
				<MainNavigator />
			</View>
		);
	}
}