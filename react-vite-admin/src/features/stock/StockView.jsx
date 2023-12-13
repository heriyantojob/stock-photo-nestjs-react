import { useState } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import {
  Box, Button, Card, CardContent,
  CardHeader, Divider, Grid, TextField,Autocomplete
} from '@mui/material';
import Title from '../../components/Typography/Title';


const StockView = () => {
  const navigate = useNavigate();
  let { status } = useParams();
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
              <Title> Stock {status} Edit</Title>
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
            {/* images */}
            <Grid
              item
              md={3}
              xs={12}
            >
                <div >
                    <img
                            src={`https://picsum.photos/id/237/200/300`}
                            srcSet={`https://picsum.photos/id/237/200/300`}
                            alt={"title"}
                            loading="lazy"
                        />
                 
                </div>
                <div>
                    fileDownload.png 
                </div>
               
            </Grid>
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
                    <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="Title"
                        name="name"
                        onChange={handleChange}
                        required
                        value={values.firstName}
               
                    />
                    </Grid>

                    <Grid
                    item
                    md={12}
                    xs={12}
                    >
                    {/* <TextField
                        fullWidth
                        label="Tags"
                        name="Tags"
                        onChange={handleChange}
                        required
                        value={values.email}
                        variant="outlined"
                    /> */}

                      <Autocomplete
                            multiple
                            id="tags-filled"
                            options={[]}
                            defaultValue={["Tes","Tes"]}
                            freeSolo
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="filled"
                                label="Tags"
                                placeholder="add Tags"
                        
                              />
                            )}
                          />
                    </Grid>

                    <Grid
                    item
                    md={12}
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

            </Grid>    {/* end form input */}
        </Grid>
    
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


export default StockView


/*
https://stackoverflow.com/questions/72152625/how-can-i-convert-text-to-tag-upon-pressing-enter-inside-textfield-mui-in-react
*/