import React from 'react'
import Link from 'next/link'
import STOCK_UPLOAD_TAB_ITEM from "./StockUploadTabItem"
function StockUploadTab({nameNow}) {

  let templateStatus = [ { name:"New",url:"/template-upload/new"},
                          {name:"Review",url:"/template-upload/review"},
                          {name:"Publish",url:"/template-upload/publish"},
                          {name:"Reject",url:"/template-upload/reject"},]
  return (
   
    <div className="tabs  tabs-boxed mx-4 my-4">
      {STOCK_UPLOAD_TAB_ITEM?.map((item) =>
        <Link key={item.name} className={`tab tab-bordered ${item.name===nameNow ? 'tab-active ' : ''} `}  href={item.url}>
         {/*  <Link key={item.name} className={`tab  ${item.name===nameNow ? 'tab-active ' : ''}  `} href={item.url}>*/}
          {item.name}
        </Link>
      )}
    </div>
  )
}

export default StockUploadTab