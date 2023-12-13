import React,{useState} from 'react'
import {
    Button,  Grid, TextField,Collapse, TextareaAutosize
} from '@mui/material';

import { Controller } from "react-hook-form";
import ExpandMoreCustom from '../../components/collapse/ExpandMore';

function PageFormMeta({control,errors ,defaultValuePageMeta}) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!expanded);
  };
  
  return (

    <div>
  
      <div>
           <h2>Meta          <span>  <ExpandMoreCustom  expanded={expanded} setExpanded={setExpanded}/>    </span></h2>
      </div>

     

          



      <Collapse in={expanded}>

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
                        <label htmlFor="content">Meta Title</label>
                      

                        <Controller
                                name="meta_title"
                                control={control}
                                defaultValue={defaultValuePageMeta?.meta_title}
                                render={({ field, formState }) => (
                                  <TextField
                                  {...field}
                                  style={{ width: "100%" }}  
                                  // onChange={handleChange}
                                  // value={values.title} 
                                  helperText={errors?.title?.meta_title}
                                  error={!!errors?.meta_title}
                  
                                  />
                              )}/>
                      </Grid>
                    {/* slug */}

                
                  </Grid>

                  <Grid
                      container
                      spacing={3}
                  >

                      <Grid
                        item
                        md={12}
                        xs={12}>

                        <label htmlFor="content">Meta description</label>
                      
                        <Controller
                              name="meta_description"
                              control={control}
                              defaultValue={defaultValuePageMeta?.meta_description}
                              render={({ field, formState }) => (
                                <TextareaAutosize
                                  {...field}
                                  style={{ width: "100%" }}  
                                  TextareaAutosize
                                  helperText={errors?.title?.meta_description}
                                  error={!!errors?.meta_description}
                                />
                            )
                        }/>
                      </Grid>
                    {/* slug */}

              
                    

                
                  </Grid>


              </Grid>    {/* end form input */}
          </Grid>
 
      </Collapse>



   

  </div>
    
  )
}

export default PageFormMeta