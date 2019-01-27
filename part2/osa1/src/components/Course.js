import React from 'react'

const Course = (props) => {
    console.log('Course props', props)
    
      return (
        <>   
        
          <Header name={props.name} />
          <Content parts={props.parts} />
          <Total courseContents={props.parts} />
        
        </>
      )
  }


  const Header = props => {
    console.log('header', props)
    return (
      <h1>{props.name}</h1>
    )
  }
  
  const Content = (props) => {
  console.log('content props', props)
  const a = props.parts
  console.log('a ', a)
  
  const p = a.map((part)=><li key={part.id}>{Part(part)}</li>)
  
    return (
      <>
        <ul>
          {p}
        </ul>
      </>
    )
  }
  
  const Part = (props) => {
      console.log('Part props ', props)
  
      return(
        <>{props.name}</>
      )
  }
  
  const Total = (props) => {
   
    console.log('total props ', props)
    const c = props.courseContents
    console.log('c ', c)
  
    const total = c.reduce( (initial, {exercises}) => {
      console.log('yhteensä nyt ', initial.exercises, 'seuraava ', exercises)
      return {exercises: initial.exercises + exercises}
    },{exercises: 0})
  
    console.log('total', total)  
    return (
      <p>yhteensä {total.exercises} tähtävää</p>
    )
  }

export default Course