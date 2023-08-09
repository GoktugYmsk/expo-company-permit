import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reason: [],
    startDay: [],
    endDay: [],
    manager: '',
    manageName: '',
    worker: [],
    workerInfo: [],
    workerPerReq: [],

}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
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
        setWorkerPerReq: (state, action) => {
            state.workerPerReq = action.payload;
        },
    }
})

export const { setPassengerAmount, setReason, setStartDay, setEndDay, setManager, setManageName, setWorker, setWorkerInfo, setWorkerPerReq } = configure.actions

export default configure.reducer