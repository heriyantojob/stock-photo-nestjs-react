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


import DOMPurify from 'isomorphic-dompurify';
import ButtonSubmitLoading from '../../components/form/ButtonSubmitLoading';
import { useNavigate } from 'react-router-dom';

import {adminRoleList,adminStatusList} from "./adminFormSelectList"
import { useInsertAdminMutation } from './adminApiSlice';
import AlertError from '../../components/alert/AlertError';
import AlertSuccess from '../../components/alert/AlertSuccess';


let  isLoading = false;
const AdminAdd = () => {
  const navigate = useNavigate();
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

  const [insertAdmin, {
    isLoading,
    isSuccess,
    // dataNewStock,
    isError,
    error
}] = useInsertAdminMutation()

  const onSubmit = async (dataSubmit) =>{

    try {
      const result = await insertAdmin({body:{  
          "username": dataSubmit.username,
        "email": dataSubmit.email,
        "name": dataSubmit.name,
        "phone": dataSubmit.phone,
        "id_user_verified": null,
        "status": 3,
        "id_admin_role": 1,
        "password": "dsdsdsds"}}).unwrap()
       

        navigate('/admin')


    } catch (err) {
      //console.log(err);
      let message = err.data?.message;
      setFailedSubmit( message);
    }

  }

  let content
  content = (
    <form
      onSubmit={handleSubmit(onSubmit)}
   
    >
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="Admin Add"
        />
    
        <Divider />
                {/* profile User */}
          {isError && <AlertError  message={failedSubmit} />}
  
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
                              defaultValue={""}
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
                              defaultValue={""}
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
                              defaultValue={""}
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
                              defaultValue={""}
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
              md={6}
              xs={12}
            >

                    <Controller
                              name="id_admin_role"
                              control={control}
                   
                            render={({ field, formState }) => (
                                <TextField
                                {...field}
                                label="Role"
                                style={{ width: "100%" }}  
                                select
                                SelectProps={{ native: true }}
                                helperText={errors?.id_admin_role?.message}
                                error={!!errors?.id_admin_role}
                
                                >
                                      {adminRoleList.map((option) => (
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
                              name="status"
                              control={control}
                           
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
                                 {adminStatusList.map((option) => (
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

                    <      Controller
                              name="password"
                              control={control}
                              defaultValue={""}
                             
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
                              defaultValue={""}
                             
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
  return content
};


export default AdminAdd
