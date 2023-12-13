import React from 'react'
import Image from 'next/image'

import useSession from "../hooks/auth/useSession"
import serverProps from "../utils/serverProps";
import DummyBlog from '../features/blog/DummyBlog';
import { logDebug } from '../utils/logDebug';

import axios from 'axios';
import {URL_CMS_API} from "../config/url"
import { fetchAPI, fetchAPICms } from '../utils/apiFetch';
import BlogList from '../features/blog/BlogList';

function Blog(props) {
  
    useSession(props.sessionRefresh)
    React.useEffect(() => {
      // Run! Like go get some data from an API.
  
    
      // Load data Page
    
    
      // fetchData();
      // logDebug("masuk useEffect")
    
      // Return a cleanup function if necessary
      return () => {
        const controller = new AbortController();
        controller.abort();
      };
    }, []);

    return (
      <>
            
        <BlogList dataFetch={props.dataFetch}></BlogList>
      </>
      
    )
}

export default Blog


// export async function getServerSideProps(context) {
//   try {
//     const response = await axios.get('http://192.168.100.3:1337/api/blogs');
//     const data = response.data;
//     console.log("Response data ",data)
//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: { data: [] },
//     };
//   }
// }

// export async function getServerSideProps(context) {
//     // do custom page stuff...
  
//       context.req.isNotRedirect = true
//       let propGlobal =  await serverProps(context)
//       let propPlus = { junk: 347 }
//       let props = {...propGlobal.props,...propPlus};
//       // console.log("propGlobal ",propGlobal.props);
//       // console.log("props ",props);
  
//       return {props};
// }


export async function getServerSideProps(context) {

  //```````````````````` load sessionRefreshToken
  
      let propGlobal =  await serverProps(context,false)

  //```````````````````````set Filter fetch

  //  let urlApi =process.env.NEXT_PUBLIC_CMS_API_URL+"/blog"
   // let urlApi ="http://192.168.100.3:1337/api/blogs"
   let dataFetch={}
   
    
   // console.log("blog url api ",urlApi)
  //`````````````````````Load data Page   
  let urlApi =URL_CMS_API+"/blogs?populate=*"
  logDebug("url Api cms ",urlApi)

    try {
      let urlParamsObject={
        populate:"*"
      }
       

        const response = await fetch(urlApi)
        // let urlApiParam =process.env.NEXT_PUBLIC_CMS_API_URL+"/api/blogs?populate=*"
        // logDebug("url ",urlApiParam)
     
      //const response = await fetchAPICms("/blogs",urlParamsObject)
  
      // console.log("blog res",dataRes.data)
     
    
      if (response.ok) {
        //console.error(response.statusText)
        dataFetch = await response.json()
       // console.log("blog res",dataRes.data)
       // dataFetch = dataRes.data
      }else{
        // console.log("blog res",response)
      }
      //let isError =(dataRes?.data ||res.status == 200 )?false:true
    
      
    } catch (error) {
      console.log("blog error status",error)
      // console.log("blog error status",error.status)
      // console.log("blog error status",error.status)
    }
    
    let propPlus = {dataFetch:dataFetch}
    let props = {...propGlobal.props,...propPlus};

    return {props};

    
  }
  


  
  