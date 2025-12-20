import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Dimensions 
} from 'react-native';
import * as Updates from 'expo-updates';
import { LISTA_JUEGO, ItemJuego } from './src/constants/Retos';

const { width } = Dimensions.get('window');

export default function App() {
  const [retoActual, setRetoActual] = useState<ItemJuego | null>(null);
  const [contadorTurnos, setContadorTurnos] = useState(0);
  
  // Estado para saber si lo que estamos viendo es un anuncio o un reto
  const [esAnuncio, setEsAnuncio] = useState(false);

  // Lógica de EAS Update
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

    // Si toca anuncio (cada 10 turnos)
    if (nuevoTurno >= 10) {
      setEsAnuncio(true);
      setContadorTurnos(0); // Reiniciamos contador
      return;
    }

    // Flujo normal de reto
    setEsAnuncio(false);
    setContadorTurnos(nuevoTurno);
    const opciones = LISTA_JUEGO.filter(item => item.tipo === categoria);
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

      {/* TARJETA ÚNICA (Se adapta si es anuncio o reto) */}
      <View style={[styles.tarjetaReto, esAnuncio && styles.tarjetaAnuncioBorde]}>
        {esAnuncio ? (
          <View style={styles.contenidoAnimado}>
            <View style={styles.badgeAnuncio}>
              <Text style={styles.textoBadgeAnuncio}>ANUNCIO</Text>
            </View>
            <Text style={styles.emojiAnuncio}>🍔</Text>
            <Text style={styles.textoAnuncioTitulo}>Aquí podría aparecer tu negocio</Text>
            <Text style={styles.textoAnuncioSub}>Toca el cuadro para saber más</Text>
          </View>
        ) : retoActual ? (
          <View style={styles.contenidoAnimado}>
            <View style={[styles.badge, { backgroundColor: retoActual.tipo === 'RETO' ? '#E63946' : '#457B9D' }]}>
              <Text style={styles.textoBadge}>{retoActual.tipo} • {retoActual.nivel}</Text>
            </View>
            <Text style={styles.textoPrincipal}>{retoActual.texto}</Text>
          </View>
        ) : (
          <Text style={styles.textoBienvenida}>Elige para comenzar la recocha 😜</Text>
        )}
      </View>

      <View style={styles.botonera}>
        <TouchableOpacity 
          style={[styles.botonGeneral, styles.botonVerdad]} 
          onPress={() => generarNuevoReto('VERDAD')}
        >
          <Text style={styles.textoBoton}>{esAnuncio ? "SALTAR" : "VERDAD"}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botonGeneral, styles.botonReto]} 
          onPress={() => generarNuevoReto('RETO')}
        >
          <Text style={styles.textoBoton}>{esAnuncio ? "CONTINUAR" : "RETO"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Estilos base iguales al anterior) ...
  contenedorPrincipal: { flex: 1, backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 30 },
  header: { alignItems: 'center', marginTop: 20 },
  emojiLogo: { fontSize: 50 },
  tituloApp: { fontSize: 45, fontWeight: '900', color: '#FFD100' },
  slogan: { color: '#666', fontSize: 14, fontStyle: 'italic' },
  tarjetaReto: { width: width * 0.85, minHeight: 380, backgroundColor: '#111', borderRadius: 30, padding: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  contenidoAnimado: { alignItems: 'center', width: '100%' },
  badge: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginBottom: 20 },
  textoBadge: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  textoPrincipal: { color: '#FFF', fontSize: 26, textAlign: 'center', fontWeight: '600' },
  textoBienvenida: { color: '#555', fontSize: 18, textAlign: 'center' },
  botonera: { flexDirection: 'row', gap: 20, marginBottom: 20 },
  botonGeneral: { paddingVertical: 18, paddingHorizontal: 35, borderRadius: 15, minWidth: 140, alignItems: 'center' },
  botonVerdad: { backgroundColor: '#1D3557' },
  botonReto: { backgroundColor: '#E63946' },
  textoBoton: { color: '#FFF', fontWeight: '800', fontSize: 16 },

  // --- ESTILOS ESPECÍFICOS PARA EL ANUNCIO INTEGRADO ---
  tarjetaAnuncioBorde: {
    borderColor: '#FFD100', // Borde amarillo para resaltar sutilmente
    borderWidth: 2,
  },
  badgeAnuncio: {
    backgroundColor: '#FFD100',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 15,
  },
  textoBadgeAnuncio: { color: '#000', fontWeight: '900', fontSize: 10 },
  emojiAnuncio: { fontSize: 60, marginBottom: 15 },
  textoAnuncioTitulo: { color: '#FFD100', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  textoAnuncioSub: { color: '#AAA', fontSize: 16, textAlign: 'center', lineHeight: 22 }
});