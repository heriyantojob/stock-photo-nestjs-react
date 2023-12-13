import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from 'react-daisyui'
import StockList from '../../features/stock/StockList'
import StockSearch from '../../features/stock/StockSearch'
function StockDetail() {
    const router = useRouter()
    const { username } = router.query
    return (
      <>
        {/* user */}
      <div className="flex flex-col  place-items-center">
          {/* { username } */}

              {/* user */}
              <div className='flex flex-row mt-2 max-w-screen-md'>
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          {/* <img src="https://placeimg.com/192/192/people" /> */}

                          <Image
                            alt="Mountains"
                            src={"https://placeimg.com/192/192/people"}
                            width={192}
                            height={192}
                            sizes="100vw"
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                            />
                        </div>
                      </div>
                      <div className='ml-4 flex flex-col'>
                        <div>
                          username
                        </div>
                        <div>
                          
                          <Button className='btn btn-primary btn-xs'>Follow</Button>
                        </div>
                        
                      </div>

              </div>
              <div className='mt-2 max-w-screen-md'>
              I have a passion for all the good in life: exploring new places, camping, endless road trips, meeting new people and living in Berlin. Capturing these beautiful places, memories and emotions with my camera, is what brings me the greatest joy.
              </div>
        </div>
        {/* <div>
          <StockSearch stock="image" ></StockSearch>
          <StockList  stock="image" ></StockList>
        </div> */}



      </>
     
 
    
      
    )
}

export default StockDetail

/*
https://www.hyperui.dev/components/ecommerce/products

*/