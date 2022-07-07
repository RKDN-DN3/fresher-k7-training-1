import { Button } from "@mui/material";
import React, { useEffect } from "react";
import styles from './Home.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Filter from "../../components/filter/Filter";
import Item from "../../components/item";
import DialogModal from "../../components/dialog";
import { useSelector, useDispatch } from 'react-redux'
import { updateData } from "../../store/todoSlice";
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const dataTodo = useSelector((state) => state.todo.data)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(dataTodo)
  }, [dataTodo]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const setDataForm = (data) => {
    dispatch(updateData(data))
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
        <Filter />
      </div>
      <div className={styles.content}>
        {dataTodo?.map((item, i) => {
          return (
            <Item
              key={i}
              item={item}
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