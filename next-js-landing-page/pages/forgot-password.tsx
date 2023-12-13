import React from 'react'
import * as Yup from 'yup';
import { useForm,  FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
function ForgotPassword() {
    const validationSchema = Yup
    .object()
    .shape({
     
        email: Yup.string().required('Email is required') .email('Email is invalid'),

    })
    type FormValues = {
        email: string;
      };
    const { register, handleSubmit, setValue,reset,  formState: { errors } ,setError} = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
      });
      const  onSubmit = async (dataSubmit)=> {
        // display form data on success
        alert(dataSubmit)
      }
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
    <div className="max-w-lg mx-auto text-center">
    {/* {failedLogin &&
            <AlertError message={failedLogin}></AlertError>} */}
    

    <form onSubmit={handleSubmit(onSubmit)}>
        

        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
        <div className="card-body">
        <h1 className="text-2xl font-bold text-primary  sm:text-3xl">Forgot Password</h1>

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

            <div className="form-control mt-6">
            {/* {isLoading
                        ? ( 
                                <button  className="btn loading">loading</button> 
                            )
                        :  (  
                    
                                <input type={"submit"} className="btn btn-primary" value={"Login"} />
                    
                        )}   */}

                <input type={"submit"} className="btn btn-primary" value={"Login"} />
        
            </div>

    

            
        </div>
        </div>

        {/* end card form */}
    </form>
    </div>

</div>
  )
}

export default ForgotPassword