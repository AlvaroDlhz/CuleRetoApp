/**
 * BASE DE DATOS DE ANUNCIOS NATIVOS
 * Actualizada para soportar imágenes 1:1 conservando compatibilidad con emojis.
 */

export interface AnuncioNativo {
    id: number;
    emoji: string;
    // Agregamos imagenUrl como opcional (?) para no romper los anuncios existentes
    imagenUrl?: string; 
    titulo: string;
    descripcion: string;
    cta: string; // Call to action (Lo que dirán los botones)
    colorResalte: string;
}

export const LISTA_ANUNCIOS: AnuncioNativo[] = [
    {
        id: 1,
        emoji: '🍟',
        titulo: '¡Bajonao con Sabor!',
        descripcion: 'Después de tanto CuleReto, una salchipapa de "Donde Lucho" es lo que cae bien. Calle 72 con 43.',
        cta: '¡PIDE YA!',
        colorResalte: '#E5BE01'
    },
    {
        id: 2,
        emoji: '🍻',
        titulo: '¿Mucha Verdad?',
        descripcion: 'Pasa el trago amargo con una fría bien muerta en "La Estación". Promoción en cubetazos hoy.',
        cta: 'VER UBICACIÓN',
        colorResalte: '#E5BE01'
    },
    {
        id: 3,
        emoji: '👗',
        titulo: 'Ponte la del Carnaval',
        descripcion: 'Camisetas puyuas para el desorden en la Vía 40. Encuéntranos en el C.C. Portal del Prado.',
        cta: 'VER CATÁLOGO',
        colorResalte: '#E5BE01'
    },
    {
        id: 4,
        emoji: '🤑',
        titulo: '¡Tu negocio podría estar aquí!',
        descripcion: 'Dale al botón "Conoce más" para pautar con nosotros',
        cta: '¡CONOCE MÁS!',
        colorResalte: '#FFF'
    },
    // --- NUEVO ANUNCIO DE EJEMPLO CON IMAGEN 1:1 ---
    {
        id: 5,
        emoji: '📸', // Mantenemos el emoji como respaldo (fallback)
        imagenUrl: '', 
        titulo: 'La Burger de la Cuadra',
        descripcion: 'La verdadera burger barranquillera con todo. ¡Pídela ahora y no te acharles!',
        cta: 'PIDE POR WHATSAPP',
        colorResalte: '#17c69b' // Un naranja fuerte para resaltar la comida
    },
    {
        id: 6,
        emoji: '🍻', // Mantenemos el emoji como respaldo (fallback)
        imagenUrl: '', 
        titulo: '¿ANDAS EN LA SECA?',
        descripcion: '🍻 Mandate las frías. Domi gratis a toda killa',
        cta: 'PIDE POR WHATSAPP',
        colorResalte: '#17c69b' // Un naranja fuerte para resaltar la comida
    },
    {
        id: 7,
        emoji: '🤑', // Mantenemos el emoji como respaldo (fallback)
        imagenUrl: '', 
        titulo: '¡PUBLICITATE AQUÍ!',
        descripcion: 'Dale a "conoce más" y hablamos',
        cta: '¡CONOCE MÁS!',
        colorResalte: '#fff' // Un naranja fuerte para resaltar la comida
    }
];