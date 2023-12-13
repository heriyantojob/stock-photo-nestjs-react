import * as React from 'react';

import { useNavigate } from "react-router-dom";
import Title from '../../components/Typography/Title';
import {
    Paper,Button,Table,TableBody,TableCell,Grid,
    TableContainer, TableHead,TablePagination,TableRow
  } from '@mui/material';

  import {
  
    useParams
  } from "react-router-dom";
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

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';[

]
const rows = [
    { id:1, filePreview: 'Jon',fileDownload: 'Snow', title: "Tes" },
    { id:2, filePreview: 'Jon',fileDownload: 'Snow', title: "Tes" },
  ];

export default function StockList() {

    let { status } = useParams();
    const navigate = useNavigate();
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
    <>
       <Grid container spacing={2}>
            <Grid item xs={8}>
              <Title> Stock  {status}</Title>
            </Grid>
            {/* <Grid item xs={4}  justifyContent="right">
              <Button variant="contained" href={"/stock/"+status+"/add"}   fullWidth={true}>
                Add
              </Button>
            </Grid> */}
          
          </Grid>
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
                          <img
                              src={`https://picsum.photos/id/237/200/300`}
                              srcSet={`https://picsum.photos/id/237/200/300`}
                              alt={"title"}
                              loading="lazy"
                              width={80}
                          />
                            {row.filePreview}
                        </TableCell>
                        <TableCell  align={columns[1].align} >
                            {row.fileDownload}
                        </TableCell>
                        <TableCell  align={columns[2].align}>
                        {row.fileDownload}
                        </TableCell>
                        <TableCell  align={columns[3].align} >
                            <>
                                <Button
                                  onClick={(e) =>{
                                    e.stopPropagation(); // don't select this row after clicking
                                    navigate("/stock/"+status+"/view/"+row.id);
                                  }}
                                  variant="contained"
                                  color="secondary">
                                  < PreviewIcon/>
                                </Button>

                                <Button
                                           sx={{ ml: 1 }}
                                    onClick={(e) =>{
                                    e.stopPropagation(); // don't select this row after clicking
                                    navigate("/stock/"+status+"/edit/"+row.id);
                                    }}
                                    variant="contained"
                                >
                                      <EditIcon></EditIcon>
                                </Button>
                                <Button
                                    sx={{ ml: 1 }}
                        
                                    variant="contained"
                                    color="error"
                                >
                                    <DeleteIcon></DeleteIcon>
                                </Button>
                            </>
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

        <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            count={1000}
            rowsPerPage={10}
            page={pageNow}
            onPageChange={handleChangePage}
            ActionsComponent={(subProps) => {
              const {
                page,
                count,
                rowsPerPage,
                backIconButtonProps,
                nextIconButtonProps,
                showLastButton,
                getItemAriaLabel,
                showFirstButton,
                onPageChange,
                ...restSubProps
              } = subProps;
              return (
                <>
                 <Pagination count={10}  defaultPage={pageNow} onChange={handleChangePage} />
          
                </>
              );
            }}
          />
       
        </Paper>
    </>
   
  );
}