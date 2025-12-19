/**
 * ARCHIVO DE CONFIGURACIÓN DE RETOS
 * Para agregar más, solo copia una línea, cámbiale el ID y el texto.
 */

export interface ItemJuego {
    id: number;
    texto: string;
    tipo: 'VERDAD' | 'RETO';
    nivel: 'NIVEL CAGASTÉN' | 'NIVEL RELA' | ' NIVEL ARREBATAO' | 'NIVEL LA VERGA';
}

export const LISTA_JUEGO: ItemJuego[] = [
    // --- VERDADES ---
    { id: 1, tipo: 'VERDAD', nivel: 'NIVEL CAGASTÉN', texto: '¿Cuál es el cuento más chimbo que has echao para salir de un compromiso?' },
    { id: 2, tipo: 'VERDAD', nivel: 'PUYUO', texto: '¿Alguna vez te han pillao "guillao" hablando con un(a) ex?' },
    { id: 3, tipo: 'VERDAD', nivel: 'ARREBATAO', texto: 'Tira la plena: ¿A quién de este grupo no te aguantas ni un minuto?' },
    { id: 4, tipo: 'VERDAD', nivel: 'PUYUO', texto: '¿Qué es lo más "barro" que has hecho por plata?' },
    { id: 5, tipo: 'VERDAD', nivel: 'PUYUO', texto: 'Tira la plena ¿Te has comido a alguien en este grupo?' },

    // --- RETOS ---
    { id: 6, tipo: 'RETO', nivel: 'SUAVE', texto: 'Párate y baila un pase de champeta "el caballito" por 10 segundos.' },
    { id: 7, tipo: 'RETO', nivel: 'PUYUO', texto: 'Llama a un contacto y dile: "Ajá y qué, ¿te vas a quedar en esa?" y cuelga.' },
    { id: 8, tipo: 'RETO', nivel: 'ARREBATAO', texto: 'Déjate revisar el WhatsApp por la persona que tienes a la derecha.' },
    { id: 9, tipo: 'RETO', nivel: 'SUAVE', texto: 'Pidele prestado un poquito de sal al vecino con voz de borracho.' },
];