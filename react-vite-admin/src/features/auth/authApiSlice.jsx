import { apiSlice } from "../../store/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                // url: import.meta.env.VITE_BASE_URL_ADMIN_API+'/auth',
                url: import.meta.env.VITE_BASE_URL_ADMIN_API+'/auth/login',
                
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: import.meta.env.VITE_BASE_URL_ADMIN_API+'/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
           
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url:  import.meta.env.VITE_BASE_URL_ADMIN_API+'/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 