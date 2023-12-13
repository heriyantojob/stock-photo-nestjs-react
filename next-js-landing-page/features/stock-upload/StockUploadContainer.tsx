import React from 'react'
import StockUploadTab from './StockUploadTab'
import Head from 'next/head'
type LayoutProps = {
    children: React.ReactNode,
    nameNow:string
    title:string
}
function StockUploadContainer({ children,nameNow,title}: LayoutProps) {
  return (

        <div className="card card-normal card-bordered  rounded-none w-full bg-base-100 shadow-xl">
          
            <div className="card-body ">
           
                    <h2 className="card-title">
                        {title}
                
                    </h2>
                 
                    <StockUploadTab nameNow={nameNow}></StockUploadTab>
                    {children}
                
            </div>
        </div>
     
  )
}

export default StockUploadContainer