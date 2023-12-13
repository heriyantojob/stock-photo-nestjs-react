import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../store/api/apiSlice"

  
export const stockApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserProfile: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({}) => `/user/profile`,
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation({
            query:({body}) => ({
                url: '/user/profile',
                method: 'PATCH',
                body
                // body: {
                //     ...body,
                // }
            }),
            invalidatesTags: ['User'],
     
        }),

        updateUserProfilePassword: builder.mutation({
            query:({body}) => ({
                url: '/user/profile-password',
                method: 'PATCH',
                body

            }),
            invalidatesTags: ['User'],
     
        }),
    }),
})

export const {
    useGetUserProfileQuery,
    useUpdateUserProfilePasswordMutation,
    useUpdateUserProfileMutation,
    usePrefetch,

 
} = stockApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
