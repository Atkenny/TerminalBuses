// src/components/ButtonEliminar.js
import React from 'react';
import { Button } from 'react-native';

const ButtonEliminar = ({ onPress }) => (
  <Button title="Eliminar" onPress={onPress} color="#F44336" />
);

export default ButtonEliminar;
