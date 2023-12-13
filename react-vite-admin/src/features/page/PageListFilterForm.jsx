import React,{ useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField,Collapse, FormControl, InputLabel, Select, MenuItem
  } from '@mui/material';
  import ExpandMoreCustom from '../../components/collapse/ExpandMore';
  import Title from '../../components/Typography/Title';
  import { useNavigate,useSearchParams,useParams } from "react-router-dom";
import languageList from '../language/languageList';
import { logDebug } from '../../utils/logDebug';

const PageListFilterForm = () => {

        const navigate = useNavigate();
        const [searchParams] = useSearchParams();
        const [expanded, setExpanded] = React.useState(false);

        const [values, setValues] = useState({
          title: searchParams.get("title"),
          slug:searchParams.get("slug"),
          langauge:searchParams.get("langauge"),
        });
      
        const handleChange = (event) => {
          setValues({
            ...values,
            [event.target.name]: event.target.value
          });
        };
      
        const handleSubmit = (event) => {
        
            event.preventDefault();
            const data = new FormData(event.currentTarget);
          
            logDebug(data.get('title'))
            let searhQueryLanguage = (data.get('language')) ?  "&language="+ data.get('language'): "language=" 
            let searhQueryTitle= (data.get('title')) ?  "&title="+ data.get('title'): "" 
      
            let searhQuerySlug = (data.get('slug')) ?  "&slug="+ data.get('slug'): "" 
         
            navigate("/page??page=1"+searhQueryLanguage+searhQueryTitle+searhQuerySlug);
            return
          
        };
  
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Card sx={{ my: 2 }}>
            {/* title */}
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        
                    
                        <Title> 
                            Filter
                            <span>
                            <ExpandMoreCustom
                                expanded={expanded}
                                setExpanded={setExpanded}/>
                            
                            
                            </span>


                        </Title>
                        
                    </Grid>
                    <Grid item xs={4}  justifyContent="right">
                        <Button
                            color="primary"
                            variant="contained"
                            type='submit'
                        >
                            Search
                        </Button>

                        
                    </Grid>
                            
                </Grid>
            </CardContent>
        
            <Divider />
                    {/* profile User */}
            <CardContent>
                <Grid
                container
                spacing={3}
                >
                

                    <Grid
                        item
                        md={3}
                        xs={12}
                    >
                     

                            <TextField
                             
                                  fullWidth
                            
                                  onChange={handleChange}
                                language
                                  // required
                                  name="language"
                                  select
                                  SelectProps={{ native: true }}
                                  value={values.language}
                
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
                    </Grid>

                    
                </Grid>
            </CardContent>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid
                        container
                        spacing={3}>

                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                                <FormControl fullWidth  >
                  
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        value={values.title}
                                        variant="outlined"
                                        size="small"/>
                            
                                </FormControl>

                            </Grid>

                            <Grid
                                item
                                md={4}
                                xs={12}
                            >
                               <FormControl fullWidth  >
                  
                                    <TextField
                                        fullWidth
                                        label="Slug"
                                        name="slug"
                                        onChange={handleChange}
                                        required
                                        value={values.slug}
                                        variant="outlined"
                                        size="small"/>
                            
                                </FormControl>

                            </Grid>

                    

                        
                        </Grid>

                    </CardContent>
                </Collapse>
            
            </Card>
    </Box>   // end formrm
    );
};

export default PageListFilterForm