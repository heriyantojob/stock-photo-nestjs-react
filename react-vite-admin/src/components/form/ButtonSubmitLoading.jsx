import React from 'react'
import {
    Box, Button, Card, CardContent,
    CardHeader, Divider, Grid, TextField,Autocomplete ,TextareaAutosize,Alert
  } from '@mui/material';

function ButtonSubmitLoading({isLoading,value}) {
    if(isLoading){
        return (   <Button
      
            variant="contained"
            type="submit"
            disabled
            >
             Loading
          </Button>)
    }else{
      return (   
        <Button
        color="primary"
        variant="contained"
        type="submit"
      
        
        >
         {value}
      </Button>
      )


     
    }
  
}

export default ButtonSubmitLoading