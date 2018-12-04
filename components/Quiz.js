import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { blue, white } from '../constants/colors'
import { getDeck } from '../utils/api'
import { Feather } from '@expo/vector-icons'

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

	flipCard = () => {
		alert('card flipped')
	}

	goToNextQuestion = (questionIndex, deck) => {
		questionIndex++

		(questionIndex >= deck.questions.length)
			?	this.setState(() => (
					{ showResult: true }
				))
			: 	this.setState(() => (
					{ questionIndex }
				))

		// this.flipCard()
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
		const { deck, questionIndex, totalCorrect, showResult, flipCard } = this.state

		return showResult
		? (
			<View style={styles.center}>
				<Text style={styles.header}>
					You got {totalCorrect} out of {deck.questions.length}
				</Text>

				<Text style={styles.header}>
					Score: {(totalCorrect / deck.questions.length * 100).toFixed(0)}%
				</Text>

				<TouchableOpacity onPress={() => this.goToHome(deck.title)}>
					<Text style={styles.button}>Back to decks</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.restartQuiz()}>
					<Text style={styles.button}>Restart quiz</Text>
				</TouchableOpacity>
			</View>
		) : (
			<ScrollView>
				<View style={styles.center}>
					<Text style={styles.questionnavigator}>
						Question {questionIndex + 1} of {deck.questions.length}
					</Text>

					<View>
						<View style={[styles.flipcard]}>
							<TouchableOpacity onPress={() => this.flipCard(flipCard)}>
								<Text style={styles.button}>
									Show answer <Feather name='refresh-cw' size={14} style={{marginLeft: 10}} />
								</Text>
							</TouchableOpacity>

							<Text style={[styles.header]}>
								{deck.questions[questionIndex].question}
							</Text>

						</View>

						<View style={[ styles.flipcard, styles.flipcardback]}>
							<TouchableOpacity onPress={() => this.flipCard(flipCard)}>
								<Text style={styles.plainbutton}>
									Show question <Feather name='refresh-cw' size={14} style={{marginLeft: 10}} />
									</Text>
							</TouchableOpacity>

							<Text style={[styles.header]}>
								{deck.questions[questionIndex].answer}
							</Text>

							<View style={styles.answerContainer}>
								<TouchableOpacity
									onPress={() => this.goToNextQuestion(questionIndex, deck)}
									style={[styles.buttonansw, {flex: 1, backgroundColor: '#e3bab4'}]}>
									<Text style={[styles.buttonanswText, {color: '#be5d53'}]}>Incorrect</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => this.handleCorrectAnswer(questionIndex, deck)}
									style={[styles.buttonansw, {flex: 1, backgroundColor: '#cbd38a'}]}>
									<Text style={[styles.buttonanswText, {color: '#95a25a'}]}>Correct</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 20,
		marginRight: 20,
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
	button: {
		borderRadius: 3,
		borderColor: blue,
		borderWidth: 1,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 7,
		paddingBottom: 7,
		textAlign: 'center',
		color: blue,
		fontSize: 18,
		letterSpacing: 0.7,
		fontWeight: '500',
		marginBottom: 40,
		width: 200,
	},
	plainbutton: {
		borderColor: blue,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 0,
		paddingBottom: 7,
		textAlign: 'center',
		color: blue,
		fontSize: 18,
		letterSpacing: 0.7,
		fontWeight: '500',
		marginBottom: 40,
		width: 200,
	},
	buttonansw: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 12,
		paddingBottom: 12,
	},
	buttonanswText: {
		textAlign: 'center',
		color: blue,
		fontSize: 18,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
	answerContainer: {
		flexDirection: 'row',
		alignContent: 'stretch',
	},
	questionnavigator: {
		color: '#666666',
		marginTop: 80,
	},
	flipcard: {
		width: 300,
		backfaceVisibility: 'hidden',
		// flex: 1,
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
	flipcardback: {
		position: "absolute",
		top: 0,
	}
})

export default Quiz