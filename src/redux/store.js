import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import userReducer from './userRedux'
import invoiceReducer from './invoiceRedux'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

    const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, invoice: invoiceReducer });
  
  // const persistedReducer = persistReducer(persistConfig, rootReducer)
  

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)

