import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

const Courses = ({courses}) => {
  console.log('kurssit ',courses)

  const x = courses.map((course)=><li key={course.id}>{Course(course)}</li>)
  
    
  
  return (
    <ul>
      
        {x}
      
    </ul>
  )


}

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 2,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>    
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))