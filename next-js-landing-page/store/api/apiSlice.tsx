import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


import { setCredentials } from '../../features/auth/authSlice'
import { logDebug } from '../../utils/logDebug'
import { RootState } from '../store'
const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:5001',
    
    baseUrl: process.env.NEXT_PUBLIC_ENV_BASE_URL_API,
    credentials: 'include',
    
    prepareHeaders: (headers, { getState }) => {
   
        const token = (getState() as RootState).auth.token
        //const token = getState()
   
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
    
})

interface Credentials {
    accessToken: string;
    refreshToken: string;
}

const baseQueryWithReauth = async (args, api, extraOptions) => {


    let result = await baseQuery(args, api, extraOptions)
    // logDebug( "result refresh ", result)

    // If you want, handle other status codes, too
    // if (result?.error?.status === 401 && result?.error?.data?.message==="Unauthorized" ) {
    if ((result?.error as any)?.status === 401 && (result?.error as any)?.data?.message === "Unauthorized") {   

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
  
        let dataCredential:Credentials
        if (refreshResult?.data) {
      
            //let dataCredential =  refreshResult?.data
            dataCredential =  refreshResult?.data as Credentials;
            // store the new token 
            api.dispatch(setCredentials({ ...dataCredential }))
            
            // // retry original query with new access token
            // result = await baseQuery(args, api, extraOptions)
        } else {
          

            // if ((result?.error as any)?.status === 401 && (result?.error as any)?.data?.message === "Unauthorized") {   
            //    refreshResult.error?.data?.message = "Your login has expired."
               
            // }

            if ((result?.error as any)?.status === 401 && (result?.error as any)?.data?.message === "Unauthorized") {   
                (refreshResult.error as any).data = {};
                (refreshResult.error as any).data.message = "Your login has expired.";
                
             }


          
            // return refreshResult
        }
    }

    return result
}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    //  baseQuery: baseQueryWithReauth,
    //baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001', credentials: 'include', }),
    // tagTypes: ['Note', 'User'],

    tagTypes: ['Stock',"StockUpload","User"],
    endpoints: builder => ({})
})