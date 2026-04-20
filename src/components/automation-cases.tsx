import { Bot, Calendar, LineChart, ListTodo, MessageCircle } from "lucide-react";

export const automationCases = [
  { 
    href: "/servicios/automatizacion/chatbot", 
    label: "Chatbot Inteligente",
    description: "Atiende a tus clientes 24/7 con un chatbot que responde preguntas frecuentes y califica leads.",
    icon: <Bot className="w-5 h-5" />
  },
  { 
    href: "/servicios/automatizacion/agendamiento-automatico", 
    label: "Agendamiento Automático",
    description: "Permite que tu chatbot agende reuniones directamente en tu calendario, sin intervención humana.",
    icon: <Calendar className="w-5 h-5" />
  },
  { 
    href: "/servicios/automatizacion/analisis-tendencias", 
    label: "Análisis de Mercado",
    description: "Recibe reportes automáticos sobre tendencias, noticias y movimientos de la competencia en tu industria.",
    icon: <LineChart className="w-5 h-5" />
  },
  { 
    href: "/servicios/automatizacion/seguimiento-pendientes", 
    label: "Seguimiento de Equipo",
    description: "Envía recordatorios y resúmenes diarios a tus empleados sobre sus tareas y pendientes.",
    icon: <ListTodo className="w-5 h-5" />
  },
  { 
    href: "/servicios/automatizacion/cobranza-recurrente", 
    label: "Cobranza Automática",
    description: "Automatiza el envío de recordatorios de pago y facturas recurrentes por WhatsApp y email.",
    icon: <MessageCircle className="w-5 h-5" />
  },
];
