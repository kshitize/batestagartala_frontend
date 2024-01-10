import React, { useState } from "react";
import "./App.css";
function App() {
  const current = new Date();

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const time = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
  let checkedValuesString, randomNameArrayString;
  
  const [userData, setUserData] = useState({
    date:date,
    time:time,
    checkedValuesString: "",
    randomNameArrayString: ""
  })
  const [checkedValues, setValue] = useState([]);
  const [randomNameArray, setRandomNamesArray] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [concatenatedString, setconcatenatedString] = useState("");
  let telegramtoken = "6872834099:AAG0xfR4ZfY_ODtk52-ZzXuetdmihkGp4k4";
  let chat_id = "-4069366501";
  
  let numberOfNames, numberOfRandomNames ;

  

  const handleChange = (event) => {
    const {value,checked} = event.target;
    if(checked){
      setValue(pre=>[...pre,value]);  
    }else{
      setValue(pre=>{
        return[...pre.filter(names=>names!==value)]
      })
    }
  
  };

  // console.log(checkedValues);
  numberOfNames=checkedValues.length;
  numberOfRandomNames=Math.ceil((checkedValues.length)*0.5);

  const generateRandomNames = async(event)=>  {
    event.preventDefault();
    const randomNames = [];
    setIsDisabled(!isDisabled);
  
    // for (let i = 0; i < numberOfRandomNames; i++) {
    //   // Generate a random index within the length of the array
    //   const randomIndex = Math.floor(Math.random() * checkedValues.length);
    //   console.log("checked value lenght",checkedValues.length)
    //   // Get the name at the random index
    //   const randomName = checkedValues[randomIndex];

          
    //   // Add the random name to the result array
    //   randomNames.push(randomName);
    //   delete checkedValues[randomIndex];
    //   console.log("checked value lenght",checkedValues.length)
    // }

    const shuffled = checkedValues.slice(); // Create a copy to avoid modifying the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
    
    setRandomNamesArray(shuffled.slice(0,numberOfRandomNames))
    // console.log(randomNames);
  }
  

  const submitData = async (event) => {
    event.preventDefault();
    console.log("checked values",checkedValues)
    console.log("random names",randomNameArray)
    checkedValuesString = checkedValues.join(',')
    randomNameArrayString = randomNameArray.join(',')
    // console.log("checkedvaluestring",checkedValuesString)
    // console.log("randomnamearraystring",randomNameArrayString)
    // const { date, time, item1, item2, item3, item4, item5 } = userData;
    if(randomNameArrayString && checkedValuesString){
    const res = await fetch(
      "https://agartalarandomba-default-rtdb.firebaseio.com/BaRecord.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, time, checkedValuesString, randomNameArrayString }),
      }
    );

    if (res) {
      // console.log(res)
      console.log(randomNameArray.length);
      // setconcatenatedString(randomNameArray.join('\n'));
      var concatenatedString = randomNameArray.join(' , ');
      
      console.log("this is ",concatenatedString);
      let my_text = "Names Selected for BA " + date + " "+ concatenatedString;
      alert("Data Stored");
      setIsDisabled(!isDisabled);
      var url = `https://api.telegram.org/bot${telegramtoken}/sendMessage?chat_id=${chat_id}&text=${my_text}`
      let api = new XMLHttpRequest();
      api.open("GET",url,true);
      api.send();
      window.location.reload();
    } else {
      alert("Please fill the data");
    }
  }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <b className="navbar-brand" href="/">
            BA ATC : {date}
          </b>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
      </nav>

      {/* Item names */}
      <form method="POST">
        {/* <div display="flex" className="form-group">
          <label for="Item1">Item 1</label>
          <input
            type="number"
            name="item1"
            className="form-control"
            id="Item1"
            placeholder="Item1"
            value={userData.item1}
            onChange={postUserData}
          />
        </div> */}
        <div className="inputs ms-4">
        <div className="form-check form-switch">
          <input
            className="form-check-input fs-4"
            type="checkbox"
            id="n1"
            value="kshitize"
            onChange={handleChange}
          />
          <label className="form-check-label fs-4" htmlFor="n1">
            Kshitize
          </label>
        </div>
       <br/>

        <div className="form-check form-switch">
          <input
            className="form-check-input fs-4"
            type="checkbox"
            id="n2"
            value="javed"
            onChange={handleChange}
          />
          <label className="form-check-label fs-4" htmlFor="n2">
            Javed
          </label>
        </div>
        <br/>

        <div className="form-check form-switch">
          <input
            className="form-check-input fs-4"
            type="checkbox"
            id="n3"
            value="prashant"
            onChange={handleChange}
          />
          <label className="form-check-label fs-4" htmlFor="n3">
            Prashant
          </label>
        </div>
        <br/>
        <div className="form-check form-switch">
          <input
            className="form-check-input fs-4"
            type="checkbox"
            id="n4"
            value="hari"
            onChange={handleChange}
          />
          <label className="form-check-label fs-4" htmlFor="n4">
            Hari
          </label>
        </div>
        <br/>
        <div className="form-check form-switch">
          <input
            className="form-check-input fs-4"
            type="checkbox"
            id="n5"
            value="kunal"
            onChange={handleChange}
          />
          <label className="form-check-label fs-4" htmlFor="n5">
            Kunal
          </label>
        </div>
        <br/>
           </div>
        
        <div className="fs-4">Total names selected are {numberOfNames}</div><br/>
        <div className="fs-4">50% of Total names {numberOfRandomNames}</div><br/>

        {/* <div>Selected Random Name are: {randomNameArray}</div> */}
        <div className="fs-4">Selected Random Name are: </div>
        <ul>
      {randomNameArray.map((item, index) => (
        <li className= "fs-4 m-2" key={index}> {item}</li>
      ))}
    </ul>


    {isDisabled && (
        <button type="submit" className="btn btn-primary" onClick={generateRandomNames} disabled={!isDisabled}>
        Generate Random Names
      </button>
      )}
        
        <br></br>
        <br></br>
        {!isDisabled && (<button type="submit" className="btn btn-primary" onClick={submitData} disabled={isDisabled}>
          Submit
        </button>)}
      </form>
      
    </>
  );
}

export default App;
