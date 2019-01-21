import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
    console.log(good,neutral,bad)
    if (good==neutral && neutral==bad && bad == 0) {
        return (
            <>
                <h1>tulokset</h1>
                <p>Ei yhtään palautetta annettu</p>
            </>
        )
    }
    return (
        <>
            <h1>tulokset</h1>
            <p>hyvä {good}</p>
            <p>ok {neutral}</p>
            <p>huono {bad}</p>
            <p>yhteensä {good+neutral+bad}</p>
            <p>keskiarvo <Average good={good} neutral={neutral} bad={bad} /></p>
            <p>positiivisia <HowManyPositive good={good} neutral={neutral} bad={bad} />%</p>
        </>
    )
}

const Average = ({ good, neutral, bad }) => {
    let totalScore = good - bad
    let total = good + neutral + bad
    return (
        <>
        {totalScore/total}
        </>
    )    
}

const HowManyPositive = ({ good, neutral, bad }) => {
    let total = good + neutral + bad
    return (
        <>
        {(good/total)*100}
        </>
    ) 
}

const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    return (
        
      <div>   
        <div>
            <h1>anna palautetta</h1>
            <button onClick={()=> setGood(good+1)}>hyvä</button>
            <button onClick={()=> setNeutral(neutral+1)}>ok</button>
            <button onClick={()=> setBad(bad+1)}>huono</button>
        </div>
        <div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
      </div>
    )
  }

  ReactDOM.render(
    <App />, 
    document.getElementById('root')
  )