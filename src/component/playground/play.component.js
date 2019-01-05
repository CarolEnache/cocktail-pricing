import React, { useState } from 'react';

const Play = () => {

    const [thing, setThing] = useState({
        title: 'Beef',
        description: 'Tasty beef'
    })

    const changeThing = () => {
        setThing({
            title: 'Potato',
            description: 'Nicer than beef'
        });
    }

    return (
        <div onClick={changeThing} >
            <h1>Hello from the Playground component</h1>
            <h2>{thing.title}</h2>
            <p>{thing.description}</p>
        </div>
    )
}

export default Play;