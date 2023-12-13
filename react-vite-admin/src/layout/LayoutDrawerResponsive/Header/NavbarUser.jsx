import React from 'react'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppBar from './AppBar';
import { Link } from "react-router-dom";
import { useSendLogoutMutation } from '../../../features/auth/authApiSlice'
import { useNavigate } from "react-router-dom";
function NavbarUser() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    // const handleChange = (event) => {
    //   setAuth(event.target.checked);
    // };
  
    const [sendLogout, {
      isLoading,
      isSuccess,
      isError,
      error
  }] = useSendLogoutMutation()


    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const  handleLogout = async ()=>{
        await sendLogout()
        navigate('/login');
      
   
    }
  return (
    <div>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >

      <Link  to={"profile"} style={{ textDecoration: 'none' }}> 
        <MenuItem onClick={handleClose} >Profile</MenuItem>
      </Link>
  
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </div>

  )
}

export default NavbarUser