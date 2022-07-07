import { Button } from "@mui/material";
import React from "react";
import styles from './Home.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Filter from "../../components/filter/Filter";
import Item from "../../components/item";
const Home = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>List Todo today</h4>
        <div className={styles.actions}>
          <MoreVertIcon />
          <Button
            variant="contained"
            className={styles.btnHeader}
          >New ToDo</Button>
        </div>
      </div>
      <div className={styles.filter}>
        <Filter />
      </div>
      <div className={styles.content}>
          <Item/>
          <Item/>
          <Item/>
          <Item/>
      </div>
    </div>
  )
}

export default Home