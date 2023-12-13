import React from 'react'

import LayoutSettings from "../../features/settings/LayoutSettings"
import StockUploadContainer from '../../features/stock-upload/StockUploadContainer'
import StockUploadReviewList from '../../features/stock-upload/StockUploadReviewList'
import {
  selectAuthStatus,
  selectAuthToken
} from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import useSession from "../../hooks/auth/useSession"
import { useRouter } from 'next/router'
import StockUploadForm from '../../features/stock-upload/StockUploadForm'
import StockUploadList from '../../features/stock-upload/StockUploadList'
import Head from 'next/head'
export { default as getServerSideProps } from "../../utils/serverProps";
function Reject(props) {
  const authStatus = useSelector(selectAuthStatus);
  useSession(props.sessionRefresh)
  const router = useRouter()

  return (
    <LayoutSettings>       
          <StockUploadContainer nameNow='Reject'  title=" Reject">
            
            {/* list upload template */}
            <Head>
                        <title> Reject</title>
            </Head>  
              
        
           
            {authStatus==="authenticated"&&(
              <>
                <StockUploadList status={4}  updateStatus={4} />
             
              </>
             
            )}

      
    
          </StockUploadContainer>

    </LayoutSettings>
   
  )
}

export default Reject