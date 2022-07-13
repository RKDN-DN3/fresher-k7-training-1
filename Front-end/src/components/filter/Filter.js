import TextField from '../textField'
import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import styles from './Filter.module.scss'
import Select from '../select'
import moment from 'moment'
const Filter = ({ listTodo, setListTodoSearch }) => {

    const [valueInput, setValueInput] = React.useState('')

    const handleChange = (e) => {
        if (e.target.value) {
            setValueInput(e.target.value)
            let matchingStrings = [];
            listTodo.forEach((list) => {
                const startDate = moment(list.startDate).format('MM/DD/YYYY');
                const ednDate = moment(list.endDate).format('MM/DD/YYYY');
                if (`${list.title}${list.des}}${startDate}${ednDate}`.toLocaleLowerCase().search(valueInput.toLocaleLowerCase()) > -1) {
                    matchingStrings.push(list)
                }
            })
            setListTodoSearch(matchingStrings)
        } else {
            setListTodoSearch(listTodo)
        }
    }

    const setSelected = (e) => {
        if (e.target.value === 3) {
            setListTodoSearch(listTodo)
        } else {
            let copyArr = [...listTodo]
            copyArr = listTodo.filter((item) => item.status === e.target.value);
            setListTodoSearch(copyArr)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.optionFilter}>
                <FilterAltIcon />
                <Select
                    setSelected={setSelected}
                />
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