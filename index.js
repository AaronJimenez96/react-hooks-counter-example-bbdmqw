import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function Counter({ character }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!character) return; //We jump this if there are not character
    setLoading(true); //Regadless, we've some data
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [character]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 1)}</pre>;
  if (!data) return null;

  return (
    <div className="content">
      <h1>{data.name}</h1>
      <img src={data.image}></img>
      <p>Status: {data.status}</p>
      <p>Specie: {data.species}</p>
    </div>
  );
}

const el = <Counter character="1" />;
ReactDOM.render(el, document.getElementById('root'));
