import {configureStore} from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper';

import profileReducer from './reducers/profile'

const makeStore = () => {
	return configureStore({
		reducer: {
			profile: profileReducer
		}
	})
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore);