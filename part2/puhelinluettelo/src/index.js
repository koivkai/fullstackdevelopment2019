import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

const ShowContacts = (props) => {
    //console.log('ShowContcacts props ', props)  
    const contactList = props.contacts.map((contact)=><li key={contact.name}>{contact.name} {contact.number}</li>)
    return(
        <ul>
            {contactList}
        </ul>
    )
}

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

const SearchForm = ({searchTerm, handleSeachTermChange}) => {
    return (
        <div>
            haku <input value={searchTerm} onChange={handleSeachTermChange} />
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('');
    const [ searchTerm, setSearchTerm] = useState('')

    useEffect(()=>{
        const promise = axios.get('http://localhost:3001/persons')
        promise.then(response => {
        //console.log('response', response)
        //console.log('response data', response.data)
        setPersons(response.data)
        })
    }, [])
  

  const addContact = (event) => {
    event.preventDefault()
    //console.log('nappia painettu', event.target)
    const contactObject = {
        name: newName,
        number: newNumber
    }
    //console.log('newName ', newName)
    //console.log('persons,', persons)
    //console.log('contactObject', contactObject)
    const inc = persons.filter(c => c.name === newName).length
    //console.log('inc ', inc)
    if(inc<=0) {
        setPersons(persons.concat(contactObject))
        setNewName('')
        setNewNumber('')
    } else {
        window.alert(`${newName} niminen henkilö on jo luettelossa`)
        setNewName('')
        setNewNumber('')
        
    }
    //console.log('persons after', persons)
    
  }

  const contactsToShow = (searchTerm === '') 
    ? persons : persons.filter(p => p.name.includes(searchTerm)) 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSeachTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <h3>Lisää uusi</h3>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
        <SearchForm searchTerm={searchTerm} handleSeachTermChange={handleSeachTermChange} />
      <div>
          <ShowContacts contacts={contactsToShow} />
      </div>
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));


