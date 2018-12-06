import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import { Feather } from '@expo/vector-icons'
import { blue, white, red, green } from '../constants/colors'
import { globalStyles } from '../constants/globalStyles'

class Quiz extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `Quiz ${navigation.state.params.deckId}`,
	})

	state = {
		deck: {
			questions: [
				{
					question: '',
					answer: '',
				},
			],
		},
		showAnswer: false,
		questionIndex: 0,
		totalCorrect: 0,
		showResult: false,
	}

	componentDidMount() {
		getDeck(this.props.navigation.state.params.deckId)
			.then(( results ) => (
				this.setState(() => (
					{ deck: results }
				))
			))
	}

	flipCard = (showAnswer) => (
		this.setState({
			showAnswer: !showAnswer,
		})
	)

	goToNextQuestion = (questionIndex, deck) => {
		questionIndex++

		(questionIndex >= deck.questions.length)
			?	this.setState(() => (
					{ showResult: true }
				))
			: 	this.setState(() => (
					{ questionIndex }
				))

		this.flipCard(this.state.showAnswer)
	}

	handleCorrectAnswer = (questionIndex, deck) => {
		this.setState(() => (
			{ totalCorrect: this.state.totalCorrect + 1 }
		))

		this.goToNextQuestion(questionIndex, deck)
	}

	goToHome = () => (
		this.props.navigation.navigate('Home')
	)

	restartQuiz = () => {
		this.setState(() => ({
			showResult: false,
			totalCorrect: 0,
			questionIndex: 0
		}))
	}

	render() {
		const {
			deck,
			questionIndex,
			showAnswer,
			totalCorrect,
			showResult
		} = this.state
		const cardCount = this.state.deck.questions.length

		return showResult
		? (
			<View style={globalStyles.center}>
				<Text style={styles.header}>
					You got {totalCorrect} out of {cardCount}
				</Text>

				<Text style={styles.header}>
					Score: {(totalCorrect / cardCount * 100).toFixed(0)}%
				</Text>

				<TouchableOpacity onPress={() => this.goToHome(deck.title)}>
					<Text style={globalStyles.button}>Back to decks</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.restartQuiz()}>
					<Text style={globalStyles.button}>Restart quiz</Text>
				</TouchableOpacity>
			</View>
		)
		: (

				<View style={[ globalStyles.center, styles.center ]}>
					<Text>
						Question {questionIndex + 1} of {cardCount}
					</Text>
					{	!showAnswer
						?	<View style={styles.flipcard}>
								<TouchableOpacity onPress={() => this.flipCard(showAnswer)}>
									<Text style={globalStyles.button}>
										Show answer <Feather name='refresh-cw' size={14} style={{marginLeft: 10}} />
									</Text>
								</TouchableOpacity>

								<Text style={[styles.header]}>
									{deck.questions[questionIndex].question}
								</Text>
							</View>
						:	(
							<View>
								<View style={styles.flipcard}>
									<TouchableOpacity onPress={() => this.flipCard(showAnswer)}>
										<Text style={globalStyles.button}>
											Show question <Feather name='refresh-cw' size={16} style={{marginLeft: 10}} />
										</Text>
									</TouchableOpacity>

									<Text style={styles.header}>
										{deck.questions[questionIndex].answer}
									</Text>
								</View>

								<View style={styles.answerContainer}>
									<TouchableOpacity
										onPress={() => this.goToNextQuestion(questionIndex, deck)}
										style={[styles.answerButton, {backgroundColor: red, borderColor: red}]}>
										<Text style={[ styles.answerButtonText, {color: white}]}>Incorrect</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => this.handleCorrectAnswer(questionIndex, deck)}
										style={[styles.answerButton, {backgroundColor: green, borderColor: green}]}>
										<Text style={[ styles.answerButtonText, {color: white}]}>Correct</Text>
									</TouchableOpacity>
								</View>
							</View>
							)

					}
				</View>
		)
	}
}

const styles = StyleSheet.create({
	center: {
		justifyContent: 'flex-start',
		marginTop: 40,
	},
	header: {
		marginBottom: 40,
		fontSize: 30,
		fontWeight: '500',
		color: blue,
		textAlign: 'center',
		paddingLeft: 20,
		paddingRight: 20
	},
	answerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	answerButton: {
		borderRadius: 3,
		borderWidth: 1,
		margin: 10,
		marginBottom: 20,
		width: 140,
	},
	answerButtonText: {
		padding: 12,
		textAlign: 'center',
		fontSize: 14,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
	flipcard: {
		width: 300,
		backfaceVisibility: 'hidden',
		alignItems: 'center',
		borderRadius: 3,
		paddingTop: 40,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 20,
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
})

export default Quiz