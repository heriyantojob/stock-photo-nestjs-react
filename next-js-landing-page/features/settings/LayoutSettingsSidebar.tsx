import React from 'react'
import Link from 'next/link'
const setingUrl="/settings"
const STOCK_UPLOAD_TAB_ITEM =[ 
    { name:"profile",url:`${setingUrl}/profile`},
    {name:"email",url:`${setingUrl}/email`},
    {name:"password",url:`${setingUrl}/password`},

]
function LayoutSettingsSidebar() {
  return (
    <ul className="menu menu-compact flex flex-col p-0 px-4">
        <li />
            <li className="menu-title">
                <span>Stock</span>
            </li>

            {STOCK_UPLOAD_TAB_ITEM?.map((item) =>
        

                <li key={item.name}>
                    <Link

                    href={item.url}

                    className="flex gap-4   "
                    >

                    <span className="flex-1">   {item.name}</span>
                    </Link>
                </li>
            )}
        

    </ul>

  )
}

export default LayoutSettingsSidebar