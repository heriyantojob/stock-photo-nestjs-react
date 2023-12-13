import React from 'react'
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePageMutation} from './pageApiSlice';
function PageListDelete({id}) {
    const [deletePage, {
        isLoading,
        isSuccess,
        // dataNewStock,
        isError,
        error
    }] = useDeletePageMutation()
    const handleDeletePage = async(e) => {
        const id = e.currentTarget.getAttribute("id")
        // alert(id)

        const result = await deletePage({id}).unwrap()
  
      }
  return (
        <Button
            sx={{ ml: 1 }}
            variant="contained"
            color="error"
            onClick={handleDeletePage} id={id}
        >
            <DeleteIcon></DeleteIcon>
        </Button>
  )
}

export default PageListDelete