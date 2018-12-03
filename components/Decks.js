import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { getAllDecks } from '../utils/api'
import { blue, white } from '../constants/colors'


class Decks extends Component {
	state = {
			decks: {}
	}

	componentDidMount() {
		getAllDecks()
			.then(results => {
				Object.keys(results).length > 0 && (
					results = this.sortDecks(results)
				)
				return this.setState(
					{ decks: results }
				)
			})
	}

	sortDecks = ( decks ) => (
		Object.keys(decks)
			.sort()
			.reduce(( target, key ) => {
				target[ key ] = decks[ key ]
				return target;
			}, {})
	)

	doUpdate = ( decks ) => {
		Object.keys(decks).length > 0 && (
			decks = this.sortDecks(decks)
		)
		return this.setState({ decks })
	}

	openDeckDetail = ( deckId ) => (
		this.props.navigation.navigate('DeckDetail', { deckId })
	)

	render() {
		const { decks } = this.state

		return (
			<ScrollView>
				<Text style={styles.header}>Decks</Text>

				{Object.keys(decks).map((item) => {
					const deckName = decks[item].title
					const cardCount = decks[item].questions.length

					return (
						<View key={item}>
							<TouchableOpacity
								onPress={() => this.openDeckDetail(deckName)}
								style={styles.deckitem}>
								<Text style={styles.deckName}>{ deckName }</Text>
								<Text style={styles.cardCount}>{ cardCount } cards</Text>
							</TouchableOpacity>
						</View>
					)
				})}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		marginTop: 25,
		fontSize: 30,
		fontWeight: '500',
		paddingBottom: 20,
		color: blue,
		textAlign: 'center'
	},
	deckitem: {
		flex: 1,
		alignItems: 'center',
		borderRadius: 3,
		paddingTop: 40,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 20,
		justifyContent: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOpacity: 0.8,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 3
		},
		backgroundColor: white,
	},
	deckName: {
		fontWeight: '500',
		fontSize: 22,
	},
	cardCount: {
		fontSize: 18
	}
})

export default Decks