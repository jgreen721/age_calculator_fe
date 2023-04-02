import { useState, useRef, useEffect } from 'react'
import {Input,Output,Button} from "./components"
import './App.css'

function App() {
  const [years,setYears] = useState({user:"",converted:"- -",error:"Can't be in the past",hasError:false})
  const [months,setMonths] = useState({user:"",converted:"- -",error:"Must be a valid month",hasError:false})
  const [days,setDays] = useState({user:"",converted:"- -",error:"Must be a valid day",hasError:false})
  const [error,setError] = useState<String>("");
  const formRef = useRef<HTMLFormElement>(null)
  const [counter,setCounter] = useState(0)


  useEffect(() => {
    if (formRef.current) {
      formRef.current.focus();
    }
  }, []);

  const handleSubmit = (e:HTMLFormElement)=>{
    e.preventDefault()
    console.log("handleSubmit fired!");
    // validate input
    // convert
    // update
    // console.log(formRef.current['years'].value)
    // console.log(formRef.current['months'].value)
    // console.log(formRef.current['days'].value)
    // setYears({...years,converted:formRef.current['years'].value})
    // setMonths({...months,converted:formRef.current['months'].value})
    // setDays({...days,converted:formRef.current['days'].value})
    if(formRef.current){
    let data = [
      {label:"years",val:formRef.current['years'].value},
      {label:"months",val:formRef.current['months'].value},
      {label:"days",val:formRef.current['days'].value},
    ]
    
    let isValid = true;
    data.forEach(d=>{
      let result = validateInput(d);
      if(!result.status){
        console.log("bad input on " + d.label)
        isValid = false
        if(d.label == "years"){
          setYears({...years,hasError:true});
          setTimeout(()=>setYears({...years,hasError:false}),2000);
        }
        if(d.label == "days"){
          setDays({...days,hasError:true});
          setTimeout(()=>setDays({...days,hasError:false}),2000);
        }

        if(d.label == "months"){
          setMonths({...months,hasError:true});
          setTimeout(()=>setMonths({...months,hasError:false}),2000);
        }
      }
    })

    console.log(data)
    if(isValid){
      let currDate = new Date().toLocaleDateString();
      let currMonth = parseInt(currDate.split("/")[0]);
      let currDay = parseInt(currDate.split("/")[1]);
      let convertedYear = 2023 - formRef.current['years'].value
      // console.log(formRef.current['months'].value,currMonth)
      let userMonth = parseInt(formRef.current['months'].value)
      let userDay = parseInt(formRef.current['days'].value)
  
      if(userMonth > currMonth){
        console.log('take another year off bitch!')
        convertedYear-=1;
        let newTotalDays = 30 - userDay + currDay;
        currDay = newTotalDays;
        console.log("calc-ing days!")
      }
      else{
        let newTotalMonths = currMonth - userMonth - 1 > 0 ? currMonth - userMonth - 1 : 0
        currMonth = newTotalMonths;
        if(currMonth >= 0){
        let minusDiff = userMonth == 2 ? 28 : 30;
        let newTotalDays = minusDiff - userDay + currDay;
        currDay = newTotalDays;
        console.log("calc-ing days!")
        }
      }
      setCounter(()=>counter+1)
    setYears({...years,converted:JSON.stringify(convertedYear)})
    setMonths({...months,converted:JSON.stringify(currMonth)})
    setDays({...days,converted:JSON.stringify(currDay)})
    }

  }
  }

  const validateInput=({label,val}:any)=>{
    if(val == "")return {status:false,msg:"Empty string is not valid"}
    if(isNaN(val))return {status:false,msg:"Input needs to be a number!"}
    let returnObj = {status:true,msg:"success"};

    switch(label){
      
      case "years":
        if(val > 2023){
          returnObj.msg = "I don't think you were born in the future :("
          returnObj.status = false
        }
      break;

      case "days":
        if(val > 31){
          returnObj.msg = "Not a valid day of the month"
          returnObj.status = false;
        }
      break;

      case "months":
        if(val > 12){
          returnObj.msg = "Not a valid month"
          returnObj.status = false
        }
      break;
    }

    return returnObj;

  }

  const toggleError=(msg:String)=>{
    setError(msg);
    setTimeout(()=>setError(""),2000)

  }


  return (
    <div className="app">
      <section key={counter} className="main-card animate">
   
        <form ref={formRef}>
          <div className="inputs-row between">
          <Input label="days" val={days.user}  limit={31} errorMsg={days.error} hasError={days.hasError}/>
          <Input label="months" val={months.user}  limit={12} errorMsg={months.error} hasError={months.hasError}/>
          <Input label="years" val={years.user}  limit={2020} errorMsg={years.error} hasError={years.hasError}/>
          </div>
          <div className="form-div end">
          <Button handleSubmit={handleSubmit}/>
          </div>

        </form>
      <div className="bottom-row">
        <Output key="years" label="years" val={years.converted}/>
        <Output key="months" label="months" val={months.converted}/>
        <Output key="days" label="days" val={days.converted}/>
      </div>
      </section>
    </div>
  )
}

export default App
