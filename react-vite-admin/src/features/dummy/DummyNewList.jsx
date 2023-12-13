import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import {Button} from '@mui/material';

const columns = [

  { id: 'filePreview', label: 'File Preview', minWidth: 170 }, //0
  { id: 'fileDownload', label: 'File Download', minWidth: 100 },//1

  {
    id: 'title',
    label: 'title',
    minWidth: 170,
    align: 'right',
  },//2
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },//3
];

function createData(id,filePreview, fileDownload) {
  const density = population / size;
  return { id,filePreview, fileDownload, title };
}

const rows = [
    { id:1, filePreview: 'Jon',fileDownload: 'Snow', title: "Tes" },
    { id:2, filePreview: 'Jon',fileDownload: 'Snow', title: "Tes" },
  ];

export default function StockNewList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align={columns[0].align}>
                        {row.filePreview}
                    </TableCell>
                    <TableCell  align={columns[1].align} >
                        {row.fileDownload}
                    </TableCell>
                    <TableCell  align={columns[2].align}>
                    {row.fileDownload}
                    </TableCell>
                    <TableCell  align={columns[3].align} >
                        column.id
                    </TableCell>
                 
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}