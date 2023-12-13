import React from 'react'
import { BASE_URL, BASE_URL_DOWNLOAD_PUBLIC } from '../../config/url'
import {
  Paper
} from '@mui/material';
function StockListImageCell({item,width}) {
  return (
    <>
     {(item?.templateFileList?.filter(itemFile => itemFile["in_preview"] ==1).length >0)?
                        // jika ada foto
                        item?.templateFileList?.filter(itemFile => itemFile["in_preview"] ==1) ?.map((itemFile,i) => 
                          
                            <>
                              <img
                                 src={ `${BASE_URL_DOWNLOAD_PUBLIC}/${itemFile?.file_list?.small.file_slug}`}
                               
                                 alt={"title"}
                                 loading="lazy"
                                  width={width}
                                 key={i}/>
                            
                           
                            </>
                            
                    
                               
                             

                            
                          ): 
                          // jika tidak ada  foto preview
                          <div className=' w-1/2   border  border-error flex items-center justify-center w-full'
                            style={{height: '50px',width:"100%"}}>
                              <div>
                                  Image
                                  <br/> 
                                  Not 
                                  <br />
                                  Found 
                              </div>
                          </div>
                          
        }
    </>
  )
}

export default StockListImageCell