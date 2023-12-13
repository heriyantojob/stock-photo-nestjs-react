import React, { useEffect,useState } from 'react'
import useSession from "../../hooks/auth/useSession"
import { GetServerSideProps } from 'next'
 import serverProps from "../../utils/serverProps";
 import LayoutSettings from "../../features/settings/LayoutSettings"
// export { default as getServerSideProps } from "../../utils/serverProps";
import * as Yup from 'yup';
import { useForm,  FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { logDebug } from '../../utils/logDebug';
import { isError } from 'joi';
import { error } from 'console';
import DOMPurify from 'isomorphic-dompurify';
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserProfilePasswordMutation } from '../../features/user/userApiSlice';
import {
    selectAuthStatus,
    selectAuthToken
  } from '../../features/auth/authSlice';
import AlertError from '../../components/form/alert/AlertError';
import AlertSuccess from '../../components/form/alert/AlertSuccess';
export { default as getServerSideProps } from "../../utils/serverProps";
export default function Password(props) {
    const authStatus = useSelector(selectAuthStatus);
    useSession(props.sessionRefresh)
    const [failedSubmit, setFailedSubmit] = useState(null)
    const [updateUserProfilePassword, {
        isLoading,
        isSuccess,
        // dataNewStock,
        isError,
        error
    }] = useUpdateUserProfilePasswordMutation()

  const validationSchema = Yup
  .object()
  .shape({
   
      password: Yup.string().required('Passsword is required'),
      newPassword: Yup.string().required('New Passsword is required'),
      confirmationPassword:Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirmation Passsword is required'),

  })
  type FormValues = {
        password: string;
        newPassword: string;
        confirmationPassword: string;
    };
  const { register, handleSubmit, setValue,reset,  formState: { errors } ,setError} = useForm<FormValues>({
      resolver: yupResolver(validationSchema),
    });
    const  onSubmit = async (dataSubmit)=> {
      // display form data on success
        //logDebug("dataSubmit Password ",dataSubmit)
        const { password, newPassword } = dataSubmit;
        try {
            const result = await updateUserProfilePassword({
                body: { password, newPassword },
            }).unwrap();
      
          
      
          } catch (err) {
         
            let message = err?.data?.message;
            if(Array.isArray(message)){
                message = DOMPurify.sanitize(message.join("<br/>"), {
                  USE_PROFILES: { html: true },
                });
              
            }  
            setFailedSubmit(message);
         
        }
        
    }
  
  return (
    <LayoutSettings>  
         <div className="card card-normal card-bordered  rounded-none w-full bg-base-100 shadow-xl">
          
            <div className="card-body ">
         
                    <h2 className="card-title">
                        Password
                
                    </h2>
                
                    <form onSubmit={handleSubmit(onSubmit)}>
        
                    <div className="form-control">
                          <label className="label">
                              <span className="label-text">Old Password</span>
                          </label>
                          <input {...register('password')}  type="password" name="password" placeholder="Password" className={`input input-bordered ${errors?.password ? 'input-error ' : ''} `} />
                          {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                          <div className="text-error text-sm ">{errors.password?.message}</div> 
                      </div>

                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">New Password</span>
                          </label>
                          <input {...register('newPassword')}  type="password" name="newPassword" placeholder="Password" className={`input input-bordered ${errors?.newPassword ? 'input-error ' : ''} `} />
                          {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                          <div className="text-error text-sm ">{errors?.newPassword?.message}</div> 
                      </div>

                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Confirmation New Password</span>
                          </label>
                          <input {...register('confirmationPassword')}  type="password" name="confirmationPassword" placeholder="Confirmation Password" className={`input input-bordered ${errors?.confirmationPassword ? 'input-error ' : ''} `} />
                          {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                          <div className="text-error text-sm ">{errors.confirmationPassword?.message}</div> 
                      </div>


                        <div className="form-control mt-6">
                            {isLoading
                            ? ( 
                                <div className="basis-full md:basis-1/2">
                              
                                    <button  className="btn loading">loading</button> 
                                </div>
                                )
                            :  (  

                                <div className="basis-full md:basis-1/2">
                              
                                    <button type={"submit"}  className="btn btn-primary">Submit</button>
                                </div>
                            )}  

                        {isSuccess && <AlertSuccess message={"Your profile Succes Update"}/>}
    
                        {isError && <AlertError message={failedSubmit}/>}
                                  {/* <input type={"submit"} className="btn btn-primary" value={"Save"} /> */}
                      
                      </div>

        {/* end card form */}
                  </form>
                 
                
            </div>
        </div>
    </LayoutSettings>
  )


}
