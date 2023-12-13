import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import AdminRoleEditTable from './AdminRoleEditTable';
import Title from '../../components/Typography/Title';
const states = [
  {
    value: 'super Admin',
    label: 'super Admin'
  },
  {
    value: 'admin',
    label: 'admin'
  },
  {
    value: 'Editor',
    label: 'Editor'
  }
];

const AdminRoleEdit = () => {
  const [values, setValues] = useState({
    name: 'Katarina',
    decription: 'Smith',

  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
   
    >

      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Card   style={{width: '100%' }}>
     

            <CardContent>
                <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Title> Admin Role Edit</Title>
                </Grid>
                <Grid item xs={4}  justifyContent="right">
                  <Button
                      color="primary"
                      variant="contained"
                    >
                      Save details
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
                lg={12}
              >
                <Grid
                  item
            
                  xs={12}
                >
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                
                >
                  <TextField
                    fullWidth
                    label="Decription"
                    name="decription"
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
          
              </Grid>
            </CardContent>


            <Divider />

            <AdminRoleEditTable></AdminRoleEditTable>
     
          </Card>

        </div>
      </div>
      
      <Box display="inline-block">

     
      </Box>
 
    </form>
  );
};


export default AdminRoleEdit
