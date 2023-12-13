import React from 'react';
import { usePagination, DOTS } from './usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
   
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="btn-group">
       <button className="btn"    onClick={onPrevious}>«</button>
    
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key ={pageNumber}>&#8230;</li>;
        }
        let pageActive= ""
        if(pageNumber===currentPage) pageActive =" btn-active "

        return (
          <button key ={pageNumber} className={"btn "+pageActive} onClick={() => onPageChange(pageNumber)}> {pageNumber}</button>
          // <li
            
          //   onClick={() => onPageChange(pageNumber)}
          // >
          //   {pageNumber}
          // </li>
        );
      })}
  
      <button onClick={onNext} className="btn">»</button>
    </div>
  );
};

export default Pagination;