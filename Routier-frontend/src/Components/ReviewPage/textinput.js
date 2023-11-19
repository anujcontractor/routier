import React, { useState } from 'react'
import "./Textinput.css";
  
const Textinput1 = ({ onVisitedWithChange }) => {

  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
    onVisitedWithChange(e.target.value);
  };


  return (
    <div>
        <form  className='textarea1'>
            <label></label>
            <input style={style1.box} className='text1 '
            placeholder='Solo,Family,Friends etc.'
            required  value={text} onChange={(e) => handleChange(e)} />
        </form>
    </div>
  )
}


const Textinput2 = ({ onTitleChange }) => {

  const [text2, setText2] = useState('');

  const handleChange = (e) => {
    setText2(e.target.value);
    onTitleChange(e.target.value);
  };


  return (
    <div>
        <form>
            <label></label>
            <input style={style1.box} className='text2'
            placeholder='Title'
            required  value={text2} onChange={(f) => handleChange(f)} />
        </form>
    </div>
  )
}


const Textinput3  = ({ onReviewTextChange }) =>{

  const [text3, setText3] = useState('');

  const handleChange = (e) => {
    setText3(e.target.value);
    onReviewTextChange(e.target.value);
  };

  return (
    <div>
        <form>
            <textarea className='text3'
            required placeholder='This Spot is great for a Casual Night out.' 
            value={text3} onChange={(g) => handleChange(g)} />
        </form>
    </div>
  )
}



export{ 
Textinput1,
Textinput2,
Textinput3,
}

const style1={

    box:{
      display: "flex",
      borderColor: "#8C9091",
      borderWidth: "1px",
      borderRadius: "0.625rem",
      height: "2.8125rem"
    }

}
