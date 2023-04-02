import React from 'react'

const Output = ({label,val}:any) => {
  return (
    <div key={val} className="label-div">
        <h1 className={val == "" ? "" : "val-h1"}>{val}</h1>
        <h2 className={val == "" ? "" : "label-h1"}>{label}</h2>
    </div>
  )
}

export default Output