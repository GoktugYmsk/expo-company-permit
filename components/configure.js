import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reason: [],
    startDay: [],
    endDay: [],
    manager: '',
    isManager: '',
    worker: [],
    workerInfo: [],
    workerPerReq: [],
    allPermits: [],
    isWorkerPermit: false,
    hamburgerActive: false,
    regUser: [],
    idControl: null,
    deneme: []

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
        setIsManager: (state, action) => {
            state.isManager = action.payload;
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
        setAllPermits: (state, action) => {
            state.allPermits = action.payload
        },
        setIsWorkerPermit: (state, action) => {
            state.isWorkerPermit = action.payload
        },
        setHamburgerActive: (state, action) => {
            state.hamburgerActive = action.payload
        },
        setRegUser: (state, action) => {
            state.regUser = action.payload
        },
        setIdControl: (state, action) => {
            state.idControl = action.payload
        },
        setDeneme: (state, action) => {
            state.deneme = action.payload
        },
    }
})

export const { setPassengerAmount, setReason, setStartDay, setEndDay, setManager, setIsManager, setWorker, setWorkerInfo, setWorkerPerReq, setAllPermits, setIsWorkerPermit, setHamburgerActive, setRegUser, setIdControl, setDeneme } = configure.actions

export default configure.reducer;