import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
  return (
    <h1>{course.course.name}</h1>
  )
}

const Content = (course) => {

  
     
  
  return (
    <>
      <Part part={course.course.parts[0]}/>
      <Part part={course.course.parts[1]}/>
      <Part part={course.course.parts[2]}/>
    </>
  )
}

const Part = (part) => {

  return (
    <p>
      {part.part.name} {part.part.exercises}
    </p>
  )
}

const Total = (course) => {
  console.log(course.course.parts)

  let summa = 0
  course.course.parts.forEach(part => {
    summa = summa + part.exercises
  })
  return (
    <p>yhteensä {summa} tähtävää</p>
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

  return (
    <div>
      <Header course={course} />
      
      <Content course={course}/>

      <Total course={course} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))