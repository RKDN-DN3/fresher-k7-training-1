import TextField from '../textField'
import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import styles from './Filter.module.scss'
import Select from '../select'

const Filter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.optionFilter}>
                <FilterAltIcon />
                <Select/>
            </div>
            <div className={styles.search}>
                <TextField  variant="outlined"/>
            </div>
        </div>
    )
}

export default Filter