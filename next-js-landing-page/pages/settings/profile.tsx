import React, { useEffect } from 'react'
import useSession from "../../hooks/auth/useSession"
import { GetServerSideProps } from 'next'
 import serverProps from "../../utils/serverProps";
 import LayoutSettings from "../../features/settings/LayoutSettings"
// export { default as getServerSideProps } from "../../utils/serverProps";
import {
  selectAuthStatus,
  selectAuthToken
} from '../../features/auth/authSlice';
import ProfileUploadFoto from '../../features/user/ProfileUploadFoto';
import ProfileForm from '../../features/user/ProfileForm';
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { useGetUserProfileQuery } from '../../features/user/userApiSlice'
import { logDebug } from '../../utils/logDebug';
export { default as getServerSideProps } from "../../utils/serverProps";

export default function Profile(props) {
  const authStatus = useSelector(selectAuthStatus);
  useSession(props.sessionRefresh)
  const {data, error, isLoading  } = useGetUserProfileQuery({})
  // if(data){
  //   logDebug(data)
  // }
  
  return (
    <LayoutSettings>  
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="col-span-1 md:col-span-1">
          <div className=' rounded-full  overflow-hidden w-48 h-48 mx-auto md:mx-0'>
            <Image
                  alt="Mountains"
                  src="/images/user/user-profile-blank.png"
                  width={400}
                  height={400}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
              />
                  
          </div>
          <input type={"submit"} className="btn btn-primary" value={"Upload"}  />
          
          {/* <Image
            src="/images/user/user-profile-blank.png"
            alt="Your Image"
            width={200}
            height={200}
            className="object-cover"
          /> */}
        </div>
        <div className="col-span-1 md:col-span-2 p-4 bg-white shadow-md rounded-md">
          <ProfileForm dataFetch={data}/>
  
        </div>
      </div>

        
    </LayoutSettings>
  )


}

