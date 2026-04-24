'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: {
  name: string;
  whatsapp: string;
  neighborhood: string;
  location: string;
  lots: string;
}) {
  try {
    const { name, whatsapp, neighborhood, location, lots } = formData;

    await resend.emails.send({
      from: 'contacto@landing-gestion-comisiones.com',
      to: 'alenigrelli@gmail.com',
      subject: `Nuevo Lead: ${name} - ${neighborhood}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nuevo Lead desde Landing Page</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Barrio/Consorcio:</strong> ${neighborhood}</p>
            <p><strong>Localidad:</strong> ${location}</p>
            <p><strong>Cantidad de Lotes:</strong> ${lots}</p>
          </div>
          <p style="margin-top: 20px; color: #6b7280;">
            Este lead fue generado desde la landing page de Sistema de Gestión Smart.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
