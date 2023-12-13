import React from 'react'
import Image from 'next/image'
import { apiUrlCms, fetchAPICms } from '../../utils/apiFetch';
import { URL_CMS, URL_CMS_API, URL_CMS_UPLOAD } from '../../config/url';

function BlogList({dataFetch}) {
    let content
  content = (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl text-gray-800 font-semibold">
                Blog
            </h1>
            <p className="mt-3 text-gray-500">
                Blogs that are loved by the community. Updated every hour.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dataFetch?.data?.map((item, i) => (
                <BlogCard imageUrl={item?.attributes?.cover?.data?.attributes?.formats?.small?.url } 
                                    title={item?.attributes?.title} 
                                    date="April 12, 2023" />
               
        
            ))}
          </div>
       
        


      


    </section>
  )
  return content
}

const BlogCard = ({ imageUrl, title, date }) => {
    const imageUrlCheck = typeof imageUrl !== 'undefined' ? URL_CMS+imageUrl : '';
    //const imageUrlCheck = "https://picsum.photos/200/300"

    return (
      <div className="card p-6">
        {imageUrlCheck && (
          <Image src={imageUrlCheck} alt={title}  
                
          loader={() => imageUrlCheck} 
          
          width={200}
          height={300}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }} />

        )}
          
                
        
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {/* <p>{URL_CMS+imageUrlCheck}</p> */}
        <p className="text-gray-500 mb-4">{date}</p>
       
        <button className="btn btn-primary">Read More</button>
      </div>
    );
  };

export default BlogList