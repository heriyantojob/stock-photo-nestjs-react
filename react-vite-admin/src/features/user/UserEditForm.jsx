import { useState } from 'react';
import {
    Box, Button, Card, CardContent,
    CardHeader, Divider, Grid, TextField,Autocomplete ,TextareaAutosize,Alert
  } from '@mui/material';
  //form Import
  
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { Controller } from "react-hook-form";
  import { useNavigate ,useParams} from "react-router-dom";
import DOMPurify from 'isomorphic-dompurify';
import ButtonSubmitLoading from '../../components/form/ButtonSubmitLoading';

import {contributorList,contributorUnlimitedList,statusList} from "./userFormSelectList"
import Title from '../../components/Typography/Title';
import { useUpdateUserMutation } from './userApiSlice';
import AlertError from '../../components/alert/AlertError';
import AlertSuccess from '../../components/alert/AlertSuccess';


const UserEditForm = ({userData}) => {
    let { id } = useParams();

  const [successSubmit, setSuccessSubmit] = useState(null)

  const [failedSubmit, setFailedSubmit] = useState(null)

  const schema = yup.object().shape({
    // title: yup.string().email().required(),
    // decription: yup.string().min(2).required(),
  });
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useUpdateUserMutation()

  const onSubmit = async (dataSubmit) =>{
    console.log("data submit ",dataSubmit)
    try {
        const result = await updateUser(
            {body:{  
              "username": dataSubmit.username,
              "email": dataSubmit.email,
              "name": dataSubmit.name,
              "phone": dataSubmit.phone,
              "status": dataSubmit.status,
              "password": dataSubmit.password,
              "contributor":  dataSubmit.contributor,
              "contributor_unlimited":  dataSubmit.contributor_unlimited,
          
              
            },id:id
        }).unwrap()
  
      
        setSuccessSubmit(result.message)
        setFailedSubmit( "");
  
      } catch (err) {
        //console.log(err);
        let message = err.data?.message;
        setFailedSubmit(message );
        setSuccessSubmit( "");
      
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
              <Title> User Edit</Title>
            </Grid>
            <Grid item xs={4}  justifyContent="right">
                <ButtonSubmitLoading isLoading={isLoading} value={"Save"}></ButtonSubmitLoading>
        
            </Grid>
                      
          </Grid>
        </CardContent>
    
        <Divider />

                {/* profile User */}
                {isError && <AlertError  message={failedSubmit} ></AlertError>}
         {isSuccess && <AlertSuccess message={successSubmit} />}
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

                <Controller
                    name="name"
                    control={control}
                    defaultValue={userData.name}
                    render={({ field, formState }) => (
                        <TextField
                        {...field}
                        label="Name"
                        style={{ width: "100%" }}  
                        // onChange={handleChange}
                        // value={values.title} 
                        helperText={errors?.name?.message}
                        error={!!errors?.name}
        
                        />
                    )}/>
          
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
             <Controller
                name="email"
                control={control}
                defaultValue={userData.email}
                render={({ field, formState }) => (
                    <TextField
                    {...field}
                    label="Email Address"
                    style={{ width: "100%" }}  
                    // onChange={handleChange}
                    // value={values.title} 
                    type="email"
                    helperText={errors?.email?.message}
                    error={!!errors?.email}
    
                    />
                )}/>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
             <Controller
                name="username"
                control={control}
                defaultValue={userData.username}
                render={({ field, formState }) => (
                    <TextField
                    {...field}
                    label="Username"
                    style={{ width: "100%" }}  
                    // onChange={handleChange}
                    // value={values.title} 
                    helperText={errors?.email?.message}
                    error={!!errors?.email}

                    />
                )}/>
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
                <Controller
                              name="phone"
                              control={control}
                              defaultValue={userData.phone}
                            render={({ field, formState }) => (
                                <TextField
                                {...field}
                                label="Phone"
                                style={{ width: "100%" }}  
                                // onChange={handleChange}
                                // value={values.title} 
                                helperText={errors?.phone?.message}
                                error={!!errors?.phone}
                
                                />
                            )}/>
            </Grid>
    
  
            <Grid
              item
              m d={6}
              xs={12}
            >
                <Controller
                              name="status"
                              control={control}
                              defaultValue={userData.status}
                           
                            render={({ field, formState }) => (
                                <TextField
                                {...field}
                                label="status"
                                style={{ width: "100%" }}  
                                select
                                SelectProps={{ native: true }}
                                helperText={errors?.status?.message}
                                error={!!errors?.status}
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
                            )}/>
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >

                <Controller
                              name="contributor"
                              control={control}
                              defaultValue={userData.contributor}
                           
                            render={({ field, formState }) => (
                                <TextField
                                {...field}
                                label="Contributor"
                                style={{ width: "100%" }}  
                                select
                                SelectProps={{ native: true }}
                                helperText={errors?.contributor?.message}
                                error={!!errors?.contributor}
                                variant="outlined"
                                >
                                 {contributorList.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            )}/>
             
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >

                  <Controller
                              name="contributor_unlimited"
                              control={control}
                              defaultValue={userData.contributor_unlimited}
                           
                            render={({ field, formState }) => (
                                <TextField
                                {...field}
                                label="Contributor Unlimited"
                                style={{ width: "100%" }}  
                                select
                                SelectProps={{ native: true }}
                                helperText={errors?.contributor_unlimited?.message}
                                error={!!errors?.contributor_unlimited}
                                variant="outlined"
                                >
                                 {contributorUnlimitedList.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            )}/>
           
            </Grid>
            
          </Grid>
        </CardContent>


        <Divider />
        {/* password */}
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
                <   Controller
                              name="password"
                              control={control}
                            
                             
                            render={({ field, formState }) => (
                                <TextField
                                {...field}
                                type="password"
                                label="New Password"
                                style={{ width: "100%" }}  
                                // onChange={handleChange}
                                // value={values.title} 
                                helperText={errors?.password?.message}
                                error={!!errors?.password}
                
                                />
                            )}/>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
                < Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, formState }) => (
                        <TextField
                        {...field}
                        type="password"
                        label="Confirm Password"
                        style={{ width: "100%" }}  
                        // onChange={handleChange}
                        // value={values.title} 
                        helperText={errors?.confirmPassword?.message}
                        error={!!errors?.confirmPassword}
        
                        />
                    )}/>
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
         <ButtonSubmitLoading isLoading={isLoading} value={"Save"}></ButtonSubmitLoading>
        
        </Box>
      </Card>
    </form>
  );
};


export default UserEditForm
