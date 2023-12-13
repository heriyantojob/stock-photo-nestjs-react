import React from 'react'
import {
    Box, Button, Card, CardContent,
    CardHeader, Divider, Grid, TextField,Autocomplete ,TextareaAutosize,Alert
  } from '@mui/material';
  import { Controller } from "react-hook-form";
function ButtonSubmitLoadingValue({isLoading,value,control}) {
    if(isLoading){
        return (  
          
     
              <Button
        
                variant="contained"
   
                disabled
                >
                Loading
              </Button>
        
        )
    }else{
      return (  
        
        <Controller
          name="submit"
          control={control}
          defaultValue={value}
          render={({ field, formState }) => (
            <Button
              {...field}
              color="primary"
              variant="contained"
              type="submit"
              >
              {value}
            </Button>
          )}/>
      
      )


     
    }
  
}

export default ButtonSubmitLoadingValue