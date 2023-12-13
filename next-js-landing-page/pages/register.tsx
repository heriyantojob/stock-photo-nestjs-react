import React,{useState,useRef ,useCallback} from 'react'
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link'
import { useRegisterMutation } from '../features/auth/authApiSlice'
import AlertError from '../components/form/alert/AlertError'
import AlertSuccess from '../components/form/alert/AlertSuccess'
import { GoogleReCaptchaProvider ,useGoogleReCaptcha} from "react-google-recaptcha-v3";

function  RegisterForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [tokenCaptcha,setTokenCaptcha]= useState()
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  // const inputElement = useRef();

  const [fetchRegister, { isLoading }] = useRegisterMutation()
  const [failedLogin, setFailedLogin] = useState(null)
  const [successLogin, setSuccessLogin] = useState(false)
  const [successLoginMessage, setSuccessLoginMessage] = useState("")
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required').min(2, 'Username must be at least 2 characters'),
    // username: Yup.string().required('Username is required'),
    email: Yup.string().required('Username is required') .email('Email is invalid'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    // .required('Password is required').matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    // ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  type FormValues = {
    name:string;
    username:string;
    email: string;
    password: string;

  };
  const { register, handleSubmit, reset, formState,setError} = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  // get functions to build form with useForm() hook



  const  onSubmit = async (dataSubmit)=> {
   const tokenCaptcha = await executeRecaptcha();


    try {
      const result = await fetchRegister({ email:dataSubmit.email,password: dataSubmit.password ,
                                          name:dataSubmit.name, gRecaptchaToken: tokenCaptcha,
                                          username:dataSubmit.username
                                        }).unwrap()

     setSuccessLoginMessage( result?.message);
     setSuccessLogin(true)
      setFailedLogin( "");

      // router.push('/');
    } catch (err) {
 
      setFailedLogin( err.data?.message);
   
    }
  }


  let content=null
 
 if(successLogin){
  content =(
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Success</h1>
          <p className="py-6">{successLoginMessage}</p>
          <button className="btn btn-primary">Get Started</button>
          <Link href="/login">Back to Login </Link>
        </div>
      </div>
    </div>
 
  )
  return content

 }

  content = (
  
<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
    <div className="max-w-lg mx-auto">
      {failedLogin &&
            <AlertError message={failedLogin}></AlertError>}
            
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div className="card-body">

          <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Register account</h1>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input   {...register('name')} type="text" placeholder="Name" className={`input input-bordered ${errors.name ? 'input-error ' : ''} `} />
       
                <div className="text-error text-sm ">{errors.name?.message}</div> 
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input {...register('email')} type="email" placeholder="email" className={`input input-bordered ${errors.email ? 'input-error ' : ''} `} />
                <div className="text-error text-sm ">{errors.email?.message}</div>
              </div>

              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">username</span>
                </label>
                <input   {...register('username')} type="text" placeholder="Username" className={`input input-bordered ${errors.username ? 'input-error ' : ''} `} />
       
                <div className="text-error text-sm ">{errors.username?.message}</div> 
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
                
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
                 {/* <GoogleReCaptcha
                   onVerify={verifyRecaptchaCallback}/> */}
        
                        
              <div className="form-control mt-6">
             
                  {isLoading
                        ? ( 

                                <button  className="btn loading">loading</button> 
                            )
                        :  (  
                      
                                <input type={"submit"} className="btn btn-primary" value={"Create Account"} />
                     
                          )}   
               
              </div>
            </form>

            <p className="text-sm text-center  ">
              Already a member? 
              <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>

        {/* end card form */}
    
    </div>
  </div>


  )

  return content
}

const Register = () => {
  const siteKey = process.env.NEXT_PUBLIC_ENV_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <RegisterForm />
    </GoogleReCaptchaProvider>
  );
};



export default Register


/*
===== react hook form
https://tkssharma.com/nextjs-with-react-hook-forms-building-forms/
https://github.com/react-hook-form/react-hook-form/issues/1001
https://github.com/react-hook-form/react-hook-form/issues/1001


===========rechapcha
https://www.techomoro.com/how-to-add-google-recaptcha-v3-in-a-next-js-form/
https://stackoverflow.com/questions/71696372/how-to-add-a-google-recaptcha-v3-to-a-functional-react-component-with-a-form

https://github.com/react-hook-form/react-hook-form/issues/1001

https://github.com/t49tran/react-google-recaptcha-v3/issues/73
*/ 