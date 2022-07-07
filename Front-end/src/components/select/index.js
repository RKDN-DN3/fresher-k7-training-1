import React from 'react'
import { MenuItem, Select as SelectNonOutline } from '@mui/material'
import styles from './Select.module.scss'
const Select = () => {
    return (
        <SelectNonOutline
            value={'tien tran'}
            className={styles.select}
            renderValue={() => "Quick filters"}
        >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </SelectNonOutline>
    )
}

export default Select