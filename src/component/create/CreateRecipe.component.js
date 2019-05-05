import React, { useReducer, useState, Fragment } from 'react';
import { useTrail, animated } from 'react-spring'
import styled from 'styled-components/macro';

import { initialState, reducer } from '../../redux';

import Form from '../element/Form.component';
import Input from '../element/Input.component';
import Button from '../element/Button.component';//TODO: Fix the File Indexing

const CreateRecipe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [recipeName, setRecipeName] = useState();
    const [numberOfPortions, setNumberOfPortions] = useState();
    const [pageTitle, setPageTitle] = useState(['Create recipe']);
    const [toggle, setToggle] = useState(false);
    const config = { mass: 5, tension: 2000, friction: 200 };

    const addBeverage = (e) => {
        e.preventDefault();
        setToggle(true)
        dispatch({
            type: 'ADD_RECIPE',
            payload: {
                recipeName,
                numberOfPortions
            }
        });
    }

    const changeTilte = () => {
        setPageTitle([recipeName, ' ', `serves: ${numberOfPortions}`]);
    }

    const trail = useTrail(pageTitle.length, {
        config,
        opacity: toggle ? 1 : 0,
        x: toggle ? 0 : 20,
        height: toggle ? 20 : 0,
        from: { opacity: 0, x: 20, heigth: 0 }
    })
    console.log(trail)

    return (
        <CreateRecipeComponentWrapper>
            <TrailsMain>
                <div>
                    { toggle ? (trail && trail.map( ({ x, height, ...rest}, index) => (
                        <TrailsText>
                            <animated.div
                                key={ pageTitle[index] }
                                style={{...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`)}}
                            >
                                <animated.div style={{height}}>{pageTitle[index]}</animated.div>
                            </animated.div>
                        </TrailsText>
                    ))) : <h4>{pageTitle}</h4>}
                </div>
            </TrailsMain>
            <Form onSubmit={(e) => addBeverage(e)}>
                {toggle ? (
                <Fragment>
                    <h5>Ingredients list:</h5>
                    <span>Ingredient name</span>
                    <Input
                        type='text'
                        name='ingredientName'
                        placeholder='ex: Onion'
                        // autoFocus={true}
                        required
                    />
                    <span>Unit yield in grams or mls</span>
                    <Input
                        type='text'
                        name='ingredientName'
                        placeholder='ex: 1k is 1000'
                        required
                    />
                    <span>Unit price per yield</span>
                    <Input
                        type='text'
                        name='ingredientName'
                        placeholder='ex: price per kg 12.50'
                        required
                    />
                    <span>Quantity used</span>
                    <Input
                        type='text'
                        name='ingredientName'
                        placeholder='ex: 500'
                        required
                    />
                </Fragment>
                ) : (
                <Fragment>
                    <span>Recipe name</span>
                    <Input
                        type='text'
                        name='recipeName'
                        placeholder='ex: Lasagna'
                        autoFocus={true}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                    <span>Serves:</span>
                    <Input
                        type='number'
                        name='numberOfIngredients'
                        placeholder='ex: 4'
                        onChange={(e) => setNumberOfPortions(e.target.value)}
                        required
                    />
                </Fragment>
                )}
                <Button theme={theme} type="submit" onClick={changeTilte}>Submit</Button>
            </Form>
        </CreateRecipeComponentWrapper>
    )
}

const CreateRecipeComponentWrapper = styled.div`
    position: fixed;
    width: 100%;
    background-color: #FAFAFA;
    margin-bottom: 2em;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
            box-shadow: 0 10px 6px -6px #777;
`;

const theme = {
    main: 'mediumseagreen',
}

const TrailsMain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TrailsText = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: palevioletred;
  font-size: 1em;
  font-weight: 800;
  text-transform: uppercase;
  will-change: transform, opacity;
  overflow: hidden;
`;

export default CreateRecipe;
