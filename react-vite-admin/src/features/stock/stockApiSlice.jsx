// import {
//     createSelector,
//     createEntityAdapter
// } from "@reduxjs/toolkit";
import { BASE_URL_FOLDER_ADMIN } from "../../config/url";
import { apiSlice } from "../../store/api/apiSlice";

// let apiAdmin =import.meta.env.VITE_BASE_URL_ADMIN_API
export const stockApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStock: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({query="?page=1"}) => BASE_URL_FOLDER_ADMIN+`/template${query}`,
            providesTags: ['Stock'],
        }),
        getStockById: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({id}) => BASE_URL_FOLDER_ADMIN+`/template/${id}`,
            providesTags: ['Stock'],
        }),
        updateStock: builder.mutation({
            query:({body,id}) => ({
                url: BASE_URL_FOLDER_ADMIN+'/template/'+id,
                method: 'PATCH',
                body
  
            }),
            invalidatesTags: ['Stock'],
     
        }),
        



      
    }),
})

export const {
    useGetStockQuery,
    useGetStockByIdQuery,
    useUpdateStockMutation,
    usePrefetch
 
} = stockApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
