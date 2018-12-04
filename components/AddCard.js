import React, { Component } from 'react'
import { NavigationActions, StackActions } from 'react-navigation'
import {
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity} from 'react-native'
import { blue } from '../constants/colors'
import { globalStyles } from '../constants/globalStyles'
import { addCardToDeck } from '../utils/api'


class AddCard extends Component {

	state = {
		title: '',
		question: '',
		answer: ''
	}

	componentDidMount() {
		this.setState(() => ({
			title: this.props.navigation.state.params.deckId
		}))
	}

 	handleSaveButton = () => (
		 addCardToDeck(this.state.title, {
			question: this.state.question,
			answer: this.state.answer
		}).then(this.goToDeckDetail(this.state.title))
	)

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
		return (
			<KeyboardAvoidingView behavior='padding' style={globalStyles.center}>
				<Text style={[styles.header]}>Add a new Card</Text>

				<Text style={[styles.label]}>Your question</Text>
				<TextInput
					style={globalStyles.input}
					onChangeText={question => this.setState({ question })}
					value={this.question}
					placeholder={'Question'}
				/>

				<Text style={[styles.label]}>Your Answer</Text>
				<TextInput
					style={globalStyles.input}
					onChangeText={answer => this.setState({ answer })}
					value={this.answer}
					placeholder={'Answer'}
					underlineColorAndroid={blue}
					selectionColor={blue}
				/>

				<TouchableOpacity
					onPress={this.handleSaveButton}
					disabled={(this.state.question === '' || this.state.answer === '') ? true : false }>
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
	label: {
		marginBottom: 10,
		fontSize: 24,
		color: blue,
		textAlign: 'center'
	},
})

export default AddCard