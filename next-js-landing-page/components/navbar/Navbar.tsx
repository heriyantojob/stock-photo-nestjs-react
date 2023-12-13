import React, { useEffect,useState  } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router";
//const sessionStatus = "authenticated"
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAuthToken
} from '../../features/auth/authSlice';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'
// import i18n   from '../../i18n'
const isLogin = false




import LocaleSwitcher from "../setting/LocaleSwitcher"
import NavbarUser from './NavbarUser';
import SettingTheme from '../setting/SettingTheme';
// import { useTranslation } from 'next-i18next'
// const resources = {
//   en: {
//     default: langDefaultEn,
//   },
//   id: {
//     default: langDefaultId,
//   }
// }


// i18n.init({  resources: resources})

import { withTranslation } from "next-i18next";

function Navbar(props) {
  const t = props.t
 
 // const { t } = useTranslation('navbar')
  const router = useRouter();
  useEffect(() => {

  }, [router.locale]);

  

    return (
      <>
      {/* Hello world */}
      <div className="navbar bg-base-100 z-40">
        <div className="flex-1 lg:flex-none  ">
          {/* drawer */}

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

          {/* logo */}
          <Link href="/" className="btn btn-ghost normal-case text-xl">
              Heriyanto 
          </Link>
          
        </div>

        <div className="flex-1 hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link href="#!"> app</Link>
            </li>

            <li tabIndex={0}>
              <a>
                {t('Hire')}
       
               
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100 z-40">
                <li>
                  <Link href="/services">All Services</Link>
                </li>
                <li>
                  <Link href="/services/design"> Design</Link>
                </li>
                <li>
                  <Link href="/services/web-development">Web Development</Link>
                </li>
                <li>
                  <Link href="/services/mobile-development">Mobile Development</Link>
                </li>  
        
              </ul>
          </li>



          

  {/* stock file menu */}
          <li tabIndex={1}>
              <a>
                {t("Stock Template")}
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100 z-40">
             
                <li>
                  <Link href="/stock/">All stock</Link>
                </li>

                <li>
                  <Link href="/stock/photos">{t("Photos")}</Link>
                
                </li>

                <li>
                  <Link href="/stock/vectors">{t("Vectors")}</Link>
                </li>

             
                <li>
                  <Link href="/stock/gif">{t("Gif")}</Link>
                </li>
               
              </ul>
            </li>

{/* learn Menu */}
          <li tabIndex={1}>
              <a>
                Learn
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100 z-40">
                <li>
                  <Link href="/stock/photos">Online course</Link>
                
                </li>

                <li>
                  <Link href="/stock/photos">course</Link>
                
                </li>
             
                <li>
                  <Link href="/tutorial/">Tutorial</Link>
                </li>

                

               
               
              </ul>
            </li>
{/* 
blog */}
            <li>
              <Link href="/blog" locale={"id"}>Blog</Link>
            </li>
           
          </ul>
        </div>

        {/* right */}
          <div className=" flex-none gap-1">

                {/* select language */}
              <LocaleSwitcher/>

              {/* user login logout */}
               <NavbarUser/>  

          </div>
      </div>

      
    </>

    )
}

export default withTranslation("navbar")(Navbar);