import React, {useEffect, useState} from "react";
import axios from "axios";

const Pokemon = ({name}) => {
    const [pokemonData, setPokemonData] = useState(null);


    useEffect(() => {

        async function fetchData() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                console.log(result);
                setPokemonData(result.data);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();

    }, [name]);

    console.log({pokemonData});

    return (

        <>
            {pokemonData &&
                <>
                    <article className="pokemonCard">
                        <h2>{pokemonData.name}</h2>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name}/>
                        <p><b>Moves:</b> {pokemonData.moves.length}</p>
                        <p><b>Weight:</b> {pokemonData.weight}</p>
                        <ul><b>Abilities:</b>
                            {pokemonData.abilities.map((pokeAbility) => {
                                return (<li className="ability" key={pokeAbility.slot}>
                                    {pokeAbility.ability.name}
                                </li>)

                            })
                            }

                        </ul>
                    </article>
                </>
            }
        </>

    );
}

export default Pokemon;