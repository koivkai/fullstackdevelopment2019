import React from 'react'

const Contact = ({ contact , handleRemoveClick}) => {
  

  return (
    <li>{contact.name} {contact.number}  <button onClick={handleRemoveClick} key ={contact.id} >delete</button></li> 
  )
}

export default Contact