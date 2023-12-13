import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../store/api/apiSlice"

  
export const stockApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStock: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({query="?page=1"}) => `/template${query}`,
            providesTags: ['Stock'],
        }),
        getStockBySlug: builder.query({
            //query: (page=1) => `/blogs?pagination[page]=${page}&pagination[pageSize]=2`,
            query: ({slug}) => `/template/${slug}`,
            providesTags: ['Stock'],
        }),



      
    }),
})

export const {
    useGetStockQuery,
    useGetStockBySlugQuery,
    usePrefetch
 
} = stockApiSlice





//getSelectors creates these selectors and we rename them with aliases using destructuring
