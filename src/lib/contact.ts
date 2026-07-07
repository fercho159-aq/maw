/**
 * Datos de contacto canónicos de MAW Soluciones.
 * Única fuente de verdad: cualquier href (tel:, wa.me) debe derivarse de aquí
 * para que el número mostrado y el número enlazado nunca diverjan.
 */
export const CONTACT_EMAIL = "aldo@mawsoluciones.com";

/** Número tal como se muestra en pantalla. */
export const CONTACT_PHONE_DISPLAY = "55 4131 4150";

/** Número en formato E.164 (México). */
export const CONTACT_PHONE_E164 = "+525541314150";

export const CONTACT_PHONE_TEL_HREF = `tel:${CONTACT_PHONE_E164}`;

export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_E164.replace("+", "")}`;
