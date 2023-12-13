import React ,{useEffect,useState } from 'react'
import * as Yup from 'yup';
import { useForm,  FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { logDebug } from '../../utils/logDebug';
import DOMPurify from 'isomorphic-dompurify';


import { useUpdateUserProfileMutation } from './userApiSlice';
import AlertError from '../../components/form/alert/AlertError';
import AlertSuccess from '../../components/form/alert/AlertSuccess';
function ProfileForm({dataFetch}) {
    const [failedSubmit, setFailedSubmit] = useState(null)
    const validationSchema = Yup
        .object()
        .shape({
            name: Yup.string().required('name is required'),
            about: Yup.string()
        })

        const [updateUserProfile, {
            isLoading,
            isSuccess,
            // dataNewStock,
            isError,
            error
        }] = useUpdateUserProfileMutation()

        type FormValues = {
            username:string;
            name: string;
            email: string;
            about: string;
            password:string
        };
  const { register, handleSubmit, setValue,reset,  formState: { errors } ,setError} = useForm<FormValues>({
      resolver: yupResolver(validationSchema),
    });

    const  onSubmit = async (dataSubmit)=> {
      // display form data on success
        logDebug()
      
    try {
        const result = await updateUserProfile(
                                                {body:{ username:dataSubmit?.username,
                                                    name: dataSubmit?.name ,
                                                    email:dataSubmit?.email,
                                                    about:dataSubmit?.about,
                                                    password:dataSubmit?.password,
                                                },
                                               
                                          }
                                          ).unwrap()
  
      
  
      } catch (err) {
        logDebug("message Error real ", err.data)
        let message = err?.data?.message;
        
        if(Array.isArray(message)){
            message = DOMPurify.sanitize(message.join("<br/>"), {
              USE_PROFILES: { html: true },
            });
          
        }  
          setFailedSubmit(message);
        logDebug("message Error ", failedSubmit)
     
      }
    }

    React.useEffect(() => {
        logDebug("datafetch profile Form ",dataFetch)
        if (dataFetch) {
    
          
           
            reset({
              username: dataFetch?.data?.username,
              email: dataFetch?.data?.email, 
              name: dataFetch?.data?.name ,
              about: dataFetch?.data?.about 
          });
       
        }
    }, [dataFetch]);
    
  return (
    <>
        <h2 className="text-lg font-medium mb-2">Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            
              <div className="form-control">
                  <label className="label">
                      <span className="label-text block font-medium">Username</span>
                  </label>
                  <input autoComplete="off" {...register('username')} name="username" type="text" placeholder="Username" className={`input input-bordered ${errors?.username ? 'input-error ' : ''} `} />
                  {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                  <div className="text-error text-sm ">{errors.username?.message}</div> 
              </div>


              <div className="form-control">
                  <label className="label">
                      <span className="label-text block font-medium">Email</span>
                  </label>
                  <input {...register('email')} name="email" type="text" placeholder="email" className={`input input-bordered ${errors?.email ? 'input-error ' : ''} `} />
                  {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                  <div className="text-error text-sm ">{errors.email?.message}</div> 
              </div>

              <div className="form-control">
                  <label className="label">
                      <span className="label-text block font-medium">Name</span>
                  </label>
                  <input {...register('name')} name="name" type="text" placeholder="name" className={`input input-bordered ${errors?.name ? 'input-error ' : ''} `} />
                  {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                  <div className="text-error text-sm ">{errors.name?.message}</div> 
              </div>


              
              <div className="form-control">
                  <label className="label">
                      <span className="label-text block font-medium">About</span>
                  </label>
                  <input {...register('about')} name="about" type="text" placeholder="About" className={`input input-bordered ${errors?.about ? 'input-error ' : ''} `} />
                  {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                  <div className="text-error text-sm ">{errors.name?.message}</div> 
              </div>

         
              <div className="form-control">
                  <label className="label">
                      <span className="label-text block font-medium">Your Account Password</span>
                  </label>
                  <input {...register('password')} name="password" type="password" placeholder="Old Password" className={`input input-bordered ${errors?.password ? 'input-error ' : ''} `} />
                  {/* <div className="text-error text-sm ">{errors["email"].message}</div> */}
                  <div className="text-error text-sm ">{errors.name?.message}</div> 
                  <p className='text-sm' >Password won`t change  </p>
              </div>

              <div className="form-control mt-6">
                {isSuccess && <AlertSuccess message={"Your profile Succes Update"}/>}
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
 
                    {isError && <AlertError message={failedSubmit}/>}
              
              </div>

  {/* end card form */}
            </form>
    </>
  )
}

export default ProfileForm