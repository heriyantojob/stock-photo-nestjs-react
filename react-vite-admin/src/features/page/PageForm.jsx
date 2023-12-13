import React,{useState} from 'react'
import {
    Box, Button, Card, CardContent,
    CardHeader, Divider, Grid, TextField,Autocomplete
  } from '@mui/material';
  import languageList from '../language/languageList';
import { Controller } from "react-hook-form";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function PageForm({control,errors,pageData }) {
  const editor = new CKEditor();
    return (
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
                          defaultValue={pageData?.title}
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
                          defaultValue={pageData?.slug}
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
                        
                          data={pageData?.content}
                          onReady={ editor => {
                              // You can store the "editor" and use when it is needed.
                            //  console.log( 'Editor is ready to use!', editor );
                            // setValue("content", pageData.content);
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
                          defaultValue={pageData?.language}
                          
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
    );
    
}

export default PageForm