import { createSlice } from '@reduxjs/toolkit'
import { getInitialAuthState } from './authInitialState'
import { loginUser, logoutUser } from './authThunks'

const initialState = getInitialAuthState()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, action) => {
      state.token = action.payload
      sessionStorage.setItem('token', action.payload)
    },
    logout: state => {
      sessionStorage.clear()
      Object.assign(state, getInitialAuthState())
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        if ('accessToken' in payload) {
          sessionStorage.setItem('token', payload.accessToken)
        } 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Error desconocido'
      })
      .addCase(logoutUser.pending, state => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false
        sessionStorage.clear()
        Object.assign(state, getInitialAuthState())
      })
      .addCase(logoutUser.rejected, state => {
        state.loading = false
        sessionStorage.clear()
        Object.assign(state, getInitialAuthState())
      })
  },
})

export const { logout, refreshToken, clearError } = authSlice.actions
export default authSlice.reducer
