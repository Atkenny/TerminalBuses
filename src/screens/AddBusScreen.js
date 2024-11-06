import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../components/ButtonAgregar"; // Asegúrate de que este componente sea el adecuado o usa el de React Native directamente.
import { agregarBus } from "../services/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UUID from 'react-native-uuid'; // Cambia esto para usar react-native-uuid

const AddBusScreen = () => {
  const [nombre, setNombre] = useState("");
  const [puntoInicio, setPuntoInicio] = useState("");
  const [puntoFin, setPuntoFin] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [horaLlegada, setHoraLlegada] = useState("");
  const [imagenUrl, setImagenUrl] = useState(null);
  const [numeroContacto, setNumeroContacto] = useState("");
  const [precioPasaje, setPrecioPasaje] = useState("");
  const [categoriaBus, setCategoriaBus] = useState("");
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se requiere acceso a la galería para seleccionar una imagen.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagenUrl(result.assets[0].uri); // Almacena temporalmente la URI local de la imagen
    }
  };

  const subirImagenAFirebase = async (uri) => {
    try {
      setSubiendoImagen(true);
      const storage = getStorage();
      const nombreArchivo = `images/${UUID.v4()}`; // Cambia para usar react-native-uuid
      const referenciaStorage = ref(storage, nombreArchivo);

      const respuesta = await fetch(uri);
      const blob = await respuesta.blob(); // Convertimos la imagen a un blob para subirla

      // Subir la imagen a Firebase Storage
      await uploadBytes(referenciaStorage, blob);
      const urlDescarga = await getDownloadURL(referenciaStorage);
      
      setSubiendoImagen(false);
      return urlDescarga; // Devuelve la URL de descarga de la imagen
    } catch (error) {
      console.error("Error al subir la imagen: ", error);
      setSubiendoImagen(false);
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
      return null;
    }
  };

  const manejarAgregarBus = async () => {
    if (
      !nombre ||
      !puntoInicio ||
      !puntoFin ||
      !horaSalida ||
      !horaLlegada ||
      !numeroContacto ||
      !precioPasaje ||
      !categoriaBus
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const precioPasajeNum = parseFloat(precioPasaje);
    if (isNaN(precioPasajeNum)) {
      Alert.alert("Error", "El precio del pasaje debe ser un número válido.");
      return;
    }

    let urlImagenFirebase = null;
    if (imagenUrl) {
      urlImagenFirebase = await subirImagenAFirebase(imagenUrl); // Sube la imagen y obtiene la URL de descarga
    }

    const nuevoBus = {
      nombre,
      puntoInicio,
      puntoFin,
      horaSalida,
      horaLlegada,
      imagenUrl: urlImagenFirebase || null,
      numeroContacto,
      precioPasaje: precioPasajeNum,
      categoriaBus,
    };

    try {
      await agregarBus(nuevoBus);
      Alert.alert("Éxito", "Bus agregado correctamente");
      setNombre("");
      setPuntoInicio("");
      setPuntoFin("");
      setHoraSalida("");
      setHoraLlegada("");
      setImagenUrl(null);
      setNumeroContacto("");
      setPrecioPasaje("");
      setCategoriaBus("");
    } catch (error) {
      console.error("Error al agregar el bus: ", error);
      Alert.alert("Error", "Hubo un problema al agregar el bus.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Agregar Bus</Text>
        
        <TouchableOpacity
          style={styles.profilePhotoContainer}
          onPress={seleccionarImagen}
        >
          {imagenUrl ? (
            <Image source={{ uri: imagenUrl }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.addPhotoTextContainer}>
              <Text style={styles.addPhotoText}>Agregar una foto</Text>
            </View>
          )}
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
          keyboardType="numeric"
          onChangeText={setPrecioPasaje}
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
        <Button
          title={subiendoImagen ? "Subiendo Imagen..." : "Agregar Bus"}
          onPress={manejarAgregarBus}
          color="#4CAF50"
          disabled={subiendoImagen}
        />
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  profilePhotoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  addPhotoTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    color: "#aaa",
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 15,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
});

export default AddBusScreen;
