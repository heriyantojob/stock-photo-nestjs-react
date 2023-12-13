import React,{useState} from 'react'
import {useRouter} from "next/router";
import { useGetStockUploadNewQuery } from './stockUploadApiSlice'
import Image from 'next/image'
import IconDelete from '../../components/svg/icon/IconDelete';

import IconEdit from '../../components/svg/icon/IconEdit';
import StockUploadNewModalEdit from './StockUploadNewModalEdit'
import StockUploadNewModalDelete from './StockUploadNewModalDelete'

import StockUploadListDownload from './StockUploadListDownload'
import  Pagination from "../../components/pagination/Pagination"
// import IconDownload from '../../components/svg/icon/IconDownload';
// import Link from 'next/link'
function StockUploadList({status=1,updateStatus=2}) {

  const router = useRouter();
  const currentPage = (router.query.page)? parseInt(router.query.page as string) :1
 // const currentPage =  parseInt(router.query.page as string, 1)
  let  stockUploadParameter= {query:`?page=${currentPage}&status=${status}`}

  const {data, error, isLoading  } = useGetStockUploadNewQuery(stockUploadParameter)
  const[templateNow,setTemplateNow] = useState(null)


  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);

  const [visibleModalDelete, setVisibleModalDelete] = useState<boolean>(false);

    let template = []
      
   
    function clickEdit (templateClick,event){
  
      setTemplateNow(templateClick)
      setVisibleModalEdit(true)

    }

    function clickDelete (templateClick,event){
  
      setTemplateNow(templateClick)
      setVisibleModalDelete(true)

    }

  return (
    <>
     <div className="overflow-x-auto w-full">
     
 
        {isLoading && (
          <div>Loading...</div>
        )}
        {error && (
          <div>{JSON.stringify(error)}...</div>
        )}
        {/* grid*/}
        {data &&(

          <div>

            <Pagination
            currentPage={currentPage}
            totalCount={data['meta']['total']}
            pageSize={data['meta']['limit']}
            onPageChange={page =>{
              // alert(page)
              // setCurrentPage(page)
              router.push("/stock-upload/new?page="+page)
            } }/>

            {/* row data */}
            <section className="mt-12 mb-2 mx-auto sm:px-2 lg:px-2  grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            

              {data['data']?.map((item) =>
    
          
              <div  key={item.id_template} className="card  bg-base-100 shadow-xl z-0 ">
                    <figure className='w-full'>
                    
                    {(item?.templateFileList.filter(itemFile => itemFile?.in_preview ==1).length >0)?
                        // jika ada foto
                        item?.templateFileList.filter(itemFile => itemFile?.in_preview ==1) ?.map((itemFile) => 
                              <>
                                {/* {"localhost:5001/template-file/"+itemFile["file_list"].preview.file_slug} */}
                                <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                                  <Image
                                    loader={() => `${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+itemFile?.file_list?.small?.file_slug} 
                                    src={`${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/template-file/`+itemFile?.file_list?.small?.file_slug} 
                                    alt={itemFile?.file_name}
                                    fill
                                    sizes="100vw"
                                    style={{
                                      objectFit: 'contain',
                                    }}/>

                                </div>
                              
                              </>
                          

                            
                          ): 
                          // jika tidak ada  foto preview
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
                    <div className="card-body">
                        {/* <h2 className="card-title">
                            tes
                        
                        </h2>
                      */}

    {/* 
    filter download array
    .filter(itemFile => itemFile.in_download =1) */}
                   
                      <StockUploadListDownload item={item}/>
          
                      {/* {JSON.stringify(item?.templateFileList.filter(itemFile => itemFile["in_download"] ==1) )} */}
                        <div className="card-actions justify-end">
                            <label   onClick={(e) => clickEdit(item, e)} className="btn btn-primary" >
                              <IconEdit></IconEdit>
                            </label>
                            <label  onClick={(e) => clickDelete(item, e)}  className="btn btn-error">
                              <IconDelete></IconDelete>
                              </label>
                            
                        </div>
                    </div>
                </div>  
            
            )}

          
            </section>  

        {/* Pagination */}
          {/* <div>{JSON.stringify(data['meta'])}</div> */}
          <Pagination
            currentPage={currentPage}
            totalCount={data['meta']['total']}
            pageSize={data['meta']['limit']}
            onPageChange={page =>{
              // alert(page)
              //setCurrentPage(page)
              router.push("/stock-upload/new?page="+page)
            } }/>
        
              {/* <div className="btn-group">
                    <button className="btn">«</button>
                    <button className="btn" onClick={(event)=>{clickChangePage(1,event)}}>1</button>
                    <button className="btn" onClick={(event)=>{clickChangePage(2,event)}}>2</button>
                    <button className="btn" onClick={(event)=>{clickChangePage(3,event)}}>3</button>
                    <button className="btn" onClick={(event)=>{clickChangePage(3,event)}}>4</button>
              
                    <button className="btn">»</button>
              </div> */}
          </div>
          // end div data

        )} {/* end Data*/}



</div> 
{/* end first div */}
      <StockUploadNewModalEdit  item={templateNow} visibleModalEdit={visibleModalEdit}  setVisibleModalEdit={setVisibleModalEdit} setTemplateNow={setTemplateNow} status={status} updateStatus={updateStatus} />
      <StockUploadNewModalDelete  item={templateNow} visibleModalDelete={visibleModalDelete}  setVisibleModalDelete={setVisibleModalDelete}  setTemplateNow={setTemplateNow}/>
    </>
   

  )
}

export default StockUploadList


// referensi article
// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

// https://github.com/mayankshubham/react-pagination