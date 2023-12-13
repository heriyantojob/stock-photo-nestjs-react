import React from 'react'
import {
    Collapse,Alert
  } from '@mui/material';
  import IconButton from '@mui/material/IconButton';
  import CloseIcon from '@mui/icons-material/Close';
import AlertCustom from './AlertCustom';
export default function AlertError({message}) {

  return (
    <AlertCustom message={message} severity="error"></AlertCustom>
    )

}
