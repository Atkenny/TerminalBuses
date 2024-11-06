import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { obtenerBusPorId } from '../services/firebaseConfig';

const BusDetailsScreen = ({ route }) => {
  const { busId } = route.params;
  const [bus, setBus] = useState(null);

  // Función para cargar la información del bus
  const cargarBus = async () => {
    try {
      const busData = await obtenerBusPorId(busId);
      setBus(busData);
    } catch (error) {
      console.error('Error al cargar el bus:', error);
    }
  };

  useEffect(() => {
    cargarBus();
  }, [busId]);

  if (!bus) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del bus...</Text>
      </View>
    );
  }

  // Función para llamar al contacto
  const llamarContacto = () => {
    const telefono = bus.numeroContacto;
    const url = `tel:${telefono}`;
    Linking.openURL(url).catch((err) => console.error('Error al abrir la aplicación de teléfono', err));
  };

  return (
    <ScrollView style={[styles.container, { paddingBottom: 150 }]} contentContainerStyle={{ flexGrow: 1 }}>
      {bus.imagenUrl ? (
        <Image source={{ uri: bus.imagenUrl }} style={styles.busImage} />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No hay imagen disponible</Text>
        </View>
      )}

      <Text style={styles.title}>{bus.nombre}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}><Text style={styles.bold}>Categoría:</Text> {bus.categoriaBus}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Hora de llegada:</Text> {bus.horaLlegada}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Hora de salida:</Text> {bus.horaSalida}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Punto de inicio:</Text> {bus.puntoInicio}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Punto de fin:</Text> {bus.puntoFin}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Número de contacto:</Text> {bus.numeroContacto}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Precio del pasaje:</Text> ${bus.precioPasaje}</Text>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={llamarContacto}>
        <Text style={styles.callButtonText}>Llamar a contacto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  busImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noImageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noImageText: {
    color: '#888',
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detail: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    zIndex: 10,
    position: 'relative',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BusDetailsScreen;
