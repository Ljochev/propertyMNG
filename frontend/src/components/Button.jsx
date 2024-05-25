import React from 'react'

const Button = ({handleFn, btnName}) => {
  return (
<button type="button" onClick={handleFn}>{btnName}</button>
  )
}

export default Button