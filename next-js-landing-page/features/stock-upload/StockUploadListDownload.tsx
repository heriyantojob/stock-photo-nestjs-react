import React from 'react'
import Link from 'next/link'
import IconDownload from '../../components/svg/icon/IconDownload';
function StockUploadListDownload({item}) {
  return (
    <> 
        {item?.templateFileList.filter(itemFile => itemFile["in_download"] ==1) ?.map((itemFile) =>
        <div key={itemFile.id_template_file} >
            <span >
            {itemFile.file_name}
            </span>
            <Link href={process.env.NEXT_PUBLIC_ENV_BASE_URL_API+"/template-file/"+itemFile['file_slug']+"?download=true"}>
            <span className="btn btn-secondary ml-2">
                
                <IconDownload></IconDownload>
                
            </span>

            </Link>
        
        </div>
  )}</>
  )
}

export default StockUploadListDownload