import React, { useState } from 'react'

import Link from 'next/link'
import { useForm,  FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import { joiResolver } from '@hookform/resolvers/joi';
import * as Yup from 'yup';
import { useLoginMutation } from '../features/auth/authApiSlice'
// import Joi from 'joi';
import { setCredentials } from '../features/auth/authSlice'
import AuthTabs from '../features/auth/AuthTabs'
import { useDispatch } from 'react-redux'
import {useRouter} from "next/router";

import AlertError from '../components/form/alert/AlertError'
import { logDebug } from '../utils/logDebug';
import { URL_APP } from '../config/url';
// import usePersist from "../hooks/auth/usePersist"
function Login() {
  const [failedLogin, setFailedLogin] = useState(null)
  const [fetchLogin, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const router = useRouter();
  const validationSchema = Yup
    .object()
    .shape({
        password: Yup.string()
        // .min(8, 'Password must be at least 8 characters')
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        // )
        
        .required('Password is required'),
        email: Yup.string().required('Email is required') .email('Email is invalid'),

    })



  // get functions to build form with useForm() hook
  type FormValues = {
    email: string;
    password: string;
  };
  
  const { register, handleSubmit, setValue,reset,  formState: { errors } ,setError} = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });



  // const { errors } = formState;

  const  onSubmit = async (dataSubmit)=> {
    // display form data on success
    logDebug("URL_APP")
    logDebug(URL_APP)
     try {
      const result = await fetchLogin({ email:dataSubmit.email,password: dataSubmit.password }).unwrap()
    
      dispatch(setCredentials({ accessToken:result.accessToken ,
                username:result.username,email:result.email }))
        logDebug("login success")
      logDebug(result.accessToken)
      //router.push('/');
    } catch (err) {


      setFailedLogin( err.data?.message);
   
    }
  }


  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto text-center">
        {failedLogin &&
                <AlertError message={failedLogin}></AlertError>}
      

        <form onSubmit={handleSubmit(onSubmit)}>
          

          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
            <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Sign in to your account</h1>

        {/* alert  error*/}

              

              {/* form */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register('email')} name="email" type="email" placeholder="email" className={`input input-bordered ${errors?.email ? 'input-error ' : ''} `} />
                {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                <div className="text-error text-sm ">{errors.email?.message}</div> 
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="password"
                  className={`input input-bordered ${errors.password ? 'input-error ' : ''} `}
                />
                  <div className="text-error text-sm ">{errors.password?.message}</div>
                  {/* <div className="text-error text-sm ">{errors?.password?.message}</div> */}
                <label className="label">
            
                    <Link href="/forgot-password" className="underline">
                      Forgot password?
                    </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                {isLoading
                          ? ( 
                                  <button  className="btn loading">loading</button> 
                              )
                          :  (  
                        
                                  <input type={"submit"} className="btn btn-primary" value={"Login"} />
                      
                            )}  
          
              </div>

              <p className="text-sm text-center  ">
                  No account?
                <Link href="/register" className="underline">
                    Create Account
                </Link>
              </p>

              
            </div>
          </div>

          {/* end card form */}
        </form>
      </div>

    </div>
  )
}

export default Login