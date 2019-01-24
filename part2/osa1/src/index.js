import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
  console.log('header', props)
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
console.log('content', props)
console.log('props.course', props.course)
const courseTable = props.course.parts
const courses = courseTable.map(course => <li key={course.name}>{course.name} {course.exercises}</li>)
console.log('courseS', courses)
  return (
    <>
      <ul>
        {courses}
      </ul>
    </>
  )
}

const Total = (props) => {
 
  const parts = props.course.parts
  console.log('total course', parts)

  const total = parts.reduce( (initial, {exercises}) => {
    console.log('yhteensä nyt ', initial.exercises, 'seuraava ', exercises)
    return {exercises: initial.exercises + exercises}
  },{exercises: 0})

  console.log('total', total)
  return (
    <p>yhteensä {total.exercises} tähtävää</p>
  )
}

const Course = ({course}) => {
  console.log('course', course)
  console.log('name',course.name)
    return (
      <>   
        <Header name={course.name} />
        <Content course={course}/>
        <Total course={course} />
      </>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

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

  console.log('courses', courses)

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))