import { Button } from "@mui/material";
import React from "react";
import styles from './Home.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Filter from "../../components/filter/Filter";
import Item from "../../components/item";
import DialogModal from "../../components/dialog";
import { getAllItem, createItem } from '../../services';
import { toast } from 'react-toastify';
import BackdropLoading from "../../components/backDrop";
import { token } from '../../util/getTokenLocal';
import { checkTokenExpirationMiddleware } from "../../util/checkToken";

const Home = () => {
  const [openLoading, setOpenLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [listTodo, setListTodo] = React.useState([]);
  const [listTodoSearch, setListTodoSearch] = React.useState([]);

  const handleFetchData = async () => {
    const res = await getAllItem(token)
    if (res && res.status === 200) {
      if (res.data && res.data.isSuccess === true) {
        const data = res.data.result;
        const arr = data.filter((item) => item.status !== 2)
        setListTodo(arr)
        setOpenLoading(false)
      }
    }
  }

  React.useEffect(() => {
    checkTokenExpirationMiddleware()
    setOpenLoading(true)
    handleFetchData()
  }, [])

  React.useEffect(() => {
    const data = [...listTodo]
    setListTodoSearch(data.reverse())
  }, [listTodo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const setDataForm = async (data) => {
    setOpenLoading(true)
    const res = await createItem(data, token);
    if (res && res.status === 200) {
      handleFetchData()
      setOpen(false);
      toast.success("Your was create success!")
      setOpenLoading(false)
    } else {
      toast.error("Was an err!")
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
      <BackdropLoading openLoading={openLoading} />
    </div>
  )
}

export default Home