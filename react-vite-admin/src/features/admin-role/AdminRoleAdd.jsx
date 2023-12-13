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

const AdminRoleAdd = () => {
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
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="Admin Role Add"
        />
    
        <Divider />
                {/* profile User */}
        <CardContent>
          <Grid
            container
            spacing={3}
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
              md={12}
            
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


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default AdminRoleAdd
