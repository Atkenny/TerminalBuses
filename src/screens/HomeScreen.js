// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { obtenerBuses, eliminarBus } from '../services/firebaseConfig';
import ButtonEliminar from '../components/ButtonEliminar';
import ButtonAgregar from '../components/ButtonAgregar';
import ButtonActualizar from '../components/ButtonActualizar';
import ButtonVerMas from '../components/ButtonVerMas';

const HomeScreen = ({ navigation }) => {
  const [buses, setBuses] = useState([]);

  const cargarBuses = async () => {
    try {
      const busesData = await obtenerBuses();
      setBuses(busesData);
    } catch (error) {
      console.error('Error al cargar los buses:', error);
    }
  };

  useEffect(() => {
    cargarBuses();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarBuses();
    });
    return unsubscribe;
  }, [navigation]);

  const handleBusEliminado = (busId) => {
    eliminarBus(busId)
      .then(() => {
        setBuses((prevBuses) => prevBuses.filter((bus) => bus.id !== busId));
      })
      .catch((error) => {
        console.error('Error al eliminar el bus:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buses Registrados</Text>

      <FlatList
        data={buses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.busItem}>
            {item.imagenUrl ? (
              <Image source={{ uri: item.imagenUrl }} style={styles.busImage} />
            ) : (
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>No hay imagen</Text>
              </View>
            )}
            
            <View style={styles.busInfoContainer}>
              <Text style={styles.busName}>{item.nombre}</Text>
              <Text style={styles.busRoute}>{item.puntoInicio} - {item.puntoFin}</Text>
            </View>

            <View style={styles.horizontalButtons}>
              <ButtonActualizar onPress={() => navigation.navigate('UpdateBus', { busId: item.id })} />
              <ButtonVerMas onPress={() => navigation.navigate('BusDetails', { busId: item.id })} />
            </View>

            <View style={styles.eliminarButtonContainer}>
              <ButtonEliminar busId={item.id} onPress={handleBusEliminado} />
            </View>
          </View>
        )}
      />

      <ButtonAgregar onPress={() => navigation.navigate('AddBus')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  busItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  busImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  noImageText: {
    color: '#777',
    fontSize: 16,
  },
  busInfoContainer: {
    marginBottom: 10,
  },
  busName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  busRoute: {
    fontSize: 14,
    color: '#777',
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  eliminarButtonContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default HomeScreen;
