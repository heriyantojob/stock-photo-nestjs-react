import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export const apiUrlDefault =    process.env.NEXT_PUBLIC_CMS_API_URL
export const apiUrlCms =    process.env.NEXT_PUBLIC_CMS_API_URL 
export const apiUrlCmsApi =    process.env.NEXT_PUBLIC_CMS_API_URL+"/api"  
export const apiUrlUpload =    process.env.NEXT_PUBLIC_CMS_API_URL+"/uploads"  
export function getApiUrl(path = "",url = apiUrlDefault) {

  return url+path
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {},url = apiUrlDefault) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getApiUrl(
    `${path}${queryString ? `?${queryString}` : ""}`,
    url
  )}`
  
  // console.log("requestUrl",path)
  // console.log("requestUrl",requestUrl)


  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)
  return response
  // Handle response
  // if (!response.ok) {
  //   //console.error(response.statusText)
  //   throw new Error(`An error occurred please try again`)
  // }
  const data = await response.json()
  return data
}


export async function fetchAPICms(path, urlParamsObject = {}, options = {}) {
  let cmsStrapiUrl  =process.env.NEXT_PUBLIC_CMS_API_URL 
  return fetchAPI("/blogs",urlParamsObject,options,apiUrlCmsApi)
}