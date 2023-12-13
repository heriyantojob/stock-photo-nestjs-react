import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { BASE_URL_FOLDER_ADMIN } from "../../config/url";
import { apiSlice } from "../../store/api/apiSlice";

// let apiAdmin =import.meta.env.VITE_BASE_URL_ADMIN_API
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({query="?page=1"}) => BASE_URL_FOLDER_ADMIN+`/user${query}`,
            providesTags: ['User'],
        }),
        getUserById: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({id}) => BASE_URL_FOLDER_ADMIN+`/user/${id}`,
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query:({body,id}) => ({
                url: BASE_URL_FOLDER_ADMIN+'/user/'+id,
                method: 'PATCH',
                // body
                body: {
                    ...body,
                }
            }),
            invalidatesTags: ['User'],
     
        }),



      
    }),
})

export const {
    useGetUserQuery,
    useGetUserByIdQuery, 
    useUpdateUserMutation

 
} = userApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
