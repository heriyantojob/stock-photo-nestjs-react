import React,{useEffect, useState} from 'react'
import {
  
  Modal,
 
} from "react-daisyui";
import {useRouter} from "next/router";
import { useDeleteStockMutation } from './stockUploadApiSlice'
function StockUploadNewModalDelete({item,visibleModalDelete,setVisibleModalDelete,setTemplateNow}) {
  const [failedDelete, setFaileDelete] = useState(null)
  const [deleteStock, {
        isLoading ,
        isSuccess,
        // dataNewStock,
        isError,
        error
  }] = useDeleteStockMutation()

  const router = useRouter();
  async  function clickYes(idTemplate,e){
      // alert(idTemplate)

      try {
        let dataDelete ={body:{ id:idTemplate}}
        const result = await deleteStock(dataDelete ).unwrap()

        setVisibleModalDelete(false)


        // router.push('/');
      } catch (err) {

        setFaileDelete( err.data?.message);
    
      }

    }
    useEffect(() => {
      //Runs on the first render
      //And any time any dependency value changes
      setFaileDelete(null)
    }, [item]);
  return (
    
    <div>
      <Modal open={visibleModalDelete} className="modal-box relative  w-11/12 max-w-5xl">
   
         {failedDelete &&
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
                    
                        
                            <span>{failedDelete}</span>
                          </div>
                        </div>
                      </h2>
                    }
          <p className="py-4">Do you want to Delete Data</p>
          <div className='flex'>
              <div className="modal-action">
                  <button onClick={() => setVisibleModalDelete(false)}className="btn btn-error">No</button>

                  {isLoading
                        ? ( 
                            <div className="basis-full md:basis-1/2">
                           
                                <button  className="btn loading">loading</button> 
                            </div>
                            )
                        :  (  

                          <button  className="btn btn-primary"  onClick={(e) => clickYes(item?.id_template,e)} >Yes</button>
                    )}  
                  
              </div>

          </div>
          

      </Modal>
     

    </div>
  )
}

export default StockUploadNewModalDelete