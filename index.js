import { registerRootComponent } from 'expo';
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

import App from './App';

const store = createStore(reducer, middleware)

function Root() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Root);
