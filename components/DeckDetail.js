import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { blue, black } from '../constants/colors'
import { globalStyles} from '../constants/globalStyles'
import { getDeck } from '../utils/api'


class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.deckId} Deck`,
	})

	state = {
		deck: {
			title: '',
			questions: []
		}
	}

	componentDidMount() {
		getDeck(this.props.navigation.state.params.deckId)
			.then(( results ) => {
				this.setState(() => ({ deck : results }))
			})
	}

	startQuiz = (deckId) => (
		this.props.navigation.navigate('Quiz', { deckId })
	)

	handleNewCard = (deckId) => (
		this.props.navigation.navigate('AddCard', { deckId })
	)

	render() {
		const { deck } = this.state

		if (deck) {
			return (
				<View style={globalStyles.center}>
					<Text style={[styles.header]}>{deck.title}</Text>
					<Text style={[styles.cardCount]}>{deck.questions.length} Cards</Text>

					{deck.questions.length > 0 ? (
						<TouchableOpacity onPress={() => this.startQuiz(deck.title)}>
							<Text style={globalStyles.button}>Start Quiz</Text>
						</TouchableOpacity>
					) : (
						<Text style={{marginBottom: 20}}>Empty deck</Text>
					)}

					<TouchableOpacity onPress={() => this.handleNewCard(deck.title)}>
						<Text style={globalStyles.button}>Add new card</Text>
					</TouchableOpacity>

				</View>
			)
		}

		return null;
	}
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 20,
		fontSize: 30,
		fontWeight: '500',
		color: blue,
		textAlign: 'center'
	},
	cardCount: {
		marginBottom: 60,
		fontSize: 24,
		color: black,
		textAlign: 'center'
	},
})

export default DeckDetail