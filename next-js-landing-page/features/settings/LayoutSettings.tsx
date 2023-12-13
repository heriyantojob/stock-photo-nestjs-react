import React from 'react'
import StockUploadSidebarMenu from '../stock-upload/StockUploadSidebarMenu'
import LayoutSettingsSidebar from './LayoutSettingsSidebar'
type LayoutProps = {
    children: React.ReactNode
  }
  

export default function LayoutSettings({ children }: LayoutProps) {
  return (
      <div className="px-10 py-4 flex flex-col md:flex-row ">
        {/* left sidebar Menu */}
        <div className='flex-none w-full md:w-64  '>

          <div className="card   my-2 mx-2">

              {/* avatar and home */}
              <div className='flex mx-8'>
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://placeimg.com/192/192/people" width={80} height={80} />
                  </div>
                </div>
                <div className='flex-1 ml-4'>
                  Heriyanto

                </div>

              </div>

              <LayoutSettingsSidebar/>

              <StockUploadSidebarMenu/>

              {/* template */}
              {/* <ul className="menu menu-compact flex flex-col p-0 px-4">
                <li />{" "}
                <li className="menu-title">
                  <span>Navigation</span>
                </li>{" "}
                <li>
                  <a
                  
                    href="/components/breadcrumbs"
                    id=""
                    className="flex gap-4   "
                  >
                    {" "}
                    <span className="flex-1">Breadcrumbs</span>{" "}
                  </a>{" "}
                </li>

              </ul> */}

          </div>
        </div>

        {/* content */}
        <div className='md:flex-1 w-full  '>
            {children}
        </div>
      
      </div>
  )
}
