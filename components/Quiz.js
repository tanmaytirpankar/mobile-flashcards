import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import {  blue, red, white } from '../utils/colors.js'

class Quiz extends Component {
	state = {
		score:0,
		questionNumber:0,
		showAnswer: false,
	}

	handleTextFlip=()=>{
		if (this.state.showAnswer===true) {
			this.setState({showAnswer: false})
		}
		else {
			this.setState({showAnswer: true})
		}
	}

	handleCorrectPress=()=>{
		this.setState((prevState)=>({
			score: prevState.score+1,
			questionNumber: prevState.questionNumber+1,
			showAnswer: false,
		}))

	}

	handleIncorrectPress=()=>{
		this.setState((prevState)=>({
			questionNumber: prevState.questionNumber+1,
			showAnswer: false,
		}))
	}

	resetState=()=>{
		this.setState({
			score:0,
			questionNumber:0,
			showAnswer: false,
		})
	}

	render() {
		const deck=this.props.route.params.deck
		return (
			deck.questions.length==0
			? <View style={[styles.container, {justifyContent: 'center', padding:20}]}>
				<Text style={{fontSize:20, fontWeight:'bold'}}>Sorry, you cannot take a quiz because there are no cards in this deck.</Text>
			</View>
			: this.state.questionNumber<deck.questions.length
			? <View style={styles.container}>
				<Text style={styles.questionNumber}>{this.state.questionNumber+1}/{deck.questions.length}</Text>
				{this.state.showAnswer
					? <View style={styles.mainTextView}>
						<Text style={{fontSize: 30, fontWeight:'bold', padding:10}}>{deck.questions[this.state.questionNumber].answer}</Text>
						<TouchableOpacity onPress={this.handleTextFlip}>
							<Text style={{color:'red', fontWeight:'bold'}}>Question</Text>
						</TouchableOpacity>
					</View>
					: <View style={styles.mainTextView}>
						<Text style={{fontSize: 30, fontWeight:'bold', padding:10}}>{deck.questions[this.state.questionNumber].question}</Text>
						<TouchableOpacity onPress={this.handleTextFlip}>
							<Text style={{color:'blue', fontWeight:'bold'}}>Answer</Text>
						</TouchableOpacity>
					</View>
				}
				<View style={{alignItems:'center', padding: 30}}>
					<TouchableOpacity style={[styles.buttonsView, {backgroundColor: 'blue'}]} onPress={this.handleCorrectPress}>
						<Text style={{color:'white'}}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.buttonsView, {backgroundColor: 'red'}]} onPress={this.handleIncorrectPress}>
						<Text style={{color:'white'}}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
			: <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
				<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
					<Text style={{padding:10, fontSize:20, fontWeight:'bold'}}>Congratulations. You scored</Text>
					<Text style={{color:red, padding:10, fontSize:30, fontWeight:'bold'}}>{100*this.state.score/deck.questions.length}%</Text>
				</View>
				<TouchableOpacity style={[styles.buttonsView]} onPress={this.resetState}>
					<Text>Restart Quiz</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.buttonsView]} onPress={()=>this.props.navigation.navigate("Deck")}>
					<Text>Back to Deck</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  questionNumber: {
  	flex: 1,
  	alignItems: 'flex-start',
  	justifyContent: 'flex-start',
  	padding: 20,
  },
  mainTextView: {
  	flex: 3,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  buttonsView: {
  	alignItems: 'center',
  	justifyContent: 'space-around',
  	padding: 10,
  	margin:10, 
  	borderWidth: 3, 
  	width:150,
  }
});

export default Quiz;