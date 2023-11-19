import React, { useState } from 'react'
import "./Textinput.css";
  
const Textinput1 = () => {

  const [text, setText] = useState('');

  return (
    <div>
        <form  className='textarea1'>
            <label></label>
            <input style={style1.box} className='text1 '
            placeholder='Solo,Family,Friends etc.'
            required  value={text} onChange={(e) => setText(e.target.value)} />
        </form>
    </div>
  )
}


const Textinput2 = () => {

  const [text2, setText2] = useState('');

  return (
    <div>
        <form>
            <label></label>
            <input style={style1.box} className='text2'
            placeholder='Title'
            required  value={text2} onChange={(f) => setText2(f.target.value)} />
        </form>
    </div>
  )
}


const Textinput3 = () => {

  const [text3, setText3] = useState('');

  return (
    <div>
        <form>
            <label></label>
            <textarea className='text3'
            required placeholder='This Spot is great for a Casual Night out.' 
            value={text3} onChange={(g) => setText3(g.target.value)} />
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
