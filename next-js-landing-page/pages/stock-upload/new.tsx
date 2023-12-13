import React,{useState} from 'react'

import StockUploadTab from '../../features/stock-upload/StockUploadTab'
import LayoutSettings from "../../features/settings/LayoutSettings"
import StockUploadContainer from '../../features/stock-upload/StockUploadContainer'
import { useRouter } from 'next/router'
import StockUploadForm from '../../features/stock-upload/StockUploadForm'
import StockUploadList from '../../features/stock-upload/StockUploadList'
import useSession from "../../hooks/auth/useSession"
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAuthStatus,
  selectAuthToken
} from '../../features/auth/authSlice';
import StockUploadNewModalEdit from '../../features/stock-upload/StockUploadNewModalEdit'
import StockUploadNewModalDelete from '../../features/stock-upload/StockUploadNewModalDelete'
// import DOMPurify from "dompurify";
// Import as an ES6 module.

// import { GetServerSideProps } from 'next'
//  import serverProps from "../../utils/serverProps";
import Head from 'next/head'
 export { default as getServerSideProps } from "../../utils/serverProps";

function NewStockUpload(props) {
  const authStatus = useSelector(selectAuthStatus);
  useSession(props.sessionRefresh)
  const router = useRouter()
  return (
    <LayoutSettings>       

          <Head>
                <title> Upload New</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
          <StockUploadContainer nameNow='New'  title="Upload New">
            
            {/* list upload template */}
          
           
            {authStatus==="authenticated"&&(
              <>
                <StockUploadForm />
                <StockUploadList status={1} updateStatus={2} />
             
              </>
             
            )}

      
    
          </StockUploadContainer>

    </LayoutSettings>
   
  )
}

export default NewStockUpload