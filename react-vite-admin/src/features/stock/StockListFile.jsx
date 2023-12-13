import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, BASE_URL_DOWNLOAD_PUBLIC } from '../../config/url'

function StockListFile({item}) {
  return (
    <div>

        { item?.map((itemFile,i) => 
              
            <a key={i} target="_blank" href={BASE_URL_DOWNLOAD_PUBLIC+"/"+itemFile.file_slug}>{itemFile.file_name }</a>         
        )}
    </div>
  )
}

export default StockListFile