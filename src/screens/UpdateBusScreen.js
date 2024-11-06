import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { obtenerBusPorId, actualizarBus } from '../services/firebaseConfig';
import ButtonActualizar from '../components/ButtonActualizar';

const UpdateBusScreen = ({ route, navigation }) => {
  const { busId } = route.params;
  const [nombre, setNombre] = useState('');
  const [puntoInicio, setPuntoInicio] = useState('');
  const [puntoFin, setPuntoFin] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [horaLlegada, setHoraLlegada] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [numeroContacto, setNumeroContacto] = useState('');
  const [precioPasaje, setPrecioPasaje] = useState('');
  const [categoriaBus, setCategoriaBus] = useState('');

  useEffect(() => {
    const obtenerBus = async () => {
      try {
        const bus = await obtenerBusPorId(busId);
        if (bus) {
          setNombre(bus.nombre);
          setPuntoInicio(bus.puntoInicio);
          setPuntoFin(bus.puntoFin);
          setHoraSalida(bus.horaSalida);
          setHoraLlegada(bus.horaLlegada);
          setImagenUrl(bus.imagenUrl);
          setNumeroContacto(bus.numeroContacto);
          setPrecioPasaje(bus.precioPasaje.toString());
          setCategoriaBus(bus.categoriaBus);
        }
      } catch (error) {
        console.error("Error al obtener los datos del bus:", error);
        Alert.alert('Error', 'No se pudo obtener la información del bus');
      }
    };

    obtenerBus();
  }, [busId]);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso requerido", "Se necesita permiso para acceder a la galería.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagenUrl(resultado.uri);
    }
  };

  const manejarActualizarBus = () => {
    const busActualizado = {
      nombre,
      puntoInicio,
      puntoFin,
      horaSalida,
      horaLlegada,
      imagenUrl,
      numeroContacto,
      precioPasaje: parseFloat(precioPasaje),
      categoriaBus,
    };

    actualizarBus(busId, busActualizado)
      .then(() => {
        Alert.alert('Éxito', 'Bus actualizado correctamente');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Error', 'Hubo un problema al actualizar el bus');
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Actualizar Bus</Text>
        
        <TouchableOpacity onPress={seleccionarImagen} style={styles.imagenContainer}>
          {imagenUrl ? (
            <Image source={{ uri: imagenUrl }} style={styles.imagen} />
          ) : (
            <Text style={styles.textoSinImagen}>No hay imagen</Text>
          )}
          <Text style={styles.textoActualizar}>Actualizar Imagen</Text>
        </TouchableOpacity>

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

      <View style={styles.footer}>
        <ButtonActualizar onPress={manejarActualizarBus} />
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
  imagenContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagen: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  textoSinImagen: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  textoActualizar: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 5,
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

export default UpdateBusScreen;
