import React from 'react'

const PersonForm = ({addContact, newName, handleNameChange, newNumber, handleNumberChange}) => {

    return (
        <form onSubmit={addContact}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange}/>
          <br />
          numero: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
}

export default PersonForm