import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { obtenerBuses } from '../services/firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const [buses, setBuses] = useState([]);

  // Función para cargar los buses desde Firebase
  const cargarBuses = async () => {
    try {
      const busesData = await obtenerBuses();
      setBuses(busesData);
    } catch (error) {
      console.error('Error al cargar los buses:', error);
    }
  };

  // Carga inicial de los buses al montar el componente
  useEffect(() => {
    cargarBuses();
  }, []);

  // Se ejecuta cada vez que regresemos a la pantalla HomeScreen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarBuses(); // Recarga la lista cuando la pantalla recibe foco
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buses Registrados</Text>

      <FlatList
        data={buses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.busItem}>
            <Text>{item.nombre}</Text>
            <Text>{item.puntoInicio} - {item.puntoFin}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateBus', { busId: item.id })}
            >
              <Text style={styles.link}>Actualizar Bus</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddBus')}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Agregar Nuevo Bus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  busItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
