import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { saveNewCard } from '../actions/decks.js'
import { addCardToDeck } from '../utils/api.js'

class NewQuestion extends Component {
	state = {
		question:"",
		answer:"",
		deck: "",
	}

	ChangeQuestionText=(e = {})=>{
		this.setState({question:e})
	}

	ChangeAnswerText=(e = {})=>{
		this.setState({answer:e})
	}

	handleSubmitPress=()=>{
		if(this.state.question=="" || this.state.answer=="") {
			Alert.alert("TextBox Alert", "Empty question or answer not allowed.")
			return
		}

		// Updating Deck by dispatching saveNewCard action
		this.props.dispatch(saveNewCard(this.props.route.params.deckName, {question: this.state.question, answer: this.state.answer,}))

		// Updating Local Storage by invoking addCardToDeck api call.
		addCardToDeck(this.props.route.params.deckName, {question: this.state.question, answer: this.state.answer,})
		// Add Deck to Redux store and DB.

		this.props.navigation.navigate("Deck", {deck: this.props.decks[this.props.route.params.deckName]})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textView}>
					<Text style={{fontSize:20, fontWeight:'bold'}}>Question</Text>
					<TextInput
				      style={styles.textBox}
				      onChangeText={this.ChangeQuestionText}
				      value={this.state.question}
				    />
					<Text style={{fontSize:20, fontWeight:'bold'}}>Answer</Text>
					<TextInput
				      style={styles.textBox}
				      onChangeText={this.ChangeAnswerText}
				      value={this.state.answer}
				    />
				</View>
			    <View style={styles.button}>
				    <TouchableOpacity style={{borderWidth: 3, margin: 10, padding: 10,}} onPress={this.handleSubmitPress}>
				    	<Text>Submit</Text>
				    </TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
    padding: 10,
  },
  textView: {
  	flex: 1,
  	justifyContent: 'center'
  },
  textBox: {
  	borderColor: 'gray', 
  	borderWidth: 1,
  },
  button: {
  	alignItems: 'center',
  	justifyContent: 'flex-end',
  	margin: 50,
  	padding: 10,
  }
});

function mapStateToProps(decks) {
	return decks
}

export default connect(mapStateToProps)(NewQuestion);