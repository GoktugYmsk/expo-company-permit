import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import configure from '../components/configure';

const rootReducer = combineReducers({
    userReason: configure,
    passAmount: configure,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['passAmount',],
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