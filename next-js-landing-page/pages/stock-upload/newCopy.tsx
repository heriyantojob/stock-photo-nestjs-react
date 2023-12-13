import React from 'react'
import StockUploadTab from '../../features/stock-upload/StockUploadTab'

function newUpload() {
  return (
    <div className="flex ">
      {/* right sidebar */}
      <div className='flex-none w-64 border-4 border-primary'>

      </div>
      <div className='flex-1 border-4 border-primary px-6 py-2'>
          <div className=" mx-auto text-center">
          
            <StockUploadTab nameNow={"Upload"}></StockUploadTab>
            <div>new</div>
          </div>
      </div>
     
    </div>

   
  )
}

export default newUpload