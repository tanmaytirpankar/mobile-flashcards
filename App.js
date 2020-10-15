
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeckList from './components/DeckList.js'
import Deck from './components/Deck.js'
import NewDeck from './components/NewDeck.js'
import Quiz from './components/Quiz.js'
import NewQuestion from './components/NewQuestion.js'
import { connect, Provider } from 'react-redux'
import { handleInitialData } from './actions/index.js'
import { createStore } from 'redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers.js'
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
const DeckListStack = createStackNavigator()


function DeckListStackScreen() {
  return (
    <DeckListStack.Navigator>
      <DeckListStack.Screen name="Deck List" component={DeckList} />
      <DeckListStack.Screen name="Deck" component={Deck} />
      <DeckListStack.Screen name="Quiz" component={Quiz} />
      <DeckListStack.Screen name="New Card" component={NewQuestion} />
    </DeckListStack.Navigator>
  )
}

const NewDeckStack = createStackNavigator()

function NewDeckStackScreen() {
  return (
    <NewDeckStack.Navigator>
      <NewDeckStack.Screen name="New Deck" component={NewDeck} />
      <NewDeckStack.Screen name="Deck" component={Deck} />
      <NewDeckStack.Screen name="Quiz" component={Quiz} />
    </NewDeckStack.Navigator>
  )
}
function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if(route.name === 'Decks') {
            iconName = 'database'
          } else if(route.name === 'Add Deck') {
            iconName = 'pluscircleo'
          }

          return <AntDesign name={iconName} size={24} color="black" />
        }
      })}>
      <Tab.Screen name="Decks" component={DeckListStackScreen} />
      <Tab.Screen name="Add Deck" component={NewDeckStackScreen} />
    </Tab.Navigator>
  )
}

class App extends Component {

  componentDidMount() {
    setLocalNotification()
    this.props.dispatch(handleInitialData())
  }

  render() {
    // <Deck deck="FirstDeck"/>
    // <MainTab />
    return (
      <NavigationContainer>
          <MainTab />
      </NavigationContainer>
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
});

function mapStateToProps(decks) {
  return decks
}

export default connect(mapStateToProps)(App)