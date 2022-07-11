import React from 'react'
import styles from './Item.module.scss'
import MoreIconDropDown from '../moreIconDropDown';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux'
import { updateData, checkItem, removeTask } from '../../store/todoSlice';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '../dialog';
import moment from 'moment';
import { deleteItem } from '../../services';
import { toast } from 'react-toastify';
import BackdropLoading from '../backDrop';
import { token }from '../../util/getTokenLocal';

const Item = (props) => {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { item } = props;

  const handleDeleteItem = async () => {
    setOpenLoading(true)
    const res = await deleteItem(item.id, token)
    if (res && res.status === 200) {
      props.handleFetchData()
      toast.success("Your was delete success!")
      setOpenLoading(false)
    } else {
      toast.error("Was an err!")
    }
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
    <>
      <div className={styles.item}>
        <div className={styles.left}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.content}>{item.description}</div>
          <div className={styles.time}>{moment(item.endDate).format("MMM Do YY")}</div>
          {props.disableAction === true ?
            '' :
            <div className={styles.actions}>
              <Button
                variant='contained'
                className={item.status === 1 ? styles.btnDone : styles.btnCheck}
                onClick={handleCheckItem}
              >
                {item.status === 1 ? <AutorenewIcon /> : <CheckIcon />}
              </Button>
              {item.status === 1 &&
                <Button
                  variant='contained'
                  className={styles.btnRemove}
                  onClick={() => dispatch(removeTask(item))}
                ><DeleteIcon /></Button>
              }
            </div>
          }
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
      <BackdropLoading openLoading={openLoading} />
    </>
  )
}

export default Item