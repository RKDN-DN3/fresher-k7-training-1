import TextField from '../textField'
import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import styles from './Filter.module.scss'
import Select from '../select'

const Filter = ({ listTodo, setListTodoSearch }) => {

    const [valueInput, setValueInput] = React.useState('')

    const handleChange = (e) => {
        if (e.target.value) {
            setValueInput(e.target.value)
            let matchingStrings = [];
            listTodo.forEach((list) => {
                console.log(`${list.title}${list.des}}`)
                if (`${list.title}${list.des}}${list.endTime}`.toLocaleLowerCase().search(valueInput.toLocaleLowerCase()) > -1) {
                    matchingStrings.push(list)
                }
            })
            setListTodoSearch(matchingStrings)
        } else {
            setListTodoSearch(listTodo)
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.optionFilter}>
                <FilterAltIcon />
                <Select />
            </div>
            <div className={styles.search}>
                <TextField
                    variant="outlined"
                    value={valueInput}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Filter