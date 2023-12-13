import React,{ useState } from 'react';
import { useNavigate ,useParams} from "react-router-dom";

import Title from '../../components/Typography/Title';
import { useGetUserByIdQuery } from './userApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import UserEditForm from './UserEditForm';
const UserEdit = () => {
  const navigate = useNavigate();
  let { id } = useParams();


  const {data:dataFetch,isLoading,
    isSuccess,
    isError,
    error,refetch } = useGetUserByIdQuery({id: id})

    React.useEffect(() => {
      refetch()
    }, []); //
    
    let content
  
    if (isLoading) content = <PulseLoader color={"#FFF"} />
  
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }


  if (isSuccess) {
    content = <UserEditForm userData ={dataFetch}/>

  }




  return content
};


export default UserEdit


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/