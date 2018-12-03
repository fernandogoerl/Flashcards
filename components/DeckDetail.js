import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { blue, black } from '../constants/colors'
import { globalStyles} from '../constants/globalStyles'
import { getDeck } from '../utils/api'


class DeckDetail extends Component {
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

	render() {
		const { deck } = this.state

		if (deck) {
			return (
				<View style={globalStyles.center}>
					<Text style={[styles.header]}>{deck.title}</Text>
					<Text style={[styles.subheader]}>{deck.questions.length} Cards</Text>

					{deck.questions.length > 0 ? (
						<TouchableOpacity>
							<Text style={globalStyles.button}>Start Quiz</Text>
						</TouchableOpacity>
					) : (
						<Text style={{marginBottom: 20}}>Empty deck</Text>
					)}

					<TouchableOpacity>
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
	subheader: {
		marginBottom: 60,
		fontSize: 24,
		color: black,
		textAlign: 'center'
	},
})

export default DeckDetail