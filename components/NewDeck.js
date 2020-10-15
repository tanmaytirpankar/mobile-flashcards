import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { saveNewDeck } from '../actions/decks.js'
import { saveDeckTitle } from '../utils/api.js' 

class NewDeck extends Component {
	state = {
		text: ""
	}

	ChangeText=(e = {})=>{
		this.setState({text:e})
	}

	handleCreateDeckPress=()=>{
		if(this.state.text=="") {
			Alert.alert("TextBox Alert", "Give some title for new deck")
			return
		}
		// Updating Redux store by dispatching saveNewDeck Action
		this.props.dispatch(saveNewDeck(this.state.text))

		// Updating Local Storage by invoking saveDeckTitle api call.
		saveDeckTitle(this.state.text)

		this.props.navigation.navigate("Deck", {deck: {title: this.state.text, questions:[]}})
	}
	render() {
		// Back button and "New Deck"

		// TextInput for title of new deck

		// Submit button directing to Deck view and adding deck to database.
		return (
			<View style={styles.container}> 
				<View style={{flex:1, justifyContent: 'center'}}>
					<Text style={{fontSize:20, fontWeight:'bold'}}>What is the title of your new deck?</Text>
					<TextInput
				      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				      onChangeText={this.ChangeText}
				      value={this.state.text}
				    />
			    </View>
			    <View style={{ justifyContent: 'flex-end', margin:30, borderWidth: 3, padding:10}}>
				    <TouchableOpacity onPress={this.handleCreateDeckPress}>
				    	<Text>Create Deck</Text>
				    </TouchableOpacity>
			    </View>
		    </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default connect()(NewDeck);