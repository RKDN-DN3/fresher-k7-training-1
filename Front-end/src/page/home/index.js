import { Button } from "@mui/material";
import React from "react";
import styles from './Home.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Filter from "../../components/filter/Filter";
import Item from "../../components/item";
import DialogModal from "../../components/dialog";
import { getAllItem, createItem } from '../../services';

const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW51c2VyIiwidXNlcklkIjoiMzA4NTBkYzctODg5My00NGU5LWEzZjYtMDY5MGFiNmIwNWM5Iiwicm9sZSI6IkFkbWluIiwiZXhwIjoxNjU3NTI1NjMxLCJpc3MiOiJIb3RlbExpc3RpbmdBUEkifQ.zhiHpJeEOkd6MIyYQbIRpw6eZCxf-nG8OHwnzyrr-R76-xJoi0X49bYHS90eH2PpweCJ-ZuzmRlkkcCsaNbi9A'

const Home = () => {

  const [open, setOpen] = React.useState(false);
  const [listTodo, setListTodo] = React.useState([]);
  const [listTodoSearch, setListTodoSearch] = React.useState([]);

  const handleFetchData = async () => {
    const res = await getAllItem(token)
    if (res && res.status === 200) {
      if (res.data && res.data.isSuccess === true) {
        const object = res.data.result
        setListTodo(object)
        console.log(object)
      }
    }
  }

  React.useEffect(() => {
    handleFetchData()
  }, [])

  React.useEffect(() => {
    setListTodoSearch([...listTodo].reverse())
  }, [listTodo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const setDataForm = async (data) => {
    const res = await createItem(data, token);
    if (res && res.status === 200) {
      handleFetchData()
      setOpen(false);
    } 
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>List Todo today</h4>
        <div className={styles.actions}>
          <MoreVertIcon />
          <Button
            variant="contained"
            className={styles.btnHeader}
            onClick={handleClickOpen}
          >
            New ToDo
          </Button>
        </div>
      </div>
      <div className={styles.filter}>
        <Filter
          listTodo={listTodo && listTodo}
          setListTodoSearch={setListTodoSearch}
        />
      </div>
      <div className={styles.content}>
        {listTodoSearch?.map((item, i) => {
          if (item.status === 2) {
            listTodoSearch.splice(i, 1)
          }
          return (
            <Item
              key={i}
              item={item}
              handleFetchData={handleFetchData}
            />
          )
        })}
      </div>
      <DialogModal
        open={open}
        setOpen={setOpen}
        setDataForm={setDataForm}
      />
    </div>
  )
}

export default Home