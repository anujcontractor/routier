import React, { useState } from 'react'

  
const Textinput1 = () => {

  const [text, setText] = useState('');

  return (
    <div>
        <form>
            <label></label>
            <input style={style1.box} className='w-[19rem]
             placeholder:ml-[2.19rem] placeholder:text-[#8C9091] placeholder:text-[1.25rem] placeholder:text-[500]
             '
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
            <input style={style1.box} className='placeholder:text-center w-[32.3125rem] placeholder:text-[#8C9091] placeholder:text-[1.25rem] placeholder:text-[500] '
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
            <textarea className='flex border-[#8C9091] border rounded-[0.625rem] w-[54.0625rem] h-[20.4375rem] resize-none 
             placeholder:text-[#8C9091] placeholder:text-[1.25rem] placeholder:text-[500] placeholder:translate-x-[0.88rem] '
            required placeholder='This Spot great for a Casual Night out.' value={text3} onChange={(g) => setText3(g.target.value)} />
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
