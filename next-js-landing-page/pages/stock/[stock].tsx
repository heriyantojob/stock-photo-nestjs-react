import React from 'react'
import { useRouter } from 'next/router'

import StockSearch from '../../features/stock/StockSearch'
import StockList from '../../features/stock/StockList'
import useSession from "../../hooks/auth/useSession"
import serverProps from "../../utils/serverProps";
function TemplateDetail({sessionRefresh,dataFetch,isError}) {
  useSession(sessionRefresh)

    const router = useRouter()
    const { stock } = router.query
    return (
      <>
{/*     
        <div className="container mx-auto">
          { stock }
        </div> */}

        
        <StockSearch stock={stock}></StockSearch>
        
        <StockList stock={stock.toString()} dataFetch={dataFetch} isError={isError}></StockList>
        
      </>
      
    )
}

export default TemplateDetail

export async function getServerSideProps(context) {

  //```````````````````` load sessionRefreshToken
  
      let propGlobal =  await serverProps(context,false)

  //```````````````````````set Filter fetch
    const { stock,page,keyword } = context.query;


    const currentPageQuery = (page)? `&page=${page}` :""
    const keywordQuery = (keyword)? "&keyword="+keyword :""
    const typeQuery =  "type="+stock
    let urlApi =process.env.NEXT_PUBLIC_ENV_BASE_URL_API+"/template?"+typeQuery+currentPageQuery+keywordQuery

  //`````````````````````Load data Page    
      const res = await fetch(urlApi)
      const dataRes = await res.json()
    

      let isError =(dataRes?.data ||res.status == 200 )?false:true
      let propPlus = {dataFetch:dataRes,isError}
      let props = {...propGlobal.props,...propPlus};

      return {props};
  }
  

/*
https://www.hyperui.dev/components/ecommerce/products

*/