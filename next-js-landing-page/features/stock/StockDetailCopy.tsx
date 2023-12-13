import React from 'react'
import {useRouter} from "next/router";
import StockListImages from './StockListImages'
import { useGetStockBySlugQuery } from './stockApiSlice'
import  Pagination from "../../components/pagination/Pagination"
import Image from 'next/image'
import Link from 'next/link'
export default function StockDetail() {
  const router = useRouter();
  const { stock,slug } = router.query
  

  const {data:dataFetch, error, isLoading  } = useGetStockBySlugQuery({slug})
  return (
    <div>
      {dataFetch&&(
        <>
        <section>
            <div className="flex flex-col md:flex-row max-w-screen-xl px-4 py-8 mx-auto">

                 {/* left */}
                 <div className="md:basis-2/3">
                  <div className="relative mt-4">
                    {JSON.stringify(dataFetch["templateFile"]) }

                    {/* <Image
                                    loader={() => `${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+dataFetch["templateFile"]["file_list"].preview.file_slug} 
                                    src={`${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+dataFetch["templateFile"]["file_list"].preview.file_slug} 
                                    alt={dataFetch.file_name}
                                    width={dataFetch.file_width}
                                    height={dataFetch.file_height}
                                    style={{
                                      maxWidth: '100%',
                                      height: 'auto',
                                    }}/> */}

{/* ===============images preview */}



{(dataFetch?.templateFileList.filter(itemFile => itemFile["in_preview"] ==1).length >0)?
                        // jika ada foto
                        dataFetch?.templateFileList.filter(itemFile => itemFile["in_preview"] ==1) ?.map((itemFile) => 
                              <div className="inset-0 w-full  object-cover">
               
                                  <Image
                                    loader={() => `${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+itemFile["file_list"].small.file_slug} 
                                    src={`${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+itemFile["file_list"].small.file_slug} 
                                    alt={itemFile.file_name}
                                    width={itemFile.file_width}
                                    height={itemFile.file_height}
                                    style={{
                                      maxWidth: '100%',
                                      height: 'auto',
                                    }}/>
                
                        
                              
                              </div>
                          

                            
                          ): 
                          // jika tidak ada  foto preview
                          <div className=' w-1/2   border  border-error flex items-center justify-center w-full'
                            style={{height: '300px',width:"100%"}}>
                              <div>
                                  Image
                                  <br/> 
                                  Not 
                                  <br />
                                  Found 
                              </div>
                          </div>
                          
                    }
                     
                          
                  </div>

                </div>

                {/* right */}
                <div className="md:basis-1/3 md:ml-10">
                  <h1 className="text-2xl font-bold lg:text-3xl">
                    {dataFetch['title']}
                  </h1>
        
                
                    {/* <div className="p-4 bg-gray-100 border rounded">
                      <p className="text-sm">
                        <span className="block">Pay as low as $3/mo with 0% APR.</span>
                        <a href="" className="inline-block mt-1 underline">
                          Find out more
                        </a>
                      </p>
                    </div> */}

                    
                  <Link href="/">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase btn btn-primary rounded"
                      >
                        Download
                    </button>
                    
                  </Link>
                    
                  
        
                </div>
           
            
            </div>      {/* end flex */}
       
        </section>
      
        
        </>
          
      )}

      {error&&<div>{JSON.stringify(error)}</div>}
      {isLoading&&<div>Loadingg</div>}


    </div>
  )
}
