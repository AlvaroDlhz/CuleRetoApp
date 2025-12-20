/**
 * BASE DE DATOS DE ANUNCIOS NATIVOS
 * Aquí puedes vender espacios a negocios locales.
 */

export interface AnuncioNativo {
    id: number;
    emoji: string;
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
        colorResalte: '#E5BE01'
    }
];