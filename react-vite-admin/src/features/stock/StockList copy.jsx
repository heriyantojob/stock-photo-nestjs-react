import * as React from 'react';
// import {useRouter} from "next/router";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Title from '../../components/Typography/Title';
import {
    Paper,Button,Table,TableBody,TableCell,Grid,
    TableContainer, TableHead,TablePagination,TableRow,Pagination,Select,MenuItem
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
    { id:1, filePreview: 'a',fileDownload: 'a', title: "Tes" },
    { id:2, filePreview: 'v',fileDownload: 'b', title: "Tes" },
  
    { id:3, filePreview: 'c',fileDownload: 'c', title: "Tes" },
    { id:4, filePreview: 'd',fileDownload: 'd', title: "Tes" },
    
    { id:5, filePreview: 'e',fileDownload: 'e', title: "Tes" },
    { id:6, filePreview: 'f',fileDownload: 'f', title: "Tes" },
  ];

export default function StockList() {
  // const router = useRouter();
  // console.log(router.query.page)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    console.log("searchParams",searchParams.get('page')); 
    let { status } = useParams();

    let page =(searchParams.get('page'))? parseInt(searchParams.get('page')) -1:0;
    console.log("current page "+page)
 

  const [pageNow, setPageNow] = React.useState(page);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  
  const handleChangePage = (event, newPage) => {
    console.log("newPage ",newPage)
    navigate("/stock/"+status+"?page="+newPage)
   // setPageNow(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("handleChangeRowsPerPage ",event.target.value)
    setRowsPerPage(+event.target.value);
    setPageNow(0);
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
                .slice(pageNow * rowsPerPage, pageNow * rowsPerPage + rowsPerPage)
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
            rowsPerPageOptions={[2,10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={pageNow}
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
                  <Select
                    size="small"
                    onChange={(e) => handleChangePage(e, e.target.value)}
                    value={pageNow}
                    MenuProps={{
                      PaperProps: { sx: { maxHeight: 360 } }
                    }}
                    >
                    <MenuItem id={1} key={1} value={1}>{1}</MenuItem>
                    <MenuItem id={2} key={2} value={2}>{2}</MenuItem>
                    <MenuItem id={3} key={3} value={3}>{3}</MenuItem>
                  </Select>
                </>
              );
            }}
          />
       
         
        </Paper>
    </>
   
  );
}