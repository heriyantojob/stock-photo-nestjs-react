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
import Title from '../../components/Typography/Title';
const statusList = [
  {
    value: '0',
    label: 'no  active'
  },
  {
    value: '1',
    label: 'active'
  },
  {
    value: '2',
    label: 'Block'
  }
];

const UserView= () => {
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
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
        {/* title */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Title> User Edit</Title>
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
          >
            <Grid
              item
              md={6}
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
              md={6}
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
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
    
  
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Status"
                name="status"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {statusList.map((option) => (
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


export default UserView
