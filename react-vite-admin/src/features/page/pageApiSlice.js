import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { BASE_URL_FOLDER_ADMIN } from "../../config/url";
import { apiSlice } from "../../store/api/apiSlice";

// let apiAdmin =import.meta.env.VITE_BASE_URL_ADMIN_API
export const pageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPage: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({query="?page=1"}) => BASE_URL_FOLDER_ADMIN+`/page${query}`,
            providesTags: ['Page'],
        }),
        insertPage: builder.mutation({
            query:({body}) => ({
                url: BASE_URL_FOLDER_ADMIN+'/page',
                method: 'POST',
                // body
                body: {
                    ...body,
                }
            }),
            invalidatesTags: ['Page'],
            
        }),
        getPageById: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({id}) => BASE_URL_FOLDER_ADMIN+`/page/${id}`,
            providesTags: ['Page'],
        }),
        updatePage: builder.mutation({
            query:({body,id}) => ({
                url: BASE_URL_FOLDER_ADMIN+'/page/'+id,
                method: 'PATCH',
                // body
                body: {
                    ...body,
                }
            }),
            invalidatesTags: ['Page'],
     
        }),

        deletePage: builder.mutation({
            query:({id}) => ({
                url:  BASE_URL_FOLDER_ADMIN+'/page/'+id,
                method: 'DELETE'
            }),
            invalidatesTags: ['Page'],
     
        }),
        



      
    }),
})

export const {
    useGetPageQuery,
    useGetPageByIdQuery,
    useUpdatePageMutation,
    useInsertPageMutation,
    useDeletePageMutation

} = pageApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
