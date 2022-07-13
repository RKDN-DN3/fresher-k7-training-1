import React from 'react'
import styles from './Item.module.scss'
import MoreIconDropDown from '../moreIconDropDown';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '../dialog';
import moment from 'moment';
import { deleteItem, editItem } from '../../services';
import { toast } from 'react-toastify';
import BackdropLoading from '../backDrop';
import { token } from '../../util/getTokenLocal';
import ButtonIconLoading from '../buttonIconLoading';
import { checkDateToDoOutDate } from '../../util/checkDateToDoOutDate';
import clsx from 'clsx'

const Item = (props) => {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);
  const [openIconLoading, setOpenIconLoading] = React.useState(false);

  const { item } = props;

  React.useEffect(() => {
    if (item.status !== 3) {
      const fetchItemOutDate = async () => {
        const data = await checkDateToDoOutDate(item);
        data.status = 3;
        const res = await editItem(data, token);
        if (res && res.status === 200) {
          toast.warning("Was todo out date!")
        } else {
          toast.error("Was an err!")
        }
      }
      fetchItemOutDate()
    }
  }, [item]);

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

  const setDataForm = async (data) => {
    setOpenLoading(true)
    const res = await editItem(data, token)
    if (res && res.status === 200) {
      props.handleFetchData()
      toast.success("Your was edit success!")
      setOpenLoading(false)
      setOpenDialog(false)
    } else {
      toast.error("Was an err!")
    }
  }

  const handleStatusItem = async () => {
    setOpenIconLoading(true)
    const itemData = item;
    switch (itemData.status) {
      case 0:
        itemData.status = 1;
        break;
      case 1:
        itemData.status = 0;
        break;
      default:
        break;
    }
    const res = await editItem(itemData, token)
    if (res && res.status === 200) {
      setOpenIconLoading(false)
      props.handleFetchData()
    } else {
      toast.error("Was an err!")
    }
  }

  const handleRemoveItemOutHome = async () => {
    setOpenIconLoading(true)
    const itemData = item;
    itemData.status = 2;
    const res = await editItem(itemData, token)
    if (res && res.status === 200) {
      setOpenIconLoading(false)
      props.handleFetchData()
      toast.warning("Todo added to history!")
    } else {
      toast.error("Was an err!")
    }
  }

  return (
    <>
      <div className={clsx(styles.item, item.status === 3 && styles.outDate)}>
        <div className={styles.left}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.content}>{item.description}</div>
          <div className={styles.date}>
            <div className={styles.time}>
              {moment(item.startDate).format('MM/DD/YYYY')}
            </div>
            <span className={styles.space}>&#8594;</span>
            <div className={styles.time}
              style={{  color: item.status === 3 && 'red' }}
            >
              {moment(item.endDate).format('MM/DD/YYYY')}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {item.status === 3 && <span>Tasks out date</span>}
            </div>
            
          </div>
          {props.disableAction === true || item.status === 3 ?
            '' :
            <div className={styles.actions}>
              {item.status === 1 ?
                <ButtonIconLoading
                  openIconLoading={openIconLoading}
                  variant='contained'
                  className={item.status === 1 ? styles.btnDone : styles.btnCheck}
                  onClick={handleStatusItem}
                >
                  <AutorenewIcon />
                </ButtonIconLoading>
                :
                <ButtonIconLoading
                  openIconLoading={openIconLoading}
                  variant='contained'
                  className={item.status === 1 ? styles.btnDone : styles.btnCheck}
                  onClick={handleStatusItem}
                >
                  <CheckIcon />
                </ButtonIconLoading>}
              {item.status === 1 &&
                <ButtonIconLoading
                  variant='contained'
                  className={styles.btnRemove}
                  onClick={handleRemoveItemOutHome}
                >
                  <DeleteIcon />
                </ButtonIconLoading>}
            </div>
          }
        </div>
        <div className={styles.right}>
          <MoreIconDropDown
            onClick={handleDeleteItem}
            onClickEdit={handleEditItem}
            disableEdit={item.status === 3 || 2}
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