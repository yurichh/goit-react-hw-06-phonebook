import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../redux/store';

const Test = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter);
  const handleChangeFilter = value => {
    dispatch(changeFilter(value));
  };
  return (
    <div>
      <div>{filterValue}</div>
      <input
        type="text"
        onChange={({ target: { value } }) => handleChangeFilter(value)}
      />
    </div>
  );
};

export default Test;
