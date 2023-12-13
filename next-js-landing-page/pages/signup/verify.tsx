import React, { useEffect } from 'react'
import { useVerifyMutation } from '../../features/auth/authApiSlice'
import { useRouter } from 'next/router'
import PulseLoader from 'react-spinners/PulseLoader'
function Verify() {
  const [fetchVerify, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useVerifyMutation()
  const router = useRouter()

 const query = router.query;

  useEffect(()=>{

    const fetchDataVerify = async () => {
      if(!router.isReady) return;
 
      try {
        const result = await fetchVerify({ token:query?.token }).unwrap()
      } catch (error) {
        // console.log("EroorVerified",error)
      }
     
  
    }


    fetchDataVerify()
  
  },[router.isReady,fetchVerify, query?.token]);

  let content;
  let  verifyComponent =<PulseLoader color={"#FFF"} />
  if (isLoading){

    content = <PulseLoader color={"#FFF"} />
  }else if(isError){

    verifyComponent =(
      <>
          <h1 className="text-5xl font-bold">Email Register Not found Or Your email has been verified</h1>
      
        <button className="btn btn-primary mt-8">Click Here to login</button>
      </>

    )

  }
  else if(isSuccess){

    verifyComponent =(
      <>
          <h1 className="text-5xl font-bold">Congratulations, your account has been verified</h1>
      
        <button className="btn btn-primary mt-8">Click Here to login</button>
      </>

    )

  } 
 
content = (
    <>
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
     
      {verifyComponent}

    
     
    </div>
  </div>
</div>
</>
  
  )
  return content
}

export default Verify