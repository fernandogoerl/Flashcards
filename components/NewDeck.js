import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import { blue } from '../constants/colors'
import { globalStyles } from '../constants/globalStyles'
import { saveDeckTitle } from '../utils/api'


class NewDeck extends Component {
	state = {
		inputText: '',
	}

	handleChange = (inputText) => {
		this.setState(() => ({
			inputText
		}))
	}

	handleSaveButton = () => {
		return saveDeckTitle(this.state.inputText)
			.then(this.goToDeckDetail(this.state.inputText))
	}

	goToDeckDetail = (deckId) => {
		const { navigate, dispatch } = this.props.navigation
		const resetAction = StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home', params: { deckId }})
			]
		})
		dispatch(resetAction)
		navigate('DeckDetail', { deckId: deckId })
	}

	render() {
		const { inputText } = this.state

		return (
			<KeyboardAvoidingView behavior='padding' style={globalStyles.center}>
				<Text style={[styles.header]}>Name of your new deck</Text>

				<TextInput
					autoFocus={true}
					onChangeText={this.handleChange}
					value={inputText}
					style={globalStyles.input}
					underlineColorAndroid={blue}
					selectionColor={blue}
				/>

				<TouchableOpacity
					onPress={this.handleSaveButton}
					disabled={this.state.inputText === '' ? true : false }>
					<Text style={globalStyles.button}>Save</Text>
				</TouchableOpacity>

			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 20,
		fontSize: 30,
		color: blue,
		textAlign: 'center'
	},
})

export default NewDeck