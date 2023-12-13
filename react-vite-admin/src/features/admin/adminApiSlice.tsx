import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { BASE_URL_FOLDER_ADMIN } from "../../config/url";
import { apiSlice } from "../../store/api/apiSlice";

// let apiAdmin =import.meta.env.VITE_BASE_URL_ADMIN_API
export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdmin: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({query="?page=1"}) => BASE_URL_FOLDER_ADMIN+`/admin${query}`,
            providesTags: ['Admin'],
        }),
        getAdminById: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({id}) => BASE_URL_FOLDER_ADMIN+`/admin/${id}`,
            providesTags: ['Admin'],
        }),

        insertAdmin: builder.mutation({
            query:({body}) => ({
                url: BASE_URL_FOLDER_ADMIN+'/admin',
                method: 'POST',
                // body
                body: {
                    ...body,
                }
            }),
            invalidatesTags: ['Admin'],
     
        }),
        updateAdmin: builder.mutation({
            query:({body,id}) => ({
                url: BASE_URL_FOLDER_ADMIN+'/admin/'+id,
                method: 'PATCH',
                body
                // body: {
                //     ...body,
                // }
            }),
            invalidatesTags: ['Admin'],
     
        }),



      
    }),
})

export const {
    useGetAdminByIdQuery,
    useGetAdminQuery,
    
     useInsertAdminMutation,
     useUpdateAdminMutation,
    
 
} = adminApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
