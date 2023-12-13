import * as React from 'react';
// import {useRouter} from "next/router";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import PulseLoader from 'react-spinners/PulseLoader'
import Title from '../../components/Typography/Title';
import {
    Paper,Button,Table,TableBody,TableCell,Grid,
    TableContainer, TableHead,TablePagination,TableRow,Pagination,Select,MenuItem
  } from '@mui/material';

  import {
  
    useParams
  } from "react-router-dom";
  import PageListFilterForm from "./PageListFilterForm";


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';[]
import { useGetPageQuery} from './pageApiSlice';
import {columns} from './pageTableColumn';
import { languageListGetLabel } from '../language/languageList';
import PageListDelete from './PageListDelete';


  export default function PageList() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let { status } = useParams();
    const currentPage = (searchParams.get('page'))? parseInt(searchParams.get('page') ) :1
    const [pageNo,setPageNo] = React.useState(currentPage)
    const searchParamsLanguage = (searchParams.get('language'))? "&language="+searchParams.get('language')  :""
    const searchParamsTitle = (searchParams.get('title'))? "&title="+searchParams.get('title')  :""
    const searchParamsSlug = (searchParams.get('slug'))? "&slug="+searchParams.get('slug')  :""

    let  PageParameter= {query:`?page=${currentPage}${searchParamsLanguage}${searchParamsTitle}${searchParamsSlug}`}

    const handleChangePage = (event, newPage) => {

      navigate("/page?page="+newPage)
    // setPageNow(newPage);
    };


    let  stockQueryParameter= {query:`?page=${currentPage}`}
    const {data:dataFetch,
      isLoading,
      isSuccess,
      isError,
      error ,refetch} = useGetPageQuery(PageParameter)



    let content;
         
    if (isLoading) content = <PulseLoader color={"#FFF"} />
    if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
  

      content = (
        <div style={{ height: 400, width: '100%' }}>
          <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Title> Page list</Title>
                </Grid>
                <Grid item xs={4}  justifyContent="right">
                  <Button variant="contained" href={"/page/add"}   fullWidth={true}>
                    Add
                  </Button>
                </Grid>
              
            </Grid>
            <PageListFilterForm ></PageListFilterForm>
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
                {dataFetch.data.map((item, i) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i} >
                      
                        <TableCell  >
                            {item?.title}
                        </TableCell>
                        <TableCell  >
                          {item?.slug}
                        </TableCell>
                        <TableCell  >
                         {item?.language} ({languageListGetLabel(item?.language)})
                        </TableCell>
                    
                  
                    
                        <TableCell  >
                            <>
                                {/* <Button
                                  onClick={(e) =>{
                                    e.stopPropagation(); // don't select this row after clicking
                                    navigate("/user/view/"+i);
                                  }}
                                  variant="contained"
                                  color="secondary">
                                  < PreviewIcon/>
                                </Button> */}
      
                                <Button
                                          sx={{ ml: 1 }}
                                    onClick={(e) =>{
                                    e.stopPropagation(); // don't select this row after clicking
                                    navigate("/page/edit/"+item?.id_page);
                                    }}
                                    variant="contained"
                                >
                                      <EditIcon></EditIcon>
                                </Button>
                                <PageListDelete id={item?.id_page}></PageListDelete>
                                {/* <Button
                                    sx={{ ml: 1 }}
                        
                                    variant="contained"
                                    color="error"
                                    onClick={deletePage} id={item?.id_page}
                                >
                                    <DeleteIcon></DeleteIcon>
                                </Button> */}
                            </>
                        </TableCell>
                    
                      </TableRow>
                      
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
              {/* <Pagination count={10}  defaultPage={pageNow} onChange={handleChangePage} />
          
                  */}
             <Pagination count={dataFetch.meta.pageCount}  defaultPage={pageNo} onChange={handleChangePage} />
               
              page count :{dataFetch.meta.pageCount} 
            </Paper>
        </div>
      
      
      );
    }
    return content
}