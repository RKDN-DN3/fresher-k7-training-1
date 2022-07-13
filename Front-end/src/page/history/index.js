import React from 'react'
import styles from './History.module.scss';
import Filter from "../../components/filter/Filter";
import Item from "../../components/item";
import BackdropLoading from "../../components/backDrop";
import { getAllItem } from '../../services';
import { token } from '../../util/getTokenLocal';

const History = () => {
  const [openLoading, setOpenLoading] = React.useState(false);
  const [listTodo, setListTodo] = React.useState([]);
  const [listTodoSearch, setListTodoSearch] = React.useState([]);

  const handleFetchData = async () => {
    const res = await getAllItem(token)
    if (res && res.status === 200) {
      if (res.data && res.data.isSuccess === true) {
        const data = res.data.result;
        const arr = data.filter((item) => item.status === 2)
        setListTodo(arr)
        setOpenLoading(false)
      }
    }
  }

  React.useEffect(() => {
    setOpenLoading(true)
    handleFetchData()
  }, []);

  React.useEffect(() => {
    const data = [...listTodo]
    setListTodoSearch(data.reverse())
  }, [listTodo]);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>History todo</h4>
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
              disableAction
            />
          )
        })}
      </div>
      <BackdropLoading openLoading={openLoading} />
    </div>
  )
}

export default History