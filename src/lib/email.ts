import { Resend } from 'resend';
import type { DominioHostinger } from './db/schema';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

const FROM_EMAIL = process.env.FROM_EMAIL || 'sistema@mawsoluciones.com';

type ReminderType = '7_dias' | '3_dias' | 'mismo_dia';

const tipoLabels: Record<ReminderType, string> = {
    '7_dias': '7 días',
    '3_dias': '3 días',
    'mismo_dia': 'HOY',
};

const tipoColors: Record<ReminderType, string> = {
    '7_dias': '#f59e0b',
    '3_dias': '#f97316',
    'mismo_dia': '#ef4444',
};

function buildHtml(dominios: DominioHostinger[], tipo: ReminderType): string {
    const label = tipoLabels[tipo];
    const color = tipoColors[tipo];
    const isToday = tipo === 'mismo_dia';

    const rows = dominios
        .map(
            (d) => `
        <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
                ${d.dominio}
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
                ${d.status}
            </td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
                ${new Date(d.fecha_expiracion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
            </td>
        </tr>`
        )
        .join('');

    return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="background: ${color}; padding: 24px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 22px;">
                        ${isToday ? '⚠️ Dominios expiran HOY' : `📅 Dominios expiran en ${label}`}
                    </h1>
                </div>
                <div style="padding: 24px;">
                    <p style="color: #374151; font-size: 14px; margin-bottom: 16px;">
                        ${isToday
            ? `Los siguientes <strong>${dominios.length}</strong> dominio(s) expiran <strong>hoy</strong>. Renovar de inmediato para evitar la pérdida.`
            : `Los siguientes <strong>${dominios.length}</strong> dominio(s) expiran en <strong>${label}</strong>. Por favor, gestiona su renovación a tiempo.`
        }
                    </p>
                    <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <thead>
                            <tr style="background: #f9fafb;">
                                <th style="padding: 12px 16px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; border-bottom: 2px solid #e5e7eb;">Dominio</th>
                                <th style="padding: 12px 16px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; border-bottom: 2px solid #e5e7eb;">Status</th>
                                <th style="padding: 12px 16px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; border-bottom: 2px solid #e5e7eb;">Fecha Expiración</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows}
                        </tbody>
                    </table>
                    <p style="color: #9ca3af; font-size: 12px; margin-top: 24px; text-align: center;">
                        Este es un recordatorio automático del sistema MAW Soluciones.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>`;
}

export async function sendRenewalReminder(dominios: DominioHostinger[], tipo: ReminderType): Promise<void> {
    const recipients = process.env.REMINDER_EMAILS || '';
    if (!recipients) throw new Error('REMINDER_EMAILS no configurado');

    const label = tipoLabels[tipo];
    const isToday = tipo === 'mismo_dia';
    const subject = isToday
        ? `⚠️ URGENTE: ${dominios.length} dominio(s) expiran HOY`
        : `📅 Recordatorio: ${dominios.length} dominio(s) expiran en ${label}`;

    await resend.emails.send({
        from: `MAW Sistemas <${FROM_EMAIL}>`,
        to: recipients.split(',').map(e => e.trim()),
        subject,
        html: buildHtml(dominios, tipo),
    });
}

// --- FEEDBACK EMAILS ---

interface FeedbackNotificationData {
    clientName: string;
    clientEmail: string;
    projectName: string;
    siteUrl: string;
    content: string;
    pageUrl: string;
    priority: string;
}

const priorityLabels: Record<string, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
};

const priorityColors: Record<string, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
};

export async function sendFeedbackNotification(data: FeedbackNotificationData): Promise<void> {
    const recipients = process.env.FEEDBACK_NOTIFICATION_EMAILS;
    if (!recipients) return;

    const prioLabel = priorityLabels[data.priority] || data.priority;
    const prioColor = priorityColors[data.priority] || '#6b7280';

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:24px;">
            <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <div style="background:#3b82f6;padding:24px;text-align:center;">
                    <h1 style="color:white;margin:0;font-size:20px;">💬 Nuevo Feedback Recibido</h1>
                </div>
                <div style="padding:24px;">
                    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                        <tr>
                            <td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Proyecto:</td>
                            <td style="padding:8px 0;font-size:14px;font-weight:600;">${data.projectName}</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;color:#6b7280;font-size:13px;">Cliente:</td>
                            <td style="padding:8px 0;font-size:14px;">${data.clientName} (${data.clientEmail})</td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;color:#6b7280;font-size:13px;">Página:</td>
                            <td style="padding:8px 0;font-size:14px;"><a href="${data.pageUrl}" style="color:#3b82f6;">${data.pageUrl}</a></td>
                        </tr>
                        <tr>
                            <td style="padding:8px 0;color:#6b7280;font-size:13px;">Prioridad:</td>
                            <td style="padding:8px 0;font-size:14px;"><span style="background:${prioColor};color:white;padding:2px 10px;border-radius:12px;font-size:12px;">${prioLabel}</span></td>
                        </tr>
                    </table>
                    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-top:8px;">
                        <p style="color:#6b7280;font-size:12px;margin:0 0 8px 0;text-transform:uppercase;">Comentario:</p>
                        <p style="color:#1f2937;font-size:14px;margin:0;line-height:1.5;">${data.content}</p>
                    </div>
                    <p style="color:#9ca3af;font-size:12px;margin-top:24px;text-align:center;">
                        Notificación automática del sistema de Feedback — MAW Soluciones
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    await resend.emails.send({
        from: `MAW Feedback <${FROM_EMAIL}>`,
        to: recipients.split(',').map(e => e.trim()),
        subject: `💬 Nuevo feedback de ${data.clientName} — ${data.projectName}`,
        html,
    });
}

interface FeedbackConfirmationData {
    clientEmail: string;
    clientName: string;
    projectName: string;
    commentContent: string;
    newStatus: string;
    adminNotes?: string;
}

const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    in_progress: 'En Progreso',
    resolved: 'Resuelto',
    dismissed: 'Descartado',
};

const statusColors: Record<string, string> = {
    pending: '#f59e0b',
    in_progress: '#3b82f6',
    resolved: '#22c55e',
    dismissed: '#6b7280',
};

const statusIcons: Record<string, string> = {
    pending: '⏳',
    in_progress: '🔧',
    resolved: '✅',
    dismissed: '🚫',
};

export async function sendFeedbackConfirmation(data: FeedbackConfirmationData): Promise<void> {
    const label = statusLabels[data.newStatus] || data.newStatus;
    const color = statusColors[data.newStatus] || '#6b7280';
    const icon = statusIcons[data.newStatus] || '📋';

    const notesSection = data.adminNotes
        ? `<div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-top:16px;">
            <p style="color:#92400e;font-size:12px;margin:0 0 8px 0;text-transform:uppercase;">Nota del equipo:</p>
            <p style="color:#78350f;font-size:14px;margin:0;line-height:1.5;">${data.adminNotes}</p>
           </div>`
        : '';

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:24px;">
            <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <div style="background:${color};padding:24px;text-align:center;">
                    <h1 style="color:white;margin:0;font-size:20px;">${icon} Actualización de tu Feedback</h1>
                </div>
                <div style="padding:24px;">
                    <p style="color:#374151;font-size:14px;margin-bottom:16px;">
                        Hola <strong>${data.clientName}</strong>, te informamos que tu comentario en el proyecto
                        <strong>${data.projectName}</strong> ha sido actualizado.
                    </p>
                    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;">
                        <p style="color:#6b7280;font-size:12px;margin:0 0 8px 0;text-transform:uppercase;">Tu comentario:</p>
                        <p style="color:#1f2937;font-size:14px;margin:0 0 12px 0;line-height:1.5;">${data.commentContent}</p>
                        <p style="margin:0;">
                            <span style="color:#6b7280;font-size:13px;">Nuevo estado: </span>
                            <span style="background:${color};color:white;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600;">${label}</span>
                        </p>
                    </div>
                    ${notesSection}
                    <p style="color:#9ca3af;font-size:12px;margin-top:24px;text-align:center;">
                        Este es un mensaje automático del equipo de MAW Soluciones.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    await resend.emails.send({
        from: `MAW Soluciones <${FROM_EMAIL}>`,
        to: [data.clientEmail],
        subject: `${icon} Tu feedback ha sido ${label.toLowerCase()} — ${data.projectName}`,
        html,
    });
}
