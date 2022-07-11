import React from 'react'
import styles from './History.module.scss';
import Filter from "../../components/filter/Filter";
import Item from "../../components/item";
import { useSelector } from 'react-redux';

const History = () => {
  const [listTodo, setListTodo] = React.useState([]);
  const [listTodoSearch, setListTodoSearch] = React.useState([]);
  const dataTodo = useSelector((state) => state.todo.data)

  React.useEffect(() => {
    setListTodoSearch([...dataTodo].reverse())
  }, [dataTodo]);

  React.useEffect(() => {
    setListTodo([...dataTodo].reverse())
  }, [dataTodo]);


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
            <div key={i}>
              {item.status === 2 &&
                <Item
                  item={item}
                  disableAction
                />
              }
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default History