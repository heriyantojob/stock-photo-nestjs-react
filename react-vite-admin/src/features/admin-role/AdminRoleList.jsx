import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Title from '../../components/Typography/Title';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'NAME', width: 130 },
    { field: 'description', headerName: 'DESCRIPTION', width: 130 },

 
    { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
        const navigate = useNavigate();
      return (
        <>
          <Button
            onClick={(e) =>{
              e.stopPropagation(); // don't select this row after clicking
              navigate("/admin-role/edit/"+params.id);
            }}
            variant="contained"
          >
            <EditIcon/>
          </Button>
          <Button
            sx={{ ml: 2 }}
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
            color="error"
          >
            <DeleteIcon/>
          </Button>
        </>
      
      )
    }}
  
  ];
  
  const rows = [
    { id:1,  name: "Tes" ,description:"tesddssdds " },
    { id:2,  name: "Tes" ,description:"tesddssdds " },
  ];
  // const navigate = useNavigate();
  // function handleClick() {
  //   navigate("/home");
  // }
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    // alert("masuk")
    // navigate("/admin/edit/1");
    //do whatever you want with the row
  };



function AdminRoleList() {
   
   
    
    return (
        <div style={{ height: 400, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Title> Admin Role</Title>
            </Grid>
            <Grid item xs={4}  justifyContent="right">
              <Button variant="contained" href="/admin-role/add"   fullWidth={true}>
                Add
              </Button>
            </Grid>
          
          </Grid>
        
            <DataGrid
              sx={{ my: 2 }}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
        
         
        </div>
      );
}

export default AdminRoleList