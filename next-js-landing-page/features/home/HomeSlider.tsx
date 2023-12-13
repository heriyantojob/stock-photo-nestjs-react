import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles  from "./HomeSlider.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
      >
     <SwiperSlide className={styles.swiperSlide}> 
          <Image
            alt="Mountains"
            src={"https://picsum.photos/1000/300?random=1"}
            width={1000}
            height={300}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          </SwiperSlide>
        <SwiperSlide>          
          <Image
            alt="Mountains"
            src={"https://picsum.photos/1000/300?random=2"}
            width={1000}
            height={300}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>

        <SwiperSlide>          
          <Image
            alt="Mountains"
            src={"https://picsum.photos/1000/300?random=3"}
            width={1000}
            height={300}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
