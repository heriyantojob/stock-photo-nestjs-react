import React from 'react'
import Image from 'next/image'
function StockDetailPreview({dataFetch}) {
  return (
    <>
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
    </>
 
  )
}

export default StockDetailPreview