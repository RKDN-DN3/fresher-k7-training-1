import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Information from '../Information';

const MenuUser = () => {
    const isLogin = localStorage.getItem("isLogin");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const navigate = useNavigate();


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('tokenUserLogin');
        window.localStorage.removeItem('isLogin');
        window.localStorage.removeItem('userName');
        navigate("/");
        window.location.reload();
    }

    const handleClickShowInfo = () => {
        setOpenInfoDialog(true)
        setAnchorEl(null);
    }

    return (
        <div>
            {true && (
                <div>
                    <IconButton
                        size="large"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {!isLogin &&
                            <MenuItem onClick={handleClose}>
                                <Link
                                    to='/register'
                                    style={{ color: '#333' }}
                                >Register</Link>
                            </MenuItem>
                        }
                        {isLogin &&
                            <MenuItem onClick={handleClickShowInfo}>
                                Information
                            </MenuItem>
                        }
                        {!isLogin ?
                            <MenuItem onClick={handleClose}>
                                <Link
                                    to='/login'
                                    style={{ color: '#333' }}
                                >Login</Link>
                            </MenuItem>
                            :
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        }

                    </Menu>
                </div>
            )}
            <Information
                open={openInfoDialog}
                setOpen={setOpenInfoDialog}
            />
        </div>
    )
}

export default MenuUser