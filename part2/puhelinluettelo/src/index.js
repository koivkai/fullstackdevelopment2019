import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Contact from './components/Contact'
import contactServices from './services/contacts'

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
        contactServices
        .getAll()
        .then(existingContacts => {
            setPersons(existingContacts)
        })
    }, [])
  

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = {
        name: newName,
        number: newNumber,
       // id : persons.length +1
    }   
   
    const inc = persons.filter(c => c.name === newName).length
    
    if(inc<=0) {
        contactServices
        .create(contactObject)
        .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setNewName('')
            setNewNumber('')
        })  
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

  const handleRemoveClick = (id) => {
      return () => {
        let name = persons.find(p => p.id === id).name
        if (window.confirm(`Are you sure you wish to delete ${name}`)) { 
            console.log('REMOVE id=', id, name)
            contactServices.remove(id)
            setPersons(persons.filter(p => p.id !== id))
          }
        
      }
          
      
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <h3>Lisää uusi</h3>
        <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numerot</h3>
        <SearchForm searchTerm={searchTerm} handleSeachTermChange={handleSeachTermChange} />
      <ul>
        {contactsToShow.map(contact => <Contact key={contact.id} contact={contact}  handleRemoveClick={handleRemoveClick(contact.id)}/> )}
      </ul>
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));


