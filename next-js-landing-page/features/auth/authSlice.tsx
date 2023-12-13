 import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({

    name: 'auth',
    
    initialState:   { 
                        status :"loading",//"loading" | "authenticated" | "unauthenticated"
                        token: null , username:null,email:null,name:null
                    },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken,username,email,name } = action.payload
            state.username =username
            // state.name =name
            state.email =email
            state.status = "authenticated"
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.status  = "unauthenticated"
            state.token = null
            state.username =null
            state.email =null
            // state.name =null

        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectAuthToken = (state) => state.auth.token

export const selectAuthUsername = (state) => state.auth.username

export const selectAuthStatus = (state) => state.auth.status