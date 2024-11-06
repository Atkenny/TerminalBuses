import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Button from '../components/ButtonAgregar'; // Asegúrate de que este componente sea el adecuado o usa el de React Native directamente.
import { agregarBus } from '../services/firebaseConfig';

const AddBusScreen = () => {
  const [nombre, setNombre] = useState('');
  const [puntoInicio, setPuntoInicio] = useState('');
  const [puntoFin, setPuntoFin] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [horaLlegada, setHoraLlegada] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [precioPasaje, setPrecioPasaje] = useState('');
  const [categoriaBus, setCategoriaBus] = useState('');

  const manejarAgregarBus = async () => {
    if (!nombre || !puntoInicio || !puntoFin || !horaSalida || !horaLlegada || !numeroContacto || !precioPasaje || !categoriaBus) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const nuevoBus = {
      nombre,
      puntoInicio,
      puntoFin,
      horaSalida,
      horaLlegada,
      imagenUrl: imagenUrl || null,
      numeroContacto,
      precioPasaje: parseFloat(precioPasaje),
      categoriaBus,
    };

    try {
      await agregarBus(nuevoBus);
      Alert.alert('Éxito', 'Bus agregado correctamente');
      setNombre('');
      setPuntoInicio('');
      setPuntoFin('');
      setHoraSalida('');
      setHoraLlegada('');
      setImagenUrl('');
      setNumeroContacto('');
      setPrecioPasaje('');
      setCategoriaBus('');
    } catch (error) {
      console.error('Error al agregar el bus: ', error);
      Alert.alert('Error', 'Hubo un problema al agregar el bus.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Agregar Bus</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Punto de Inicio"
          value={puntoInicio}
          onChangeText={setPuntoInicio}
          style={styles.input}
        />
        <TextInput
          placeholder="Punto de Fin"
          value={puntoFin}
          onChangeText={setPuntoFin}
          style={styles.input}
        />
        <TextInput
          placeholder="Hora de Salida"
          value={horaSalida}
          onChangeText={setHoraSalida}
          style={styles.input}
        />
        <TextInput
          placeholder="Hora de Llegada"
          value={horaLlegada}
          onChangeText={setHoraLlegada}
          style={styles.input}
        />
        <TextInput
          placeholder="URL de Imagen (opcional)"
          value={imagenUrl}
          onChangeText={setImagenUrl}
          style={styles.input}
        />
        <TextInput
          placeholder="Número de Contacto"
          value={numeroContacto}
          onChangeText={setNumeroContacto}
          style={styles.input}
        />
        <TextInput
          placeholder="Precio del Pasaje"
          value={precioPasaje}
          onChangeText={setPrecioPasaje}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Categoría del Bus (Privado/Público)"
          value={categoriaBus}
          onChangeText={setCategoriaBus}
          style={styles.input}
        />
      </ScrollView>

      {/* Footer con el botón de agregar */}
      <View style={styles.footer}>
        <Button title="Agregar Bus" onPress={manejarAgregarBus} color="#4CAF50" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 15,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
});

export default AddBusScreen;
