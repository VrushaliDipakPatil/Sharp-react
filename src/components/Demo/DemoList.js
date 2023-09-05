import React from 'react';
import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;
  console.log(props);

  const sortedList = items(); // Call the function to get sorted items

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(DemoList);
