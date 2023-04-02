import React, {useState,useEffect} from 'react'

interface Props{
  label:string;
  val:string;
  limit:number;
  errorMsg:string;
  hasError:boolean | null
};

const Input = ({label,val,limit,errorMsg,hasError}:Props) => {
  const [value,setValue] = useState("")
  const [error,setError] = useState("")

  const handleChange=(e:any)=>{
    setValue(e.target.value)
  }

  useEffect(()=>{
    if(value == "")return;
      let timer = setTimeout(()=>{
        console.log("Check valid input!")
        if(isNaN(parseInt(value)) || parseInt(value) > limit){
          toggleError(errorMsg)
        }
      },3000);

        return ()=>clearTimeout(timer);
  },[value])


  useEffect(()=>{
if(hasError)toggleError(errorMsg);
  },[hasError])


  const toggleError=(str:string)=>{
    setError(str);
    setTimeout(()=>setError(""),2000)
  }
  return (
    <div className="form-div mr-2">
        <label htmlFor="label">{label.split("").splice(0,label.length-1).join("")}</label>
        <input type="text" name={label} value={value} onChange={handleChange} placeholder={label.split("").splice(0,label.length-1).join("").toUpperCase()} className={error ? "form-control danger" : "form-control"} />
        <h3 className="error">{error} </h3>
    </div>
  )
}

export default Input