import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAuthStatus,
  selectAuthToken
} from '../../features/auth/authSlice';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
// 
function NavbarUser() {

    const authToken = useSelector(selectAuthToken);
    const authStatus = useSelector(selectAuthStatus);
    
    const logout = async (e) => {
        
      alert("logout")

    }  
    const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useSendLogoutMutation()




  return (
    <>{authStatus==="authenticated"?
        (
            <>
                            {/* profile */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image alt='not found'  width={80}height={80} src="/images/user/user-profile-blank.png" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <Link href="/stock-upload/new"className="justify-between">Stock Upload</Link>
                  </li>
                 
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a >signIn</a>
                  </li>
                
                  <li onClick={sendLogout}>
                    <a >Logout</a>
                  </li>
                </ul>
              </div>
              
            </>

        ):
        (
            <>
              <Link href="/login" className="btn btn-primary"> Login</Link>
          
            </>
        )}</>
  )
}

export default NavbarUser