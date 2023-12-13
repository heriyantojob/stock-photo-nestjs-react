import { useState,useEffect } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
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
import { useInsertPageMutation } from './pageApiSlice';
import { Controller } from "react-hook-form";
import { logDebug } from '../../utils/logDebug';
import AlertError from '../../components/alert/AlertError';
import languageList from '../language/languageList';
import ButtonSubmitLoading from '../../components/form/ButtonSubmitLoading';
import PageFormMeta from './PageFormMeta';
const PageAdd = () => {
  const navigate = useNavigate();
  const [failedSubmit, setFailedSubmit] = useState(null)
 
  const schema = yup.object().shape({
    // title: yup.string().email().required(),
    // decription: yup.string().min(2).required(),
  });
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

  const [insertPage, {
      isLoading,
      isSuccess,
      // dataNewStock,
      isError,
      error
  }] = useInsertPageMutation()
  useEffect(() => {
    register('content')
    // setValue("content")
  })
  const onSubmit = async (dataSubmit) =>{
 
    try {
      
      const result = await insertPage({
        body:{  
          "title": dataSubmit.title,
          "slug": dataSubmit.slug,
          "content": dataSubmit.content,
          "language": dataSubmit.language,
          "meta":{
            "meta_title": dataSubmit.meta_title,
            "meta_description": dataSubmit.meta_description,
          }
        }}).unwrap()
        // navigate('/page')


    } catch (err) {
      //console.log(err);
      let message = err.data?.message;
      setFailedSubmit( message);
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
                <Title> Page Add</Title>
              </Grid>
              <Grid item xs={4}  justifyContent="right">
                <ButtonSubmitLoading isLoading={isLoading} value={"Save"}></ButtonSubmitLoading>
        
              </Grid>
                    
            </Grid>
          </CardContent>
          <Divider />

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
                md={9}
                xs={12}>

                  <Grid
                      container
                      spacing={3}
                  >
                      {/* title */}
                    
                      <Grid
                      item
                      md={12}
                      xs={12}>
                        <label htmlFor="content">Title</label>
                      

                        <Controller
                                name="title"
                                control={control}
                                defaultValue={""}
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
                                defaultValue={""}
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
                              
                                data=""
                                onReady={ editor => {
                                  const dataContent =  editor.getData();
                                  setValue("content", dataContent);
                                } }
                                onChange={ ( event, editor ) => {
                                    const dataContent =  editor.getData();
                                    setValue("content", dataContent);
                                } }
                                onBlur={ ( event, editor ) => {
                              
                                } }
                                onFocus={ ( event, editor ) => {
                              
                                } }
                            />
                      
                        
                      
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                        >
                          <label htmlFor="content">Content</label>

                    
                          <Controller
                                name="language"
                                control={control}
                                
                              render={({ field, formState }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                            
                                  error={!!formState.errors?.status}
                              
                                  // required
                                  select
                                  SelectProps={{ native: true }}
                
                                  variant="outlined"
                                >
                                     <option
                                   
                                      value=""
                                    >
                                      Choose language
                                    </option>
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
          <PageFormMeta control={control}></PageFormMeta>
    
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
  );
};


export default PageAdd


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/