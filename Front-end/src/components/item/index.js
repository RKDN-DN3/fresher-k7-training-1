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
const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW51c2VyIiwidXNlcklkIjoiMzA4NTBkYzctODg5My00NGU5LWEzZjYtMDY5MGFiNmIwNWM5Iiwicm9sZSI6IkFkbWluIiwiZXhwIjoxNjU3NTI1NjMxLCJpc3MiOiJIb3RlbExpc3RpbmdBUEkifQ.zhiHpJeEOkd6MIyYQbIRpw6eZCxf-nG8OHwnzyrr-R76-xJoi0X49bYHS90eH2PpweCJ-ZuzmRlkkcCsaNbi9A'
const Item = (props) => {

  const [openDialog, setOpenDialog] = React.useState(false);

  const dispatch = useDispatch();

  const { item } = props;

  const handleDeleteItem = async () => {
    const res = await deleteItem(item.id, token)
    if (res && res.status === 200) {
      props.handleFetchData()
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
  )
}

export default Item