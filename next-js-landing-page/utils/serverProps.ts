

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getTranslations } from "./getTranslations";
import { URL_APP } from "../config/url";
//
// Here we use middleware to augment the `req` with the user from passport.js
// to pass to the page
// src: https://github.com/hoangvvo/next-connect/tree/21c9c73fe3746e66033fd51e2aa01d479e267ad6#runreq-res

//req.isNotRedirect = true dont move to home
const serverProps   = async ( context ,isRedirectLogin=true,namespaceLang=[]) => {

    let sessionRefresh=null
   // const locale =  context.locale; 
    //const cookies = parseCookies(context.req);
    
   // let urlFetch = `${process.env.NEXT_PUBLIC_ENV_BASE_URL_API}/auth/refresh`
    let urlFetch = `${URL_APP}/auth/refresh`
    const refreshResponse = await fetch(urlFetch, {
        credentials: 'include',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "cookie": context?.req?.headers?.cookie 
           // "cookie": context?.req?.cookies 
            //"cookie": cookies
          },
   })

   if (refreshResponse.status===200) {
        const refreshData= await refreshResponse.json()
        sessionRefresh={accessToken:refreshData.accessToken,username : refreshData.username,email :refreshData.email}
    //return { props:{sessionRefresh:sessionRefresh} };
    
   }else{
        if(isRedirectLogin){
            return {
                redirect: {
                destination: '/login',
                permanent: false,
                },
            }
        }

   }
   //  if(!context.req.isNotRedirect){
   
//    const translations =  await serverSideTranslations(locale?? 'en', [
//     'common','navbar'
//     ])
    let translation = await getTranslations( context.locale,namespaceLang)

    return {
        props: {
            sessionRefresh,
          ...translation,
        },
    };

};

export default serverProps;