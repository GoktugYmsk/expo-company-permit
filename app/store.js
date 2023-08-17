import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import configure from '../components/configure';

const rootReducer = combineReducers({
    userReason: configure,
    offDays: configure,
    management: configure,
    workerInfoTotal: configure,
    permits: configure,
    isWorker: configure,
    saveRegUser: configure,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReason', 'management', 'offDays', 'workerInfoTotal', 'isWorker', 'saveRegUser'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };