import React from 'react'

function Alert(props) {

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (

    <div >
      {props.alert?.type && props.alert?.message && <div className={`alert alert-${props.alert.type}`} role="alert" >
        <p >{capitalize(props.alert.message)}</p>
      </div>}
    </div>

  );
}

export default Alert;