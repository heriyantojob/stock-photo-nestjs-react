import * as React from 'react';
// import {useRouter} from "next/router";
import { useNavigate } from "react-router-dom";
import { useSearchParams,useParams } from "react-router-dom";
import Title from '../../components/Typography/Title';
import {columns} from './stockTableColumn';
import { useGetStockQuery,usePrefetch } from './stockApiSlice'
import  StockListImageCell from './StockListImageCell'


import {
    Paper,Button,Table,TableBody,TableCell,Grid,
    TableContainer, TableHead,TablePagination,TableRow,Pagination,Select,MenuItem
  } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import PulseLoader from 'react-spinners/PulseLoader'
import StockListFile from './StockListFile';
import StockListFilter from './StockListFilter';

  const statusNumber =(statusName)=>{
    switch(statusName) {
      case "new":
        return 1
        // code block
        break;
      case "review":
        // code block
        return 2

      case "publish": 
        return 3  
        break;


      case "reject": 
        return 4  
        break;
        


      default:
        // code block
    }
  }


  export default function StockList() {
    
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // console.log("searchParams stockList page",searchParams.get('email_user'))
  let { status } = useParams();
  // set user
  const currentPage = (searchParams.get('page'))? parseInt(searchParams.get('page') ) :1
  const searchParamsEmailUser = (searchParams.get('email_user'))? "&email_user="+searchParams.get('email_user')  :""
  const searchParamsKeyword = (searchParams.get('keyword'))? "&keyword="+searchParams.get('keyword')  :""
  const searchParamsType_template= (searchParams.get('type_template'))? "&type_template="+searchParams.get('type_template')  :""
  const searchParamsStatus = (status)? "&status="+statusNumber(status)  :""
  const filterParams = searchParamsEmailUser+searchParamsKeyword+searchParamsType_template
  
  // let searchParamsDefault = `?page=${currentPage}`
  let  stockUploadParameter= {query:`?page=${currentPage}${searchParamsStatus}${filterParams}`}

  //set UseState
  const [pageNo,setPageNo] = React.useState(currentPage)

  const handleChangePage = (event, newPage) => {
    navigate("/stock/"+status+"?page="+newPage+filterParams)
    // navigate("/stock/"+status+"?page="+newPage+filterParams)
   // setPageNow(newPage);
  };

  const {data:dataFetch,
          isLoading,
          isSuccess,
          isError,
          error,refetch } = useGetStockQuery(stockUploadParameter)

          React.useEffect(() => {
            refetch()
          }, []); // Only re-run the effect if count changes
  let content;
  if (isLoading) content = <PulseLoader color={"#FFF"} />
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }
  if (isSuccess) {
    content = (
      <>
      <div style={{ height: 400, width: '100%' }}>
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
            <StockListFilter searchParams={searchParams}/>
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
    {/* fetch table */}
                {dataFetch.data.map((item, i) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <TableCell>
                      <div   width={80}>
                        <StockListImageCell item={item} width={80}/>
                      </div>
                
                      
                    </TableCell>
                    <TableCell >
                        <StockListFile item={item.templateFileList}/>
                    </TableCell>

                    <TableCell  >
                      {item?.type_template}
                    </TableCell>
                    <TableCell  >
                      {item?.user.email}
                    </TableCell>
                    <TableCell  >
                      {item?.title}
                    </TableCell>
                    <TableCell  align={columns[3].align} >
                        <>
                            <Button
                              onClick={(e) =>{
                                e.stopPropagation(); // don't select this row after clicking
                                navigate("/stock/"+status+"/view/"+i);
                              }}
                              variant="contained"
                              color="secondary">
                              < PreviewIcon/>
                            </Button>

                            <Button
                                      sx={{ ml: 1 }}
                                onClick={(e) =>{
                                e.stopPropagation(); // don't select this row after clicking
                                navigate("/stock/"+status+"/edit/"+item.id_template);
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
      
      </>
     
    );
  
  }


  return content
}