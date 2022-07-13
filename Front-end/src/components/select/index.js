import React from 'react'
import { MenuItem, Select as SelectNonOutline } from '@mui/material'
import styles from './Select.module.scss';

let options = [
    { title: 'All', value: 4 },
    { title: 'Unexecuted ', value: 0, home: true },
    { title: 'Done', value: 1, home: true },
    { title: 'Out date', value: 3 },
    { title: 'Already done', value: 2 }
]

const Select = (props) => {
    const { setSelected } = props;

    return (
        <SelectNonOutline
            value={'selected'}
            className={styles.select}
            renderValue={() => "Quick filters"}
            onChange={setSelected}
        >
            {options?.map((item, i) => {
                return (
                    <MenuItem
                        key={i}
                        value={item.value}
                    >{item.title}</MenuItem>
                )
            })}
        </SelectNonOutline>
    )
}

export default Select