import React from 'react'

const Button = ({text, additionalClasses, click}) => {
  return (
    <button onClick={click && click} className={`btn ${additionalClasses ? additionalClasses : ''}`}>{text}</button>
  )
}
export default Button;