import React from 'react'
import {
    Collapse,Alert
  } from '@mui/material';
  import IconButton from '@mui/material/IconButton';
  import CloseIcon from '@mui/icons-material/Close';
  
import DOMPurify from 'isomorphic-dompurify';
export default function AlertCustom({message,severity}) {
   const [open,setOpen] = React.useState(true)
    if(Array.isArray(message)){
        // message.join("<br/>"
         message = DOMPurify.sanitize(message.join("<br/>"), {
            USE_PROFILES: { html: true },
          })
        // setFailedSubmit(cleanHTML );
   
      }
  return (
    <Collapse in={open}>
        <Alert severity={severity}    action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}  
                > 
            <div 
                dangerouslySetInnerHTML={{__html: message}}
              />
        </Alert>
  
    </Collapse>
    )

}
