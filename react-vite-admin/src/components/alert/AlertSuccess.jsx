import React from 'react'
import {
    Collapse,Alert
  } from '@mui/material';
  import IconButton from '@mui/material/IconButton';
  import CloseIcon from '@mui/icons-material/Close';
import AlertCustom from './AlertCustom';
export default function AlertSuccess({message}) {
  
  return (
    <AlertCustom message={message} severity="success"></AlertCustom>
    )

}
