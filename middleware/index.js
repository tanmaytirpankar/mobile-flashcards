import thunk from 'redux-thunk'
import logger from './logger.js'
import { applyMiddleware } from 'redux'


export default applyMiddleware(
	thunk,
	logger
)