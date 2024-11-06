// ButtonEliminar.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const ButtonEliminar = ({ busId, onPress }) => {
  const handleDeleteConfirmation = () => {
    Alert.alert(
      "Confirmación de Eliminación",
      "¿Estás seguro de que deseas eliminar este registro?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => onPress(busId),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleDeleteConfirmation}>
      <Text style={styles.buttonText}>Eliminar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default ButtonEliminar;
