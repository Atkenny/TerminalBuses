// ButtonActualizar.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonActualizar = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Actualizar</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#66BB6A',  // Verde brillante pero suave
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',          // Sombra para darle profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 3,                 // Para Android
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ButtonActualizar;
