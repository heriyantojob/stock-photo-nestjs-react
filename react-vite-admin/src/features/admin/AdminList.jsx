import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import Title from '../../components/Typography/Title';
import { useNavigate ,useSearchParams,useParams} from "react-router-dom";
import { useGetAdminQuery } from './adminApiSlice';
import {columns} from './adminTableColumn';



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

  import {
    Paper,Button,Table,TableBody,TableCell,Grid,
    TableContainer, TableHead,TablePagination,TableRow,Pagination,Select,MenuItem
  } from '@mui/material';
  

  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  import PreviewIcon from '@mui/icons-material/Preview';

function AdminList() {

   
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let { status } = useParams();
  const currentPage = (searchParams.get('page'))? parseInt(searchParams.get('page') ) :1

  const [pageNo,setPageNo] = React.useState(currentPage)
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  let  stockQueryParameter= {query:`?page=${currentPage}`}

  //handle event klick, change

  const handleChangePage = (event, newPage) => {

    navigate("/admin?page="+newPage)
   // setPageNow(newPage);
  };


  const {data:dataFetch,
    isLoading,
    isSuccess,
    isError,
    error ,refetch} = useGetAdminQuery(stockQueryParameter)
    // useEffect(() => {
    //   refetch()
    // }, []); // Only re-run the effect if count changes
    let content;
    if (isLoading) content = <PulseLoader color={"#FFF"} />
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }
    React.useEffect(() => {
      refetch()
    }, []); //
    if (isSuccess) {
      content = (
        <>
           <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Title> Admin </Title>
                </Grid>
                <Grid item xs={4}  justifyContent="right">
                  <Button variant="contained" href={"/admin/add"}   fullWidth={true}>
                    Add
                  </Button>
                </Grid>
              
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
                          {column.headerName}
                          </TableCell>
                      ))}
                      </TableRow>
                  </TableHead>
                  <TableBody>
      {/* fetch table */}
                  {dataFetch.data.map((item, i) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                    
                    <TableCell  >
                        {item?.username}
                      </TableCell>
                      <TableCell  >
                        {item?.email}
                      </TableCell>
                      <TableCell  >
                        {item?.name}
                      </TableCell>
                      <TableCell  >
                          <>
                              <Button
                                onClick={(e) =>{
                                  e.stopPropagation(); // don't select this row after clicking
                                  navigate("/admin/view/"+i);
                                }}
                                variant="contained"
                                color="secondary">
                                < PreviewIcon/>
                              </Button>
    
                              <Button
                                        sx={{ ml: 1 }}
                                  onClick={(e) =>{
                                  e.stopPropagation(); // don't select this row after clicking
                                  navigate("/admin/edit/"+item.id_admin);
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
                    
                  ))}
                    
                  </TableBody>
                  </Table>
              </TableContainer>
            
                <Pagination count={dataFetch.meta.pageCount}  defaultPage={pageNo} onChange={handleChangePage} />
              
                page count :{dataFetch.meta.pageCount}
            </Paper>
        </>
       
      );
    
    }
  
    return content
}

export default AdminList