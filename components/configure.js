import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    passengerAmount: {},
    reason: '',
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setPassengerAmount: (state, action) => {
            state.passengerAmount = action.payload;
        },
        setReason: (state, action) => {
            state.reason = action.payload;
        },
    }
})

export const { setPassengerAmount, setReason } = configure.actions

export default configure.reducer