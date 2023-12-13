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
function Review(props) {
  const authStatus = useSelector(selectAuthStatus);
  useSession(props.sessionRefresh)
  const router = useRouter()

  return (
    <LayoutSettings>  

          <Head>
                      <title> Reiview</title>
          </Head>     

          <StockUploadContainer nameNow='Review'  title=" Review">
            
            {/* list upload template */}
        
           
            {authStatus==="authenticated"&&(
              <>
           
                <StockUploadList status={2} updateStatus={2} />
             
              </>
             
            )}

      
    
          </StockUploadContainer>

    </LayoutSettings>
   
  )
}

export default Review