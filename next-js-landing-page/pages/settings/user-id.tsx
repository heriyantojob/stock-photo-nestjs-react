import React, { useEffect } from 'react'
import useSession from "../../hooks/auth/useSession"
// import { GetServerSideProps } from 'next'
//  import serverProps from "../../utils/serverProps";
 export { default as getServerSideProps } from "../../utils/serverProps";
let protectRouter = true;
export default function UserId(props) {
    // useEffect(() => {
    //     PersistLogin()
    //   });

    useSession(props.sessionRefresh)

    
    useEffect(() => {
      // Perform localStorage action
      // alert("masuk")

    }, [])

   
  
  return (
    <div>halo</div>
  )


}

