import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  history: number[]
}

const initialState: CounterState = {
  value: 0,
  history: [],
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
      state.history.push(state.value)
    },
    decrement: (state) => {
      state.value -= 1
      state.history.push(state.value)
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
      state.history.push(state.value)
    },
    reset: (state) => {
      state.value = 0
      state.history.push(0)
    },
    clearHistory: (state) => {
      state.history = []
    },
  },
})

export const { increment, decrement, incrementByAmount, reset, clearHistory } = counterSlice.actions
export default counterSlice.reducer

