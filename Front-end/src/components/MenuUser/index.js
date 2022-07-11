import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom'
import { token } from '../../util/getTokenLocal'
import { useNavigate } from "react-router-dom";

const MenuUser = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        window.localStorage.removeItem('tokenUserLogin');
        navigate("/");
        window.location.reload();
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
                        <MenuItem onClick={handleClose}>
                            <Link
                                to='/register'
                                style={{ color: '#333' }}
                            >Register</Link>
                        </MenuItem>
                        {!token ?
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
        </div>
    )
}

export default MenuUser