import { useState } from 'react';
import { useNavigate ,useParams} from "react-router-dom";

import Title from '../../components/Typography/Title';
import { useGetPageByIdQuery } from './pageApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import PageEditForm from './PageEditForm';
const PageEdit = () => {
  const navigate = useNavigate();
  let { id } = useParams();


  const {data:dataFetch,isLoading,
    isSuccess,
    isError,
    error } = useGetPageByIdQuery({id: id})

    // console.log("dataFetch user",dataFetch)
    let content
  
    if (isLoading) content = <PulseLoader color={"#FFF"} />
  
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }


    if (isSuccess &&  dataFetch) {
      content = <PageEditForm pageData ={dataFetch}/>
    }

  return content
};


export default PageEdit


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/