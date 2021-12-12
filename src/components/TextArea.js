import React from 'react';
import classes from './TextArea.module.css';

const TextArea = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.children}</label>
      <textarea className={classes.textArea} {...props} />
    </div>
  );
};

export default TextArea;
