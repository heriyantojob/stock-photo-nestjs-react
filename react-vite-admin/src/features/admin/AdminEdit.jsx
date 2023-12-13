import { useState } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import {
  Box, Button, Card, CardContent,
  CardHeader, Divider, Grid, TextField,Autocomplete
} from '@mui/material';
import Title from '../../components/Typography/Title';
import { useGetAdminByIdQuery } from './adminApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import AdminEditForm from './AdminEditForm';
const AdminEdit = () => {
  const navigate = useNavigate();
  let { status,id } = useParams();
  console.log("id "+id)

  const {data:dataFetch,isLoading,
    isSuccess,
    isError,
    error } = useGetAdminByIdQuery({id: id})


    let content
  
    if (isLoading) content = <PulseLoader color={"#FFF"} />
  
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }


  if (isSuccess) {
    content = <AdminEditForm adminData ={dataFetch}/>

  }




  return content
};


export default AdminEdit


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/