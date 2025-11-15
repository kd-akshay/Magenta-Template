import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import userReducer from './slices/userSlice'
import counterReducer from './slices/counterSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme'],
}

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  counter: counterReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

