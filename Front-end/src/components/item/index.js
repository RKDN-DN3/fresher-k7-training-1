import React from 'react'
import styles from './Item.module.scss'
import MoreIconDropDown from '../moreIconDropDown';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux'
import { deleteItem, updateData, checkItem, removeTask } from '../../store/todoSlice';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '../dialog'

const Item = (props) => {

  const [openDialog, setOpenDialog] = React.useState(false);

  const dispatch = useDispatch();

  const { item } = props;

  const handleDeleteItem = () => {
    dispatch(deleteItem(item))
  }

  const handleEditItem = () => {
    setOpenDialog(true)
  }

  const setDataForm = (data) => {
    dispatch(updateData({ data, type: 'edit' }))
  }

  const handleCheckItem = () => {
    dispatch(checkItem(item))
  }

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.content}>{item.des}</div>
        <div className={styles.time}>{item.endTime}</div>
        <div className={styles.actions}>
          <Button
            variant='contained'
            className={item.status === 1 ? styles.btnDone : styles.btnCheck}
            onClick={handleCheckItem}
          >
            {item.status === 1 ? <AutorenewIcon/> : <CheckIcon />}
          </Button>
          {item.status === 1 &&
            <Button
              variant='contained'
              className={styles.btnRemove}
              onClick={() => dispatch(removeTask(item))}
            ><DeleteIcon/></Button>
          }
        </div>
      </div>
      <div className={styles.right}>
        <MoreIconDropDown
          onClick={handleDeleteItem}
          onClickEdit={handleEditItem}
        />
      </div>
      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        item={openDialog && item}
        setDataForm={setDataForm}
      />
    </div>
  )
}

export default Item