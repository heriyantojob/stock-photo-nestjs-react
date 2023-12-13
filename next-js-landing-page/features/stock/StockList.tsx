import React from 'react'
import {useRouter} from "next/router";
import StockListImages from './StockListImages'
import { useGetStockQuery,usePrefetch } from './stockApiSlice'
import  Pagination from "../../components/pagination/Pagination"
import PulseLoader from 'react-spinners/PulseLoader'
import LayoutError from '../../components/layout/LayoutError/LayoutError';
type StockListProps = {
  stock: string;
  dataFetch: any;
  isError: boolean | { message: string };
};
export default function StockList({stock,dataFetch,isError}:StockListProps) {

  const router = useRouter();
  const currentPage = (router.query.page)? parseInt(router.query.page as string) :1
  let content

  if (isError) {
    content =<LayoutError statusCode={dataFetch.statusCode} message={dataFetch.message}/>
  }else   {
    content = (
      <div>
        {dataFetch&&(
          <>
       
   
            <StockListImages dataFetch={dataFetch} stock={stock}></StockListImages>
            <Pagination
               currentPage={currentPage}
               totalCount={dataFetch?.meta?.total}
               pageSize={dataFetch?.meta?.limit}
               onPageChange={page =>{
                 // alert(page)
                 // setCurrentPage(page)
                 router.push("/stock/"+stock+"?page="+page)
               } }/>
          
          </>
            
        )}  
  
      </div>
    )
  }
  return content
}
