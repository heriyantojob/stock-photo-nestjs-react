import React from 'react'

function LayoutError({ statusCode, message}) {
  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">{statusCode}</h1>
                <p className="py-6">
                    {message}
                </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
            </div>
        </div>
    </div>
  )
}

export default LayoutError