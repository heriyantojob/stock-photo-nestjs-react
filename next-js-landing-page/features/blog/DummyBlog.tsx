import React from 'react'
import Image from 'next/image'


function DummyBlog() {
  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl lg:px-8">

    <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
            Blog
        </h1>
        <p className="mt-3 text-gray-500">
            Blogs that are loved by the community. Updated every hour.
        </p>
    </div>

    <div className="mt-12 grid gap-1 sm:grid-cols-2 lg:grid-cols-4 z-0">
        <div className="card  bg-base-100 shadow-xl z-0 ">
            <figure>
                <Image src="https://picsum.photos/1000/300?random=1" width={100} height={100} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                Shoes!
                <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
        
    
                       
    </div>
  

</section>
  )
}

export default DummyBlog