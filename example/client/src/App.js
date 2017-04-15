import React from 'react';
import Title from './Title';
import Button from './Button';
import Input from './Input';

export default function App() {
  return (
    <div>
      <Title>You cannot select me!</Title>
      <Button>Click me</Button>
      <Input placeholder="type something"/>
    </div>
  );
}
