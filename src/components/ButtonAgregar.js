// src/components/ButtonAgregar.js
import React from 'react';
import { Button } from 'react-native';

const ButtonAgregar = ({ onPress }) => (
  <Button title="Agregar" onPress={onPress} color="#4CAF50" />
);

export default ButtonAgregar;
