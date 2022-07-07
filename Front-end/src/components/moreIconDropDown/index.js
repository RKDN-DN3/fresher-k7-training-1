import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ClickAwayListener, MenuItem, Popper, Typography } from '@mui/material';
import styles from './MoreIconDropDown.module.scss'
const MoreIconDropDown = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { id, onClick} = props;
    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClickAway = () => {
        setAnchorEl(false);
    };
    const open = Boolean(anchorEl);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={styles.container}>
                <MoreVertIcon onClick={handleClick} />
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                >
                    <div  className={styles.popperContent}>
                        <MenuItem>
                            <Typography>Edit</Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={onClick}
                        >
                            <Typography>Remove</Typography>
                        </MenuItem>
                    </div>
                </Popper>
            </div>
        </ClickAwayListener>

    )
}

export default MoreIconDropDown