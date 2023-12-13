import { useState,useEffect } from 'react';

import {
  Box, Button, Card, CardContent,
  CardHeader, Divider, Grid, TextField,Autocomplete
} from '@mui/material';
import Title from '../../components/Typography/Title';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Label } from 'recharts';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useInsertPageMutation, useUpdatePageMutation } from './pageApiSlice';
import { Controller } from "react-hook-form";
import { logDebug } from '../../utils/logDebug';
import AlertError from '../../components/alert/AlertError';
import languageList from '../language/languageList';
import { useNavigate ,useParams} from "react-router-dom";

import ButtonSubmitLoading from '../../components/form/ButtonSubmitLoading';

import AlertSuccess from '../../components/alert/AlertSuccess';
import PageFormMeta from './PageFormMeta';



const PageEditForm = ({pageData}) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [successSubmit, setSuccessSubmit] = useState(null)
  const [failedSubmit, setFailedSubmit] = useState(null)
 
  const schema = yup.object().shape({
    // title: yup.string().email().required(),
    // decription: yup.string().min(2).required(),
  });
  let defaultValue = pageData?.data?.page;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  });
  const editor = new CKEditor();

  const [updatePage, {
      isLoading,
      isSuccess,
      // dataNewStock,
      isError,
      error
  }] = useUpdatePageMutation()
  useEffect(() => {
    register('content')
    setValue("content", defaultValue?.content);
  })
  const onSubmit = async (dataSubmit) =>{
    logDebug(dataSubmit.meta_title)

    try {
      
      const result = await updatePage({body:{  
          "title": dataSubmit.title,
          "slug": dataSubmit.slug,
          "content": dataSubmit.content,
          "language": dataSubmit.language,
          "meta":{
            "meta_title": dataSubmit.meta_title,
            "meta_description": dataSubmit.meta_description,
          }
          
        },id:id}).unwrap()
       
   
        // navigate('/page')
        setSuccessSubmit(result.message)


    } catch (err) {

      //console.log(err);
      // alert("Gagal")
      let message = err.data?.message;
      setFailedSubmit( message);
      setSuccessSubmit( "");
      setValue("content", dataSubmit.content);
    }

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
   
      <Card>
        {/* title */}

        
       
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Title> Page Edit</Title>
            </Grid>
            <Grid item xs={4}  justifyContent="right">
          
                <ButtonSubmitLoading isLoading={isLoading} value={"Save"}></ButtonSubmitLoading>
      
            </Grid>
                  
          </Grid>
        </CardContent>
         <Divider />
          {isSuccess && <AlertSuccess message={successSubmit} />}
          {isError && <AlertError  message={failedSubmit} />}
                {/* profile User */}
        <CardContent>

          <Grid
              container
              spacing={3}
            >
              {/* images */}

              {/* form input */}
              <Grid
                item
                md={12}
                xs={12}>

                  <Grid
                      container
                      spacing={3}
                  >

                      <Grid
                      item
                      md={12}
                      xs={12}>
                        <label htmlFor="content">Title</label>
                      

                        <Controller
                                name="title"
                                control={control}
                                defaultValue={defaultValue?.title}
                                render={({ field, formState }) => (
                                  <TextField
                                  {...field}
                                  style={{ width: "100%" }}  
                                  // onChange={handleChange}
                                  // value={values.title} 
                                  helperText={errors?.title?.message}
                                  error={!!errors?.title}
                  
                                  />
                              )}/>
                      </Grid>
                    {/* slug */}

                    <Grid
                      item
                      md={12}
                      xs={12}>
                          <label htmlFor="content">Slug</label>
                          <Controller
                                name="slug"
                                control={control}
                                defaultValue={defaultValue?.slug}
                                render={({ field, formState }) => (
                                  <TextField
                                  {...field}
                                  style={{ width: "100%" }}  
                                  // onChange={handleChange}
                                  // value={values.title} 
                                  helperText={errors?.slug?.message}
                                  error={!!errors?.slug}
                  
                                  />
                              )}/>
                      </Grid>
          
                      <Grid
                        item
                        md={12}
                        xs={12}
                        >
                          <label htmlFor="content">Content</label>

                    
                            <CKEditor
                          
                                editor={ ClassicEditor }
                              
                                data={defaultValue?.content}
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                  //  console.log( 'Editor is ready to use!', editor );
                                  setValue("content", defaultValue?.content);
                                } }
                                onChange={ ( event, editor ) => {
                                    const dataContent =  editor.getData();
                                    //console.log( { event, editor, data } );

                                    //logDebug({ event, editor, dataContent })
                                    // register("text", data);
                                    
                                    setValue("content", dataContent);
                                    // setTextValue(data);
                                } }
                                onBlur={ ( event, editor ) => {
                                    //console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                  //  console.log( 'Focus.', editor );
                                } }
                            />
                      
                        
                      
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                        >
                          <label htmlFor="content">language</label>

                    
                          <Controller
                                name="language"
                                control={control}
                                defaultValue={defaultValue?.language}
                                
                              render={({ field, formState }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                            
                                  error={!!formState.errors?.language}
                              
                                  // required
                                  select
                                
                                  SelectProps={{ native: true }}
                
                                  variant="outlined"
                                >
                                  {languageList.map((option) => (
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


                    

                
                  </Grid>

              </Grid>    {/* end form input */}
          </Grid>

          <Divider></Divider>
          <PageFormMeta control={control} errors={errors} defaultValuePageMeta={pageData?.data?.page_meta}></PageFormMeta>
        </CardContent>


        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >

         
   
          <ButtonSubmitLoading isLoading={isLoading} value={"Save Draft"}  errors={errors}>

                
          </ButtonSubmitLoading>

        
        
        </Box>
      </Card>
    </form>
  );
};


export default PageEditForm


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/