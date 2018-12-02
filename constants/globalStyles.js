import { StyleSheet, Platform } from 'react-native'
import { blue, white, } from '../constants/colors'

export const globalStyles = StyleSheet.create({

	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30,
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
		marginBottom: 20,
		width: 250
	},

})