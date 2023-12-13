import React from 'react'



import {useRef,useState,useEffect} from 'react'

import { setCredentials,logOut } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import {useRouter} from 'next/router';

const useSession = (sessionRefresh,protectRouter=true) => {
    const effectRan = useRef(false)
    const dispatch = useDispatch()
    const router = useRouter()
  
  useEffect(() => {

    if(!sessionRefresh){
      dispatch(logOut({}))

      return
    }
    if(sessionRefresh){
      dispatch(setCredentials({ accessToken:sessionRefresh.accessToken ,
                                username:sessionRefresh.username,
                                email:sessionRefresh.email }))

    }
  
  
  

      // eslint-disable-next-line
  }, [])


}

export default useSession