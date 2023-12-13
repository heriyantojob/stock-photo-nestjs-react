import React from 'react'
import Link from 'next/link'
function StockDetailDownload({dataFetch}) {
  let content =null;

  if((dataFetch?.templateFileList.filter(itemFile => itemFile["in_download"] ==1).length >0)){
    let listLinkDownload=null
    dataFetch?.templateFileList.filter(itemFile => itemFile["in_preview"] ==1) ?.map((itemFile) => {
      listLinkDownload = [{
        key:"original",
        name:"Original",
        link:process.env.NEXT_PUBLIC_ENV_BASE_URL_API+"/template-file/"+itemFile["file_slug"]+"?download=true"}
      ]
      for (const property in itemFile['file_list']) {

        listLinkDownload.push({
          key:property,
          name:property,
          link:process.env.NEXT_PUBLIC_ENV_BASE_URL_API+"/template-file/"+itemFile["file_list"][property].file_slug+"?download=true"
        }); 
      }
   
    })
    if(listLinkDownload){
      content =(
        
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">Download</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {/* load Data download */}
              {listLinkDownload?.map((itemFile) => 
                    <li key={itemFile.key}><Link href={itemFile.link}>{itemFile.name}</Link></li> 
              )} 
                
            {/* <li><a>Item 2</a></li> */}
          </ul>
        </div>
      
      
      )
      
    }

  }
  return content
  return (
    <Link href="/">
      <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase btn btn-primary rounded"
        >
          Download
      </button>
    
    </Link>
  )
}

export default StockDetailDownload