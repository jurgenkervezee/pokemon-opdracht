import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import axios from "axios";
import pokemon from "./components/Pokemon";

function App() {
    const [pokemonSet, setPokemonSet] = useState(null);
    const [endPoint, setEndPoint] = useState("https://pokeapi.co/api/v2/pokemon");

    useEffect( ()=> {
        async function fetchData() {
            try {
                const result = await axios.get(`${endPoint}`);
                // console.log(`${endPoint}`);
                console.log(result);
                setPokemonSet(result.data);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();

    }, [endPoint])

    console.log({pokemonSet})

  return (
        <>
            <header>
                <img
                    src="https://cdn.mos.cms.futurecdn.net/nJqzZf3iyhawJfofUMicFV-970-80.jpg.webp"
                    alt="pokemon_logo"
                    className="pokemon_logo"
                />
            </header>
            {pokemonSet &&
                <>
                    <div className="buttonContainer">
                    <button
                        disabled={!pokemonSet.previous}
                        type="button"
                        onClick={() => {setEndPoint(pokemonSet.previous)}}
                        className="navigationBtn"
                    >
                        Previous
                    </button>
                    <button
                        disabled={!pokemonSet.next}
                        type="button"
                        onClick={() => {setEndPoint(pokemonSet.next)}}
                        className="navigationBtn"
                    >
                        Next
                    </button>
                    </div>
                </>}

            <div className= "container">
                {pokemonSet &&
                    <>
                    {pokemonSet.results.map((pokemon) => {
                            return (<>
                                <Pokemon key={pokemonSet.results.name} name={pokemon.name}/>
                            </>)
                        })
                    }
                    </>
                }
            </div>
        </>
  );
}
export default App;
