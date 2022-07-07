import React from 'react'
import styles from './Item.module.scss'
import MoreIconDropDown from '../moreIconDropDown';
import { Button } from '@mui/material';
const Item = () => {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.title}>Title</div>
        <div className={styles.content}>Title how do you fill</div>
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
        <MoreIconDropDown />
      </div>
    </div>
  )
}

export default Item