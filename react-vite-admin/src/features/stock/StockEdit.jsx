import { useState } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import {
  Box, Button, Card, CardContent,
  CardHeader, Divider, Grid, TextField,Autocomplete
} from '@mui/material';
import Title from '../../components/Typography/Title';
import { useGetStockByIdQuery } from './stockApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import StockEditForm from './StockEditForm';
const StockEdit = () => {
  const navigate = useNavigate();
  let { status,id } = useParams();
  const {data:dataFetch,isLoading,
    isSuccess,
    isError,
    error } = useGetStockByIdQuery({id: id})

    let content
  
    if (isLoading) content = <PulseLoader color={"#FFF"} />
  
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }

  
  if (isSuccess) {
    // content = <div>{JSON.stringify(dataFetch)}</div>

    content = <StockEditForm stockData ={dataFetch}/>
    
  

  }




  return content
};


export default StockEdit


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/