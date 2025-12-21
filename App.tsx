import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Linking,
  ScrollView,
  Image // <-- IMPORTANTE: Agregado para soportar las imágenes de los anuncios
} from 'react-native';
import * as Updates from 'expo-updates';

// Importamos las constantes
import { LISTA_JUEGO, ItemJuego, NIVELES_DISPONIBLES } from './src/constants/Retos';
import { LISTA_ANUNCIOS, AnuncioNativo } from './src/constants/Anuncios';

const { width } = Dimensions.get('window');

export default function App() {
  const [retoActual, setRetoActual] = useState<ItemJuego | null>(null);
  const [anuncioActual, setAnuncioActual] = useState<AnuncioNativo | null>(null);
  const [contadorTurnos, setContadorTurnos] = useState(0);
  const [esAnuncio, setEsAnuncio] = useState(false);
  const [nivelFiltro, setNivelFiltro] = useState<string>('TODOS');

  useEffect(() => {
    async function updateApp() {
      if (__DEV__) return;
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    updateApp();
  }, []);

  const generarNuevoReto = (categoria: 'VERDAD' | 'RETO') => {
    const nuevoTurno = contadorTurnos + 1;

    if (nuevoTurno >= 10) {
      const azarIdx = Math.floor(Math.random() * LISTA_ANUNCIOS.length);
      setAnuncioActual(LISTA_ANUNCIOS[azarIdx]);
      setEsAnuncio(true);
      setContadorTurnos(0);
      return;
    }

    let opciones = LISTA_JUEGO.filter(item => item.tipo === categoria);
    if (nivelFiltro !== 'TODOS') {
      opciones = opciones.filter(item => item.nivel === nivelFiltro);
    }

    if (opciones.length === 0) {
      alert(`¡Ajá! No hay más retos ${nivelFiltro} de este tipo.`);
      return;
    }

    setEsAnuncio(false);
    setContadorTurnos(nuevoTurno);
    const indiceAzar = Math.floor(Math.random() * opciones.length);
    setRetoActual(opciones[indiceAzar]);
  };

  return (
    <SafeAreaView style={styles.contenedorPrincipal}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.emojiLogo}>🌶️</Text>
        <Text style={styles.tituloApp}>CuleReto</Text>
        <Text style={styles.slogan}>¿Quién dijo miedo?</Text>
      </View>

      <View style={styles.contenedorFiltros}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollFiltros}>
          {['TODOS', ...NIVELES_DISPONIBLES].map((nivel) => (
            <TouchableOpacity
              key={nivel}
              style={[styles.chipFiltro, nivelFiltro === nivel && styles.chipFiltroActivo]}
              onPress={() => setNivelFiltro(nivel)}
            >
              <Text style={[styles.textoChip, nivelFiltro === nivel && styles.textoChipActivo]}>{nivel}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={[
        styles.tarjetaReto,
        esAnuncio && { borderColor: anuncioActual?.colorResalte || '#E5BE01', borderWidth: 2 }
      ]}>
        {esAnuncio && anuncioActual ? (
          <View style={styles.contenidoAnimado}>
            <View style={[styles.badgeAnuncio, { backgroundColor: anuncioActual.colorResalte }]}>
              <Text style={styles.textoBadgeAnuncio}>AD</Text>
            </View>

            {/* LÓGICA DE IMAGEN VS EMOJI */}
            {anuncioActual.imagenUrl ? (
              <Image
                source={{ uri: anuncioActual.imagenUrl }}
                style={styles.imagenAnuncio}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.emojiAnuncio}>{anuncioActual.emoji}</Text>
            )}

            <Text style={[styles.textoAnuncioTitulo, { color: anuncioActual.colorResalte }]}>
              {anuncioActual.titulo}
            </Text>
            <Text style={styles.textoAnuncioSub}>{anuncioActual.descripcion}</Text>
          </View>
        ) : retoActual ? (
          <View style={styles.contenidoAnimado}>
            <View style={[styles.badge, { backgroundColor: retoActual.tipo === 'RETO' ? '#E63946' : '#457B9D' }]}>
              <Text style={styles.textoBadge}>{retoActual.tipo} • {retoActual.nivel}</Text>
            </View>
            <Text style={styles.textoPrincipal}>{retoActual.texto}</Text>
          </View>
        ) : (
          <Text style={styles.textoBienvenida}>Elige un nivel arriba y dale al botón 😜</Text>
        )}
      </View>

      <View style={styles.botonera}>
        <TouchableOpacity
          style={[styles.botonGeneral, styles.botonVerdad, esAnuncio && styles.botonAnuncioSaltar]}
          onPress={() => generarNuevoReto('VERDAD')}
        >
          <Text style={styles.textoBoton}>{esAnuncio ? "SALTAR" : "VERDAD"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonGeneral, styles.botonReto, esAnuncio && { backgroundColor: anuncioActual?.colorResalte || '#E5BE01' }]}
          onPress={() => generarNuevoReto('RETO')}
        >
          <Text style={[styles.textoBoton, esAnuncio && { color: '#000' }]}>
            {esAnuncio ? (anuncioActual?.cta || "CONTINUAR") : "RETO"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: { flex: 1, backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30 },
  header: { alignItems: 'center', marginTop: 10 },
  emojiLogo: { fontSize: 40 },
  tituloApp: { fontSize: 38, fontWeight: '900', color: '#E5BE01', letterSpacing: 2 },
  slogan: { color: '#666', fontSize: 13, fontStyle: 'italic' },
  contenedorFiltros: { height: 50, marginVertical: 10, width: '100%' },
  scrollFiltros: { paddingHorizontal: 20, alignItems: 'center' },
  chipFiltro: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1A1A1A', marginRight: 10, borderWidth: 1, borderColor: '#333' },
  chipFiltroActivo: { backgroundColor: '#E5BE01', borderColor: '#E5BE01' },
  textoChip: { color: '#888', fontWeight: 'bold', fontSize: 12 },
  textoChipActivo: { color: '#000' },
  tarjetaReto: { width: width * 0.85, minHeight: 380, backgroundColor: '#111', borderRadius: 30, padding: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  contenidoAnimado: { alignItems: 'center', width: '100%' },
  badge: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginBottom: 20 },
  textoBadge: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  textoPrincipal: { color: '#FFF', fontSize: 24, textAlign: 'center', fontWeight: '600', lineHeight: 32 },
  textoBienvenida: { color: '#555', fontSize: 18, textAlign: 'center' },
  botonera: { flexDirection: 'row', gap: 15, marginBottom: 10 },
  botonGeneral: { paddingVertical: 18, paddingHorizontal: 30, borderRadius: 15, minWidth: 140, alignItems: 'center' },
  botonVerdad: { backgroundColor: '#1D3557' },
  botonReto: { backgroundColor: '#E63946' },
  textoBoton: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  botonAnuncioSaltar: { backgroundColor: '#333' },
  badgeAnuncio: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 5, marginBottom: 15 },
  textoBadgeAnuncio: { color: '#000', fontWeight: '900', fontSize: 10 },
  emojiAnuncio: { fontSize: 60, marginBottom: 15 },

  // --- NUEVOS ESTILOS PARA LA IMAGEN 1:1 ---
  imagenAnuncio: {
    width: width * 0.5, // 50% del ancho de pantalla para que quepa bien en la tarjeta
    height: width * 0.5, // Mismo ancho que alto para formato 1:1
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#222', // Fondo de carga
  },

  textoAnuncioTitulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  textoAnuncioSub: { color: '#AAA', fontSize: 15, textAlign: 'center', lineHeight: 20 }
});