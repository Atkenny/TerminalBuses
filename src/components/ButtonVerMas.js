// ButtonVerMas.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonVerMas = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Ver más</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#42A5F5',  // Azul claro brillante
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

export default ButtonVerMas;
