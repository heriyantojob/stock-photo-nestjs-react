import React,{useState,useEffect} from 'react'
import IconDownload from '../../components/svg/icon/IconDownload';
import Image from 'next/image'
import { useForm,  FieldErrors } from 'react-hook-form';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import {useRouter} from "next/router";
import { yupResolver } from '@hookform/resolvers/yup';
import DOMPurify from 'isomorphic-dompurify';
import StockUploadListDownload from './StockUploadListDownload'
import {
  
  Alert,
  Modal,
 
} from "react-daisyui";
import { useUpdateStockMutation } from './stockUploadApiSlice';


import InputTags from '../../components/form/input/InputTags';
import MenuItem from 'react-daisyui/dist/Menu/MenuItem';
export default function StockUploadNewModalEdit({item,visibleModalEdit,setVisibleModalEdit,setTemplateNow,status,updateStatus}) {

  const [failedSubmit, setFailedSubmit] = useState(null)
  const [updateStock, {
    isLoading,
    isSuccess,
    // dataNewStock,
    isError,
    error
}] = useUpdateStockMutation()

  const [tags, setTags] = useState([]);
   // get functions to build form with useForm() hook

  type FormValues = {
    title: string;
    description: string;
    // tags: Array<string>;
  };
  const validationSchema = Yup
  .object()
  .shape({
    // title: Yup.string().required('title is required'),
    // description: Yup.string().required('Description is required'),


  })

  
  const { register, handleSubmit, reset,setValue,  formState: { errors } ,setError} = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const  onSubmit = async (dataSubmit)=> {
    // display form data on success
 
    try {
      const result = await updateStock({body:{ title:dataSubmit.title,
                                                description: dataSubmit.description ,
                                                update_status:updateStatus,
                                                tags:tags
                                              },
                                              id:item.id_template
                                        }
                                        ).unwrap()

      setVisibleModalEdit(false)

    } catch (err) {
   
      let message = err.data?.message;
      if(Array.isArray(message)){
        const cleanHTML = DOMPurify.sanitize(err.data?.message.join("<br/>"), {
          USE_PROFILES: { html: true },
        });
        setFailedSubmit(cleanHTML );
        // message =   err.data?.message.join("<br/>")
      }else{
        setFailedSubmit( message);
      }
   
    }
   
  }

  useEffect(() => {
    if (item) {

        if(item?.tags){
          setTags(item?.tags)
        }
       
        reset({
          title: item?.title,
          description: item?.description 
      });
   
    }
}, [item]);



  //form




  return (
    <div>
           {/* <input type="checkbox" id={modalName} className="modal-toggle" /> */}
            <Modal open={visibleModalEdit} className="modal-box relative  w-11/12 max-w-5xl">

                  <label onClick={() => {
                    setVisibleModalEdit(false)
                    setTemplateNow(null)
                  }} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  {/* <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>

          
                  <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p> */}

                  <div className='grid grid-cols-1 md:grid-cols-2'>

  {/* form image upload file */}
                    <div>
                        <figure className='w-full'>

                        {(item?.templateFileList?.filter(itemFile => itemFile["in_preview"] ==1).length >0)?
                            // jika ada foto
                            item?.templateFileList?.filter(itemFile => itemFile["in_preview"] ==1) ?.map((itemFile) => 
                            <>
                              <Image 
                                src={`${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+itemFile["file_list"].small.file_slug} 
                                alt={itemFile.file_name}
                                height={400}  width={225}
                          
                                sizes="100vw"
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                }}/>
                            </>
                            ): 
                            <div className=' w-1/2   border  border-error flex items-center justify-center'
                                style={{height: '300px'}}>
                                  <div>
                                      Image
                                      <br/> 
                                      Not 
                                      <br />
                                      Found 
                                  </div>
                              </div>
                              
                        }


                         

                        </figure>
                        {/* end images */}
                        {item &&  <StockUploadListDownload item={item}/>}

                       
                                {/* end download */}

                               

                    </div>
{/* form edit */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='md:ml-4'>
                        {item?.id_template}

                        <div className="form-control">
                            <label className="label">
                              <span className="label-text">Title</span>
                            </label>
                            <input {...register('title')} name="title" type="text" placeholder="title" 
                            className={`input input-bordered ${errors.title ? 'input-error ' : ''} `}/>                            
                            <div className="text-error text-sm ">{errors.title?.message}</div>
                        </div> 
                        {/* end title */}
                    
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Tags</span>
                          </label>
                      
                          <InputTags tags={tags} setTags={setTags}/>
                        </div>

                        {/* end tags */}

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Decription</span>
                          </label>
                          <textarea  {...register('description')} 
                            className={`input input-bordered ${errors.description ? 'input-error ' : ''} `}
                            placeholder="description"></textarea>

                          <div className="text-error text-sm ">{errors.description?.message}</div>
                          
                        
                        </div>

                        {/* end Decription */}
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
                    

                    {isError &&
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
                    
                        
                            <span>

                              
                            <div
                                dangerouslySetInnerHTML={{__html: failedSubmit}}
                              />
                           
                           
                            </span>
                          </div>
                        </div>
                      </h2>
                    }

                 
                        

                      </div>
                    </form>
                  </div> {/* end grid */}

                  
                  
   
                    {/* start form control */}

                      
          
                  
               
            </Modal>{/* end modal */}

    </div>
 
  )
}
