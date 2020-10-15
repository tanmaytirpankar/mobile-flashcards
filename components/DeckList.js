import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck, clearDataBase } from '../utils/api.js'
import { connect } from 'react-redux'

class DeckList extends Component {

	state={
		text: "",
		data: {}
	}

	ChangeText=(e = {})=>{
		this.setState({text:e})
	}

	displayData(){
		getDecks().then((results)=>{
			return results
		})
	}

	render() {
		// console.log(this.props.decks)
		return (
			<View style={styles.container}>
				<StatusBar/>
				{ Object.keys(this.props.decks).length==0
				? <View style={{alignItems:'center'}}><Text>No decks to show. Please create a new deck.</Text></View>
				: Object.keys(this.props.decks).map((key)=> {
					return (
						<TouchableOpacity key={key} style={styles.deckItem} onPress={()=>this.props.navigation.navigate("Deck", {deck:this.props.decks[key]})}>
								<Text>{this.props.decks[key].title}</Text>
								<Text>{Object.keys(this.props.decks[key].questions).length} Cards</Text>
						</TouchableOpacity>
					)
				})
			}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  deckItem: {
  	padding: 20,
  	borderWidth:2,
  	alignItems: 'center',
  	margin:5,
  }
});

function mapStateToProps(decks) {
	return decks
}
export default connect(mapStateToProps)(DeckList);