import React from 'react'

const Button = ({handleSubmit}:any) => {
  return (
    <button onClick={handleSubmit} className="submit-btn">
        <div className="circle">
            <div className="half-circle-left"></div>
            <div className="line"></div>
            <div className="half-circle-right"></div>
        </div>
      
    </button>
  )
}

export default Button