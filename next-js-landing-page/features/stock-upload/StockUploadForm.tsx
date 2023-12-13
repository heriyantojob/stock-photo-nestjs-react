import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAddStockUploadNewMutation } from './stockUploadApiSlice';

function StockUploadForm() {
    const [failedLogin, setFailedLogin] = useState(null)
    const [addNewStock, {
        isLoading,
        isSuccess,
        // dataNewStock,
        isError,
        error
    }] = useAddStockUploadNewMutation()

    const [progress, setProgress] = useState(0);
    //form upload
      const validationSchema = Yup.object().shape({
     
        // product: Yup.string().required('Product is required') ,
        file: Yup.mixed().test("required", "photo is required", value =>  Array.isArray(value) && value.length > 0),
    
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState ,setError} = useForm(formOptions);
      const { errors } = formState;
    
      const  onSubmit = async (dataSubmit)=> {
        const formData = new FormData();
 
        formData.append("name", dataSubmit.name);
        if (dataSubmit.file.length > 0) {
            formData.append("file", dataSubmit.file[0]);
            // dataSubmit.file.forEach((element) => formData.append('file', element));
          }
 
        try {
//set on progrress
            const config = {
                onUploadProgress: progressEvent => {
                  let percentComplete :number  = progressEvent.loaded / progressEvent.total
                  percentComplete = percentComplete * 100;
         
                  setProgress(percentComplete);
                }
              }  
           
           let result = await addNewStock({body:formData,config}).unwrap()

           return result
      
          } catch (error){
    
              setFailedLogin( error.data?.message);
          }
       
      }
  
  return (
    
    <form  onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'  >
              

        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
                {isSuccess &&(
                     <h2>
                     <div className="alert  alert-success shadow-lg">
                       <div>
                       
                           <svg
                               xmlns="http://www.w3.org/2000/svg"
                               className="stroke-current flex-shrink-0 h-6 w-6"
                               fill="none"
                               viewBox="0 0 24 24"
                               
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                               />
                             </svg>
                 
                     
                         <span>Success</span>
                       </div>
                     </div>
                   </h2>
                    
                )}

                      {/* alert  error*/}

            {failedLogin &&
                      <h2>
                        <div className="alert alert-error shadow-lg">
                          <div>
                          
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="stroke-current flex-shrink-0 h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                    
                        
                            <span>{failedLogin}</span>
                          </div>
                        </div>
                      </h2>
                    }



            
                <div className="flex flex-col md:flex-row">
               
                
                    <div className="basis-full md:basis-1/2">  
                                <div className="form-control">
                                    <label className="label">
                                
                                    </label>
                                    <input  type="file" placeholder="file" className={`input file-input w-full max-w-xs  `}  name="file" {...register("file")}/>
                                    {/* <div className="text-error text-sm ">{errors.file?.message}</div> */}
                                </div>
                    </div>

                    {isLoading
                        ? ( 
                            <div className="basis-full md:basis-1/2">
                           
                                <button  className="btn loading">loading</button> 
                            </div>
                            )
                        :  (  

                            <div className="basis-full md:basis-1/2">
                                <input type={"submit"} className="btn btn-primary" value={"Upload"} />
                            </div>
                    )}           {/* end is loading button */}
         
                
                  
                </div>

                {/* <div>
                    <div className='basis-full w-full '>
                        <progress className="progress progress-primary w-56" value={progress} max={100} />
                        {progress}%

                    </div>
                </div>
                     */}
            

                
            </div>
            </div>

        {/* end card form */}
    </form>
  )
}

export default StockUploadForm