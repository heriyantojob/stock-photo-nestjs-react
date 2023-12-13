import React,{ useEffect, useRef, useState }  from 'react'

import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import {themeLocalStorage} from "../../constants/localStorageConst"
type LayoutProps = {
  children: React.ReactNode
}

import {

  Theme
 
} from "react-daisyui";

export default function Layout({ children }: LayoutProps) {

  const effectRan =useRef(false)
  const [choseTheme, setChoseTheme] = useState("light");
  const  changeChoseTheme   = (event,parameter) =>{
    
 
    localStorage.setItem(themeLocalStorage, parameter);
    setChoseTheme( parameter)

  }
  //signout jika refresh token tidak ada



  useEffect(()=>{
   
    if(effectRan.current ===true){

      if (typeof window !== "undefined") {
   
        if(localStorage.getItem(themeLocalStorage)){
          setChoseTheme(localStorage.getItem(themeLocalStorage))
        }
      }
    }//endIF effect run curent
  
    return()=>{

      effectRan.current = true
    }
  },[])

  return (
    <>
         <Theme dataTheme={choseTheme} >
          <Navbar choseTheme ={choseTheme} changeChoseTheme={changeChoseTheme} />
          <main>{children}</main>
          <Footer   choseTheme ={choseTheme} changeChoseTheme={changeChoseTheme}/>

         </Theme>
 
    </>
  )
}

