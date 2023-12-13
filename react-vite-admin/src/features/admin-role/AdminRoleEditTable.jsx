import * as React from 'react';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
} from '@mui/material';
function createData(menu,view, add,edit, deleteData) {
  return { menu, view, add, edit, deleteData };
}

const rows = [
  createData('Frozen yoghurt', 1, 1, 1,1),
  createData('Frozen yoghurt', 1, 1, 1,1),
  createData('Frozen yoghurt', 1, 1, 1,1),

];
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function AdminRoleEditTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Menu</TableCell>
            <TableCell align="right">Vew</TableCell>
            <TableCell align="right">Add</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.menu}
              </TableCell>
              <TableCell align="right"><Checkbox {...label} defaultChecked /></TableCell>
              <TableCell align="right">    <Checkbox {...label} /></TableCell>
              <TableCell align="right">{row.edit}</TableCell>
          
              <TableCell align="right">{row.deleteData}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}