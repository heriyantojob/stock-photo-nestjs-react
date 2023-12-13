import React,{ useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,Collapse, OutlinedInput,InputLabel, Select, MenuItem, FormControl 
} from '@mui/material';
import Title from '../../components/Typography/Title';
import { useNavigate,useSearchParams,useParams } from "react-router-dom";
import ExpandMoreCustom from '../../components/collapse/ExpandMore';
import { typeTemplateList } from './stockFormSelectList';

const StockListFilter = ({searchParams}) => {
  const navigate = useNavigate();

  let { status } = useParams();

  const [expanded, setExpanded] = React.useState(false);
  // console.log(searchParams)

  const [values, setValues] = useState({
    email_user: searchParams.get('email_user'),
    keyword: searchParams.get('keyword'),
    type_template: searchParams.get('type_template')
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
    
    let searhQueryEmailUser = (data.get('email_user')) ?  "&email_user="+ data.get('email_user'): "" 
    let searhQueryKeyword = (data.get('keyword')) ?  "&keyword="+ data.get('keyword'): "" 

    let searhQueryTypeTemplate = (data.get('type_template')) ?  "&type_template="+ data.get('type_template'): "" 
      
    navigate("/stock/"+status+"?page=1"+searhQueryEmailUser+searhQueryKeyword+searhQueryTypeTemplate);
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
                label="Email User"
                name="email_user"
                onChange={handleChange}
                required
                value={values.email_user}
                size="small"
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Keyword"
                name="keyword"
                onChange={handleChange}
                required
                value={values.keyword}
                variant="outlined"
                size="small"
                
              />
            </Grid>

        
            
            <Grid
              item
              md={3}
              xs={12}
            >
              <FormControl fullWidth  >
                <InputLabel id="type_template_label">Type</InputLabel>
                <Select
                  labelId="type_template_label"
                  id="type_template"
                  name="type_template"
                  value={values.type_template}
                  label="Type"
                  size="small"
                  variant="outlined"
                  onChange={handleChange}
                >
                    <MenuItem value="">
                      <em>All Item</em>
                  </MenuItem>
                   {typeTemplateList.map((option) => (
                 
                    <MenuItem   key={option.value} value={option.value}> {option.label}</MenuItem>

                
                  ))}
                  
                  
                </Select>
              </FormControl>
            </Grid>

            
          </Grid>
        </CardContent>

        

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
                    No More
          </CardContent>
      </Collapse>
       
      </Card>
    </Box>   // end form
    
  
  );
};


export default StockListFilter
