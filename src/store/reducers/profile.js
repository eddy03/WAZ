import {createSlice} from '@reduxjs/toolkit'

export const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		me: {}
	},
	reducers: {
		setProfile: (state, action) => {
			state.me = action.payload
		},
		clearProfile: (state, action) => {
			state.me = {}
		}
	}
})

export const {
	setProfile,
	clearProfile
} = profileSlice.actions

export default profileSlice.reducer