import React from 'react'
import { useRouter } from 'next/router'
import StockDetailPreview from '../../../features/stock/StockDetailPreview'
import StockDetailDownload from '../../../features/stock/StockDetailDownload'
import Link from 'next/link'
import serverProps from "../../../utils/serverProps";
import useSession from "../../../hooks/auth/useSession"
import { Button } from 'react-daisyui'
import LayoutError from '../../../components/layout/LayoutError/LayoutError'
import Image from 'next/image'
function StockDetailPage({sessionRefresh,dataFetch,isError,error}) {
  //sesion refresh
    useSession(sessionRefresh)
    const router = useRouter()
    const { stock, stockSlug } = router.query
    let content
    if (isError) {
     // content = <p className="errmsg">{error.message} </p>
     content =<LayoutError statusCode={dataFetch?.statusCode} message={dataFetch?.message}/>
    }else{
      content =(
        <div>
        {dataFetch&&(
          <>
      
          <section>
              <div className="flex flex-col md:flex-row max-w-screen-xl px-4 py-8 mx-auto">
      
                   {/* left */}
                   <div className='md:hidden'>
                    <StockDetailDownload  dataFetch={dataFetch}/>
                   </div>
                   <div className="md:basis-2/3">               
                      <StockDetailPreview dataFetch={dataFetch}/>
                     
                      {/* {JSON.stringify(dataFetch["templateFile"]) } */}
  
                  </div>
      
                  {/* right */}
                  <div className="md:basis-1/3 md:ml-10">
  
                     {/* user */}
                     <div className='flex flex-row mt-2'>
                        <div className="avatar">
                          <div className="w-16 rounded-full">
                            {/* <img src="/images/user/user-profile-blank.png" /> */}
                            <Image
                              alt="User Profile"
                              src={"/images/user/user-profile-blank.png"}
                              width={700}
                              height={475}
                              sizes="100vw"
                              style={{
                                width: '100%',
                                height: 'auto',
                              }}
                            />
                          </div>
                        </div>
                        <div className='ml-4 flex flex-col'>
                          <div>
                            {dataFetch?.user?.username}
                          </div>
                          <div>
                            
                            <Button className='btn btn-primary btn-xs'>Follow</Button>
                          </div>
                          
                        </div>
  
                      </div>
                        
                      <h1 className="text-2xl mt-2 font-bold lg:text-3xl">
                        {dataFetch?.title}
                      </h1>
                      <div className="divider"></div>
                      <div className="mt-2">
                        Relate Tags
  
                        <div className='mt-2'>
                                  {dataFetch?.tags.map((tag) =>
                                     <Link  key={tag} href={`/stock/${stock}?keyword=${tag}`}>
                                        <button className="btn btn-accent mx-2">{tag}</button>
                                     </Link>
                                  
                                  )}
                        </div>
                      </div>
                 
                    <div className='mt-2 invisible md:visible'>
                      <StockDetailDownload   dataFetch={dataFetch}/>
                    </div>
                   
          
                  </div>
             
              
              </div>      {/* end flex */}
         
          </section>
        
          
          </>
            
        )}
      
      
      
      </div>
      )

    }
  // if (isSuccess) {
    
  
  // }
    return content
}

export default StockDetailPage

/*
https://www.hyperui.dev/components/ecommerce/products

*/

export async function getServerSideProps(context) {

//```````````````````` load sessionRefreshToken

    let propGlobal =  await serverProps(context,false)

//`````````````````````Load data Page    

    const { stockSlug } = context.query;
    let split = stockSlug.split('-');
   
    let id = split.pop();
 

    const res = await fetch(process.env.NEXT_PUBLIC_ENV_BASE_URL_API+"/template/"+id)

    const dataRes = await res.json()
    let dataFetch={}
    let isError = true
    let error={}
    if(dataRes?.data ){
      dataFetch =dataRes?.data 
      isError=false
    }else{
      dataFetch =dataRes
      error =dataRes
    }
  


    let propPlus = { dataFetch:dataFetch,isError,error }
    let props = {...propGlobal.props,...propPlus};


    return {props};
}
