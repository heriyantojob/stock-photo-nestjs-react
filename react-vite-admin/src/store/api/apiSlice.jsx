import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, BASE_URL_ADMIN } from '../../config/url'

import { setCredentials } from '../../features/auth/authSlice'
// import { RootState } from '../store'
const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:5001',
    
    baseUrl: BASE_URL,
    credentials: 'include',
    
    prepareHeaders: (headers, { getState }) => {
       
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
    
})

const baseQueryWithReauth = async (args, api, extraOptions) => {


    let result = await baseQuery(args, api, extraOptions)
    // If you want, handle other status codes, too
    if (result?.error?.status === 401 && result?.error?.data?.message==="Unauthorized" ) {
        

        // send refresh token to get new access token 
        const refreshResult = await baseQuery(BASE_URL_ADMIN+'/auth/refresh', api, extraOptions)
        console.log(refreshResult)

        if (refreshResult?.data) {
      
            let dataCredential =  refreshResult?.data
        
            // store the new token 
            api.dispatch(setCredentials({ ...dataCredential }))
            
            // // retry original query with new access token
            // result = await baseQuery(args, api, extraOptions)
        } else {
          

            if (result?.error?.status === 401 && result?.error?.data?.message==="Unauthorized" ) {
                refreshResult.error.data.message = "Your login has expired."
            }
            // return refreshResult
        }
    }

    return result
}


export const apiSlice = createApi({
    //baseQuery: baseQuery,
    baseQuery: baseQueryWithReauth,
    //baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001', credentials: 'include', }),
    // tagTypes: ['Note', 'User'],

    tagTypes: ['Stock',"StockUpload","Admin","User","Page"],
    endpoints: builder => ({})
})