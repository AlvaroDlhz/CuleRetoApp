import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Dimensions 
} from 'react-native';

// Importamos la lista de retos que creamos arriba
// Si ves un error aquí, asegúrate de haber creado la carpeta src/constants
import { LISTA_JUEGO, ItemJuego } from './src/constants/Retos';

const { width } = Dimensions.get('window');

export default function App() {
  // --- ESTADOS (Memoria de la app) ---
  // Guardamos el reto que se muestra actualmente. Empieza en "null" (vacío).
  const [retoActual, setRetoActual] = useState<ItemJuego | null>(null);

  // --- LÓGICA ---
  // Esta función elige un reto al azar filtrando por Verdad o Reto.
  const generarNuevoReto = (categoria: 'VERDAD' | 'RETO') => {
    // 1. Filtramos la lista completa para quedarnos solo con lo que el usuario pidió
    const opciones = LISTA_JUEGO.filter(item => item.tipo === categoria);
    
    // 2. Elegimos un número al azar entre 0 y el total de opciones
    const indiceAzar = Math.floor(Math.random() * opciones.length);
    
    // 3. Actualizamos la pantalla con el nuevo reto
    setRetoActual(opciones[indiceAzar]);
  };

  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <StatusBar barStyle="light-content" />
      
      {/* CABECERA: Título con estilo Barranquillero */}
      <View style={styles.header}>
        <Text style={styles.emojiLogo}>🌶️</Text>
        <Text style={styles.tituloApp}>CuleReto</Text>
        <Text style={styles.slogan}>¿Quién dijo miedo?</Text>
      </View>

      {/* ÁREA CENTRAL: Donde se muestra la acción */}
      <View style={styles.tarjetaReto}>
        {retoActual ? (
          <View style={styles.contenidoAnimado}>
            {/* Indicador de dificultad (Badge) */}
            <View style={[styles.badge, { backgroundColor: retoActual.tipo === 'RETO' ? '#E63946' : '#457B9D' }]}>
              <Text style={styles.textoBadge}>{retoActual.tipo} • {retoActual.nivel}</Text>
            </View>
            
            {/* Texto del reto */}
            <Text style={styles.textoPrincipal}>{retoActual.texto}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.textoBienvenida}>Elije verdad o reto para comenzar con la recocha 😜</Text>
          </View>
        )}
      </View>

      {/* CONTROLES: Los botones de abajo */}
      <View style={styles.botonera}>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={[styles.botonGeneral, styles.botonVerdad]} 
          onPress={() => generarNuevoReto('VERDAD')}
        >
          <Text style={styles.textoBoton}>VERDAD</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.7}
          style={[styles.botonGeneral, styles.botonReto]} 
          onPress={() => generarNuevoReto('RETO')}
        >
          <Text style={styles.textoBoton}>RETO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- ESTILOS (El diseño visual) ---
const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#000000', // Fondo negro puro como pediste
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  emojiLogo: {
    fontSize: 50,
  },
  tituloApp: {
    fontSize: 45,
    fontWeight: '900',
    color: '#FFD100', // Amarillo (colores de la bandera de B/quilla)
    letterSpacing: 3,
  },
  slogan: {
    color: '#CCCCCC',
    fontSize: 14,
    fontStyle: 'italic',
  },
  tarjetaReto: {
    width: width * 0.85,
    minHeight: 350,
    backgroundColor: '#111111', // Un negro un poquito más claro para la tarjeta
    borderRadius: 30,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    // Sombreado para que resalte un poco
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  contenidoAnimado: {
    alignItems: 'center',
    width: '100%',
  },
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  textoBadge: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  textoPrincipal: {
    color: '#FFFFFF',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 35,
  },
  textoBienvenida: {
    color: '#555555',
    fontSize: 18,
    textAlign: 'center',
  },
  botonera: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  botonGeneral: {
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 15,
    minWidth: 140,
    alignItems: 'center',
  },
  botonVerdad: {
    backgroundColor: '#1D3557',
  },
  botonReto: {
    backgroundColor: '#E63946',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  }
});