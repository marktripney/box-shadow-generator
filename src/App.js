import React, { useState } from 'react';
import Form from './Form';
import Rectangle from './Rectangle';
import Footer from './Footer';
import CSSCode from './CSSCode';
import '@fontsource/work-sans/700.css';
import '@fontsource/bitter/400.css';
import '@fontsource/roboto-mono/400.css';
import './css/style.css';

const initialState = {
  offsetX: 0,
  offsetY: 0,
  blurRadius: 0,
  spreadRadius: 0,
  shadowType: 'drop',
  colour: '#000',
};

export default function App() {
  const [
    { offsetX, offsetY, blurRadius, spreadRadius, shadowType, colour },
    setState,
  ] = useState(initialState);

  function resetState() {
    setState({ ...initialState });
  }

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  function handleClipboardClick() {
    navigator.clipboard
      // prettier-ignore
      .writeText(
        `box-shadow: ${
          shadowType === 'inset' ? 'inset ' : ''
        }${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${colour};`
      )
      .then(() => {
        console.log('Copied!');
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }

  return (
    <>
      <h1>Box Shadow Generator</h1>
      <div className="container">
        <Rectangle
          style={{
            width: '50%',
            maxWidth: '500px',
            minHeight: '150px',
            border: '1px solid #000',
            boxShadow: `${
              shadowType === 'inset' ? 'inset' : ''
            } ${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${colour}`,
          }}
          handleClick={resetState}
        />
        <Form
          shadowType={shadowType}
          onChangeShadowType={onChange}
          offsetX={offsetX}
          onChangeOffsetX={onChange}
          offsetY={offsetY}
          onChangeOffsetY={onChange}
          blurRadius={blurRadius}
          onChangeBlurRadius={onChange}
          spreadRadius={spreadRadius}
          onChangeSpreadRadius={onChange}
          colour={colour}
          onChangeColour={onChange}
        />
        <CSSCode
          shadowType={shadowType}
          offsetX={offsetX}
          offsetY={offsetY}
          blurRadius={blurRadius}
          spreadRadius={spreadRadius}
          colour={colour}
          onClipboardClick={handleClipboardClick}
        />
      </div>
      <Footer />
    </>
  );
}
