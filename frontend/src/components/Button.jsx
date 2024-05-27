import React from 'react'

const Button = ({handleFn, btnName, svgImg}) => {
  return (
<button type="button" onClick={handleFn} >{btnName}<img src={svgImg}/></button>
  )
}

export default Button