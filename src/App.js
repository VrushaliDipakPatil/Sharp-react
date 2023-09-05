import React, { useCallback, useMemo, useState } from 'react';

import './App.css';
import Button from './components/UI/Button/Button';
import DemoList from './components/Demo/DemoList';

function App() {
  const [listTitle, setListTitle] = useState('My List');
  const [isAscending, setIsAscending] = useState(true);

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  const sortedList = () => {
    return isAscending ? listItems.sort((a,b)=> a-b) : listItems.sort((a,b)=> b-a);
  };

  const toggleSortingHandler = useCallback(() => {
    setIsAscending((prevState) => !prevState);
  }, []);

  const buttonText = isAscending ? 'Change to Descending Order' : 'Change to Ascending Order';

  return (
    <div className="app">
      <DemoList title={listTitle} items={sortedList} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
      <Button onClick={toggleSortingHandler}>{buttonText}</Button>
    </div>
  );
}

export default App;
