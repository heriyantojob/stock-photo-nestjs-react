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
import Title from '../../components/Typography/Title';
import {contributorList,contributorUnlimitedList,statusList} from "./userFormSelectList"
import ExpandMoreCustom from '../../components/collapse/ExpandMore';
import { useNavigate,useSearchParams,useParams } from "react-router-dom";
const UserListFilter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [values, setValues] = useState({
    email: searchParams.get("email"),
    status:searchParams.get("status"),
    contributor:searchParams.get("contributor"),
    contributor_unlimited:searchParams.get("contributor_unlimited"),
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
    
  
      let searhQueryEmail = (data.get('email')) ?  "&email="+ data.get('email'): "email=" 
      let searhQueryStatus = (data.get('status')) ?  "&status="+ data.get('status'): "" 

      let searhQueryContributor = (data.get('contributor')) ?  "&contributor="+ data.get('contributor'): "" 
      let searhQueryContributorUnlimited = (data.get('contributor_unlimited')) ?  "&contributor_unlimited="+ data.get('contributor_unlimited'): ""  
      navigate("/user??page=1"+searhQueryEmail+searhQueryStatus+searhQueryContributor+searhQueryContributorUnlimited);
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
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                size="small"
              />
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
                <InputLabel id="status_label">Status</InputLabel>
                <Select
                  labelId="status_unlimited_label"
                  id="status"
                  name="status"
                  value={values.status}
                  label="Type"
                  size="small"
                  variant="outlined"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                      <em>All Status</em>
                  </MenuItem>
                 
                   {statusList.map((option) => (
                      <MenuItem   key={option.value} value={option.value}> {option.label}</MenuItem>
                    ))}
                      
                  
                </Select>
              </FormControl>

            </Grid>


            <Grid
              item
              md={4}
              xs={12}
            >

            <FormControl fullWidth  >
                <InputLabel id="contributor_label">contributor</InputLabel>
                <Select
                  labelId="contributor_label"
                  id="contributor"
                  name="contributor"
                  value={values.contributor}
                  label="Type"
                  size="small"
                  variant="outlined"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                      <em>All Contributor</em>
                  </MenuItem>
                 
                   {contributorList.map((option) => (
                      <MenuItem   key={option.value} value={option.value}> {option.label}</MenuItem>
                    ))}
                      
                  
                </Select>
              </FormControl>
             
            </Grid>


            <Grid
              item
              md={4}
              xs={12}
            >

              <FormControl fullWidth  >
                <InputLabel id="contributor_unlimited_label">contributor Unlimited</InputLabel>
                <Select
                  labelId="contributor_unlimited_label"
                  id="contributor_unlimited"
                  name="contributor_unlimited"
                  value={values.contributor_unlimited}
                  label="Type"
                  size="small"
                  variant="outlined"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                      <em>All Contributor Unlimited</em>
                  </MenuItem>
                 
                   {contributorUnlimitedList.map((option) => (
                      <MenuItem   key={option.value} value={option.value}> {option.label}</MenuItem>
                    ))}
                      
                  
                </Select>
              </FormControl>
        
            </Grid>


                
              </Grid>
          </CardContent>
      </Collapse>
       
      </Card>
    </Box>   // end form
  );
};


export default UserListFilter
