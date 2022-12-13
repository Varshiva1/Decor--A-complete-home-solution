import React from 'react';
import "./InputBox.css";

export const InputBox = ({labelName,placeholder,type,value,name,...other}) => {
  return (
    <div className="input-group">
    <label className="input-group__label" htmlFor={name}><span className="label__content">
      {labelName}
    </span></label>
    <input type={type} placeholder={placeholder} name={name} value={value} className="input-group__input" {...other} />
    
  </div>
  )
}
