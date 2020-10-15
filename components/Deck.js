import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import { removeDeck } from '../actions/decks.js'
import { removeDeckTitle } from '../utils/api.js'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers.js'


class Deck extends Component{
	state={
		opacity: new Animated.Value(0),
	}

	componentDidMount() {
		const { opacity } = this.state
		Animated.timing(opacity, {
									toValue: 1, 
									duration: 2000,
									useNativeDriver: true,
								})
			.start()
	}

	handleStartQuizPress=()=>{
		clearLocalNotification()
			.then(setLocalNotification())
		this.props.navigation.navigate("Quiz", {deck: this.props.route.params.deck})
	}

	render() {
		const { opacity } = this.state
		const deck = this.props.route.params.deck
		const handleDeleteDeckPress=()=>{
			this.props.dispatch(removeDeck(deck.title))
			removeDeckTitle(deck.title)
			this.props.navigation.navigate("Deck List")
		}
		return (
			<Animated.View style={[styles.container, { opacity }]}>
				<View style={styles.view}>
					<Text style={{fontSize: 30, fontWeight: 'bold'}}>{deck.title}</Text>
					<Text style={{fontSize: 20}}>{deck.questions.length} Cards</Text>
				</View>
				<View style={[styles.view, {alignItems:'stretch'}]}>
					<TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate("New Card", {deckName:deck.title})}>
						<Text>Add a Card</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={this.handleStartQuizPress}>
						<Text>Start Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={handleDeleteDeckPress}>
						<Text>Delete Deck</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		)

	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
  	alignItems: 'center',
  	padding: 40,
  },
  button: {
  	padding: 10,
  	margin: 10,
  	borderWidth:3
  },
});

function mapStateToProps (decks) {
	return decks
}

export default connect(mapStateToProps)(Deck)