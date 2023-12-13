import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Title from '../../components/Typography/Title';
import {
  Paper,Button,Table,TableBody,TableCell,Grid,
  TableContainer, TableHead,TablePagination,TableRow,Pagination,Select,MenuItem
} from '@mui/material'; 

import { useNavigate ,useSearchParams,useParams} from "react-router-dom";
import PulseLoader from 'react-spinners/PulseLoader'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import {columns} from './userTableColumn';
import { useGetUserQuery } from './userApiSlice';
import UserListFilter from './UserListFilter';

function UserListStatus({status}){
  let content = null
  if(status==0){
    content = "non Active"

  }else if(status==1){
    content = "Active"
  }else if(status==2){
    content =  "Block"
  }
  return content

}

function UserList() {

    let content;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let { status } = useParams();
    const currentPage = (searchParams.get('page'))? parseInt(searchParams.get('page') ) :1
    
    const searchParamsEmail = (searchParams.get('email'))? "&email="+searchParams.get('email')  :""
    const searchParamsStatus = (searchParams.get('status'))? "&status="+searchParams.get('status')  :""
    const searchParamsContributor= (searchParams.get('contributor'))? "&contributor="+searchParams.get('contributor')  :""
    const searchParamsContributorUnlimited= (searchParams.get('contributor_unlimited'))? "&contributor_unlimited="+searchParams.get('contributor_unlimited')  :""
    const [pageNo,setPageNo] = React.useState(currentPage)
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    let  stockQueryParameter= {query:`?page=${currentPage}`+searchParamsEmail+searchParamsStatus+searchParamsContributor+searchParamsContributorUnlimited}
    const {data:dataFetch,
      isLoading,
      isSuccess,
      isError,
      error ,refetch} = useGetUserQuery(stockQueryParameter)

      //handle event klick, change     
    const handleChangePage = (event, newPage) => {

      navigate("/user?page="+newPage+searchParamsEmail+searchParamsStatus+searchParamsContributor+searchParamsContributorUnlimited)
    // setPageNow(newPage);
    };
    React.useEffect(() => {
      refetch()
    }, []); //
    
      
    if (isLoading) content = <PulseLoader color={"#FFF"} />
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
      content  = (
        <div style={{ height: 400, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Title> Users</Title>
            </Grid>
            <Grid item xs={4}  justifyContent="right">
              <Button variant="contained" href="/admin/add"   fullWidth={true}>
                Add
              </Button>
            </Grid>
          
          </Grid>
       
          <UserListFilter></UserListFilter>
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
                          {item?.contributor=="1"?(
                            <>
                              Contributor{" "} {item?.contributor_unlimited=="1" && "Unlimited"} 
                            </>
                           
                          ):"Non Contributor"}
                          {/* {item?.contributor} */}
                          {/* {item?.contributor_unlimited} */}
                        </TableCell>
                        <TableCell  >
                          <UserListStatus status={item?.status}></UserListStatus>
                        </TableCell>
                    
                        <TableCell  >
                            <>
                                <Button
                                  onClick={(e) =>{
                                    e.stopPropagation(); // don't select this row after clicking
                                    navigate("/user/view/"+i);
                                  }}
                                  variant="contained"
                                  color="secondary">
                                  < PreviewIcon/>
                                </Button>
      
                                <Button
                                          sx={{ ml: 1 }}
                                    onClick={(e) =>{
                                    e.stopPropagation(); // don't select this row after clicking
                                    navigate("/user/edit/"+item?.id_user);
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

            

        
      
         
        </div>
      );
    }
    return content
}

export default UserList