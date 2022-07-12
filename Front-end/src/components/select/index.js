import React from 'react'
import { MenuItem, Select as SelectNonOutline } from '@mui/material'
import styles from './Select.module.scss';
const options = [
    { title: 'All', value: 3 },
    { title: 'Unexecuted ', value: 0 },
    { title: 'Done', value: 1 },
]

const Select = (props) => {
    const { setSelected } = props

    return (
        <SelectNonOutline
            value={'selected'}
            className={styles.select}
            renderValue={() => "Quick filters"}
            onChange={setSelected}
        >
            {options?.map((item, i) => (
                <MenuItem
                    key={i}
                    value={item.value}
                >{item.title}</MenuItem>
            ))}
        </SelectNonOutline>
    )
}

export default Select