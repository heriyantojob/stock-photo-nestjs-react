// import { store } from '../../store/store'
// import { stockApiSlice } from '../stock/stockApiSlice'

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        // store.dispatch(stockApiSlice.util.prefetch('getStock', 'stockList', { force: true }))
       //store.dispatch(stockApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))

    //    console.log('subscribing')
    //    const stock = store.dispatch(stockApiSlice.endpoints.getStock.initiate())


    //    return () => {
    //        console.log('unsubscribing')
    //        stock.unsubscribe()
        
    //    }
    }, [])

    return <Outlet />
}
export default Prefetch


// https://redux-toolkit.js.org/rtk-query/usage/prefetching