import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    passengerAmount: {},
    reason: '',
    startDay: null,
    endDay: null,
    manager: null,
    manageName: '',
    worker: '',
    workerInfo: [],

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
        setStartDay: (state, action) => {
            state.startDay = action.payload;
        },
        setEndDay: (state, action) => {
            state.endDay = action.payload;
        },
        setManager: (state, action) => {
            state.manager = action.payload;
        },
        setManageName: (state, action) => {
            state.manageName = action.payload;
        },
        setWorker: (state, action) => {
            state.worker = action.payload;
        },
        setWorkerInfo: (state, action) => {
            state.workerInfo = action.payload;
        },
    }
})

export const { setPassengerAmount, setReason, setStartDay, setEndDay, setManager, setManageName, setWorker, setWorkerInfo } = configure.actions

export default configure.reducer