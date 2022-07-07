import React from 'react'
import styles from './Item.module.scss'
import MoreIconDropDown from '../moreIconDropDown';
import { Button } from '@mui/material';
const Item = (props) => {
  const { item } = props;

  const handleDeleteItem = (item) => {
    
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
            className={styles.btnDone}
          >Done</Button>
          <Button
            variant='contained'
            className={styles.btnStatus}
          >Hight</Button>
        </div>
      </div>
      <div className={styles.right}>
        <MoreIconDropDown 
          onClick={handleDeleteItem}
        />
      </div>
    </div>
  )
}

export default Item