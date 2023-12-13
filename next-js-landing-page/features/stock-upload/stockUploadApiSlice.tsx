import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../store/api/apiSlice"

const stokUploadAdapter = createEntityAdapter({})

  
export const stockUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getStockUploadNew: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({query="?page=1"}) => `/template-upload/new${query}`,
            providesTags: ['StockUpload'],
        }),

     

        addStockUploadNew: builder.mutation({
            query: ({body,config}) => ({
                config,
                url: '/template-upload/new',
                method: 'POST',
                body
                // body: {
                //     ...body,
                // }
            }),
            invalidatesTags: ['StockUpload'],
     
        }),


        updateStock: builder.mutation({
            query:({body,id}) => ({
                url: '/template/update-status/'+id,
                method: 'PATCH',
                body
                // body: {
                //     ...body,
                // }
            }),
            invalidatesTags: ['StockUpload'],
     
        }),

        deleteStock: builder.mutation({
            query:({body}) => ({
                url: '/template',
                method: 'DELETE',
                body
                // body: {
                //     ...body,
                // }
            }),
            invalidatesTags: ['StockUpload'],
     
        }),
      
    }),
})

export const {
    useGetStockUploadNewQuery,
    useAddStockUploadNewMutation,
    useUpdateStockMutation,
    useDeleteStockMutation

 
} = stockUploadApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
