import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {STOCK_LIST} from "./stockVariable"
// import { useAddStockUploadNewMutation } from './stockApiSlice';
import { useRouter } from 'next/router'


function StockSearch({stock}) {
    const router = useRouter()

    // const { stock } = router.query
    const stockListItems = STOCK_LIST.map((stockName) =>
    
        <StockListItem key={stockName} stockName={stockName} stock={stock} ></StockListItem>
    );

   
    //form upload
    const validationSchema = Yup.object().shape({
     

    
      });
      const formOptions = { resolver: yupResolver(validationSchema),  
        defaultValues: {
            stockType: stock,
            search: router.query.keyword
      } };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState ,setError,setValue} = useForm(formOptions);
      const { errors } = formState;
    
      const  onSubmit = async (dataSubmit)=> {
  
        router.push("/stock/"+dataSubmit.stockType+"?keyword="+dataSubmit.search);
     

      }
      useEffect(() => {
        if(!router.query.keyword) {
          return;
        }
        setValue('search', router.query.keyword);
        
      }, [router.query.keyword])
  
  return (
    
    <form  onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'  >
              

        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div className="card-body">
            
                <div className="flex flex-col md:flex-row max-w-screen-lg">
                    <div className="basis-full md:flex-none ">  
                        <select className="select w-full max-w-xs" {...register('stockType')} name='stockType'>
                            {stockListItems}
                           
                        </select>
                    </div>
                
                    <div className="basis-full  md:flex-auto">  
                                <div className="form-control w-full  px-2">
                                    <input type="text" {...register('search')} placeholder="Search" className="input input-bordered input-primary w-full " />
                                </div>
                    </div>
                    <div className="basis-full md:flex-none ">
                                <input type={"submit"} className="btn btn-primary" value={"Search"} />
                    </div>

                       {/* end is loading button */}
         
                
                  
                </div>

                {/* <div>
                    <div className='basis-full w-full '>
                        <progress className="progress progress-primary w-56" value={progress} max={100} />
                        {progress}%

                    </div>
                </div>
                     */}
            

                
            </div>
            </div>

        {/* end card form */}
    </form>
  )
}
function StockListItem({stockName,stock}) {
    let option = (stock==stockName)?  <option key={stockName} selected>{stockName} </option>:
                                    <option key={stockName} >{stockName}</option>;
    
    return option
   
  }
export default StockSearch