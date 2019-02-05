import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Contact from './components/Contact'
import contactServices from './services/contacts'
import './index.css'
import PersonForm from './components/PersonForm'
import SearchForm from './components/SearchForm'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('');
    const [ searchTerm, setSearchTerm] = useState('')
    const [currentNotification, setNotification] = useState(null)

    useEffect(()=>{
        contactServices
        .getAll()
        .then(existingContacts => {
            setPersons(existingContacts)
        })
    }, [])
  

  const addContact = (event) => {
    event.preventDefault()
    //console.log('persons before add', persons)
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
            setNotification(`Lisättiin henkilö ${contactObject.name}`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
                setNotification(null)
              }, 5000)
            
        })
        .catch(error => {
          //console.log(error.response.data)
          setNotification(`${error.response.data.error}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })  
    } else {
      if(window.confirm(`${newName} niminen henkilö on jo luettelossa, päivitetäänkö numero?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        console.log('persons to update', personToUpdate)
        contactServices
        .update(personToUpdate.id, contactObject)
        .then(updatedContact => {
          setPersons(persons.map(p => p.id !== personToUpdate.id ? p : updatedContact))
          setNotification(`Päivitettiin henkilö ${updatedContact.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
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
            setNotification(`Poistettiin henkilön ${name} tiedot`)
            setTimeout(() => {
                setNotification(null)
              }, 5000)
          }
        
      }
          
      
  }

  return (
    <div>
    <Notification message={currentNotification} />
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



