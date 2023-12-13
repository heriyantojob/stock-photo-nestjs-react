import { useState } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import {
  Box, Button, Card, CardContent,
  CardHeader, Divider, Grid, TextField,Autocomplete ,TextareaAutosize,Alert
} from '@mui/material';

import Title from '../../components/Typography/Title';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Controller } from "react-hook-form";
import { useUpdateStockMutation } from './stockApiSlice';


import DOMPurify from 'isomorphic-dompurify';
import ButtonSubmitLoading from '../../components/form/ButtonSubmitLoading';
import StockListImageCell from './StockListImageCell';
import StockListFile from './StockListFile';
import AlertSuccess from '../../components/alert/AlertSuccess';
const listStatus = [
  {
    value: 1,
    label: 'New'
  },
  {
    value: 2,
    label: 'review'
  },
  {
    value: 3,
    label: 'Publish'
  },
  {
    value: 4,
    label: 'Reject'
  }
];
const schema = yup.object().shape({
  // title: yup.string().email().required(),
  // decription: yup.string().min(2).required(),
});

const StockEditForm = ({stockData}) => {
  const navigate = useNavigate();
  let { status,id } = useParams();
//   console.log("id "+id)
  let defaultValueTitle = (stockData?.title)?stockData.title:""
  let defaultValueTags = (stockData?.tags)?stockData.tags:[]
  let defaultValueDescription = (stockData?.description)?stockData.description:""
  const [failedSubmit, setFailedSubmit] = useState(null)
  const [successSubmit, setSuccessSubmit] = useState(null)

    let content

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().min(2).required(),
      // tags: yup.string().required(),
    });

    const {
      handleSubmit,
      formState: { errors },
      control
    } = useForm({
      resolver: yupResolver(schema)
    });
  
    const [updateStock, {
      isLoading,
      isSuccess,
      // dataNewStock,
      isError,
      error
  }] = useUpdateStockMutation()

    const onSubmit = async (dataSubmit) =>{
      
      // alert(dataSubmit)

      try {
        const result = await updateStock({body:{ title:dataSubmit?.title,
                                                  description: dataSubmit?.description ,
                                                  status:dataSubmit?.status,
                                                  tags:dataSubmit?.tags
                                                },
                                                id:id
                                          }
                                          ).unwrap()

        setSuccessSubmit("Stock being update")
        setFailedSubmit("");
      } catch (err) {
        //console.log(err);
        let message = err.data?.message;
        if(Array.isArray(message)){
          const cleanHTML = DOMPurify.sanitize(err.data?.message.join("<br/>"), {
            USE_PROFILES: { html: true },
          });
          setFailedSubmit(cleanHTML );
          // message =   err.data?.message.join("<br/>")
        }else{
          setFailedSubmit( message);
        }
        setSuccessSubmit("")
      }

        
    }


  

    content =     <form
    // autoComplete="off"
    
    onSubmit={handleSubmit(onSubmit)}
 
  >
    <Card>
    
      {/* title */}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Title> Stock {status} Edit</Title>
          </Grid>
          <Grid item xs={4}  justifyContent="right">
            <ButtonSubmitLoading isLoading={isLoading} value={"Save"}></ButtonSubmitLoading>
          {/* <ButtonSubmitLoading isLoading={isLoading}></ButtonSubmitLoading> */}
          
          
          </Grid>
                
        </Grid>
      </CardContent>
      <Divider />
              {/* profile User */}
              {isSuccess && <AlertSuccess message={successSubmit} />}

              {isError && <Alert severity="error">{failedSubmit}</Alert>}
      <CardContent>

      <Grid
          container
          spacing={3}
        >
          {/* images */}
          <Grid
            item
            md={3}
            xs={12}
          >
              <StockListImageCell item={stockData} width={100}/>
              <StockListFile item={stockData?.templateFileList}/>
         
             
          </Grid>
          {/* form input */}
          <Grid
            item
            md={9}
            xs={12}>
              <Box ml={2} >

                <Grid
                    container
                    spacing={3}
                >
                    {/* title */}
                    <Grid
                    item
                    md={12}
                    xs={12}>
                      {/* <TextField
                          fullWidth
                          helperText="Please specify the first name"
                          label="Title"
                          name="name"
                          onChange={handleChange}
                          required
                          value={values.title} /> */}
                      <Controller
                          name="title"
                          control={control}
                          defaultValue={stockData?.title}
                        render={({ field, formState }) => (
                            <TextField
                            {...field}
                            label="Title"
                            style={{ width: "100%" }}  
                            // onChange={handleChange}
                            // value={values.title} 
                            helperText={errors?.title?.message}
                            error={!!errors?.title}
            
                            />
                        )}
                    
                   
                        />
                      

                  
                    </Grid>
                    {/* Tags */}
                    <Grid
                    item
                    md={12}
                    xs={12}
                    >
             
                    

                    < Controller
                      name="tags"
                      defaultValue={defaultValueTags}
                      control={control}
             
                      // defaultValue={stockData?.tags}
         
                        render={({ field, formState })=> (
                            <Autocomplete
                                
                                multiple
                             
                                options={[]}
                                value={field.value} 
                                freeSolo
                                // helperText={errors?.tags?.message}
                                // error={!!errors?.tags}
                                // {...field}
                                onChange={(_, data) => field.onChange(data)}
                                renderInput={(params) => (
                                  <TextField
                                   
                                    {...params}
                                    variant="filled"
                                    label="Tags"
                                    placeholder="add Tags"
                          
                                
                            
                                  />
                                )}
                              />
                        )}
                      
                        />

                   
                    </Grid>
                    {/* status */}

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >

                         <Controller
                          name="status"
                          control={control}
                          defaultValue={stockData?.status}
                        render={({ field, formState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Status"
                            error={!!formState.errors?.status}
                        
                            // required
                            select
                            SelectProps={{ native: true }}
          
                            variant="outlined"
                          >
                            {listStatus.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        )}
                        />
                      
                      </Grid>

                    {/* decription */}

                    <Grid
                    item
                    md={12}
                    xs={12}
                    >
                      <Controller
                            name="description"
                            control={control}
           
                            defaultValue={defaultValueDescription}
                            render={({ field, formState }) => (

                          <TextareaAutosize
                                
                                {...field}
                                fullWidth
                                aria-label="minimum height"
                                minRows={3}
                                placeholder="Minimum 3 rows"
                                style={{ width: 200 }}
                                helperText={errors?.description?.message}
                                error={!!errors?.description}
                                // onChange={handleChange}
                                // value={values.decription}
                                variant="outlined"
                              />
                          
                        )}
                  
                        />
                        
                    </Grid>
                  

              
                </Grid>

              </Box>

          

          </Grid>    {/* end form input */}
      </Grid>
  
      </CardContent>


      <Divider />
      {/* password */}
 
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <ButtonSubmitLoading isLoading={isLoading} value={"Save"}></ButtonSubmitLoading>
      </Box>
    </Card>
  </form>
  






  return content
};


export default StockEditForm


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
https://github.com/react-hook-form/react-hook-form/discussions/3365
react hook form
https://stackoverflow.com/questions/67253940/react-hook-form-using-controller-yup-and-material-ui-validation-issue
*/