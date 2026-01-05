"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Minimize2, ChevronRight, Loader2 } from "lucide-react";
import { useLeads } from "../lib/store";
import clsx from "clsx";
import { useBooking } from "../context/BookingContext";

// --- Types ---

type StepId =
    | 'WELCOME'
    | 'WEB_DEV'
    | 'AUTOMATION'
    | 'CRM'
    | 'PRICING_MENU'
    | 'CONTACT_HUMAN'
    | 'WEB_LANDING'
    | 'WEB_CORP'
    | 'WEB_CUSTOM'
    | 'AUTO_SALES'
    | 'AUTO_SUPPORT'
    | 'CRM_NO'
    | 'CRM_YES'
    | 'QUALIFY_BUDGET'
    | 'QUALIFY_TIME'
    | 'CLOSING_DISCOVERY'
    | 'DEFAULT';

interface QuickReply {
    label: string;
    nextStep?: StepId;
    url?: string;
}

interface ChatStep {
    id: StepId;
    messages: string[]; // Array to allow sending multiple bubbles in sequence
    options?: QuickReply[];
}

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
    isTyping?: boolean;
}

// --- Data: Conversation Flow ---

const FLOW: Record<StepId, ChatStep> = {
    WELCOME: {
        id: 'WELCOME',
        messages: [
            "👋 Soy Helixx AI. Diseño sistemas digitales que automatizan ventas y escalan negocios.",
            "¿Qué estás buscando hoy?"
        ],
        options: [
            { label: "🌐 Página web", nextStep: "WEB_DEV" },
            { label: "⚙️ Automatización / IA", nextStep: "AUTOMATION" },
            { label: "🧠 CRM", nextStep: "CRM" },
            { label: "💰 Precios", nextStep: "PRICING_MENU" },
            { label: "📞 Hablar con humano", nextStep: "CONTACT_HUMAN" }
        ]
    },
    WEB_DEV: {
        id: 'WEB_DEV',
        messages: ["¿Qué tipo de sitio necesitas?"],
        options: [
            { label: "Landing Page ($800+)", nextStep: "WEB_LANDING" },
            { label: "Sitio Corporativo ($1.5k+)", nextStep: "WEB_CORP" },
            { label: "Web a Medida / App", nextStep: "WEB_CUSTOM" },
            { label: "🔙 Volver", nextStep: "WELCOME" }
        ]
    },
    AUTOMATION: {
        id: 'AUTOMATION',
        messages: ["¿Qué proceso quieres automatizar?"],
        options: [
            { label: "Ventas / Leads", nextStep: "AUTO_SALES" },
            { label: "Atención al Cliente", nextStep: "AUTO_SUPPORT" },
            { label: "Todo el negocio", nextStep: "QUALIFY_BUDGET" }
        ]
    },
    CRM: {
        id: 'CRM',
        messages: ["¿Ya usas algún CRM actualmente?"],
        options: [
            { label: "No, usamos Excel/Papel", nextStep: "CRM_NO" },
            { label: "Sí, pero no nos sirve", nextStep: "CRM_YES" }
        ]
    },
    PRICING_MENU: {
        id: 'PRICING_MENU',
        messages: ["Aquí tienes una referencia de nuestros precios base:",
            "💻 **Landing Page**: Desde $800 USD\n🌐 **Web Corporativa**: Desde $1,500 USD\n🛒 **E-commerce**: Desde $2,000 USD\n🧠 **CRM + IA**: Desde $3,000 USD",
            "El precio final depende del alcance. Siempre hacemos diagnóstico primero."
        ],
        options: [
            { label: "Quiero un Presupuesto", nextStep: "QUALIFY_BUDGET" },
            { label: "Ver Servicios", nextStep: "WELCOME" }
        ]
    },
    CONTACT_HUMAN: {
        id: 'CONTACT_HUMAN',
        messages: ["Perfecto. Hablemos de negocios.", "¿Cómo prefieres contactarnos?"],
        options: [
            { label: "📅 Agendar Llamada", nextStep: "CLOSING_DISCOVERY" }, // Use Internal Modal
            { label: "💬 WhatsApp", nextStep: "CLOSING_DISCOVERY", url: "https://wa.me/123456789" },
            { label: "📧 Email", nextStep: "CLOSING_DISCOVERY", url: "mailto:hello@helixx.studio" }
        ]
    },
    // --- Specific Flows ---
    WEB_LANDING: {
        id: 'WEB_LANDING',
        messages: ["Perfecto. Las Landings son nuestra especialidad para convertir tráfico en dinero.", "Incluye: Diseño UI futurista, Copy persuasivo e Integración con WhatsApp."],
        options: [{ label: "Me interesa, sigamos", nextStep: "QUALIFY_BUDGET" }]
    },
    WEB_CORP: {
        id: 'WEB_CORP',
        messages: ["Entendido. Un sitio corporativo eleva tu autoridad.", "Incluye: Desarrollo a medida (Next.js), Panel autoadministrable y SEO técnico base."],
        options: [{ label: "Me interesa, sigamos", nextStep: "QUALIFY_BUDGET" }]
    },
    WEB_CUSTOM: {
        id: 'WEB_CUSTOM',
        messages: ["Desarrollo de alto nivel. Aquí es donde brillamos.", "Creamos plataformas SaaS, Dashboards y Sistemas complejos."],
        options: [{ label: "Hablemos del proyecto", nextStep: "QUALIFY_BUDGET" }]
    },
    AUTO_SALES: {
        id: 'AUTO_SALES',
        messages: ["Automatizar ventas es la clave para escalar.", "Podemos crear bots que califiquen leads y los agenden automáticamente en tu calendario."],
        options: [{ label: "Lo necesito", nextStep: "QUALIFY_BUDGET" }]
    },
    AUTO_SUPPORT: {
        id: 'AUTO_SUPPORT',
        messages: ["Reducir soporte manual te ahorra miles de dólares.", "Implementamos Chatbots con IA entrenados con TU información."],
        options: [{ label: "Me interesa", nextStep: "QUALIFY_BUDGET" }]
    },
    CRM_NO: {
        id: 'CRM_NO',
        messages: ["Es el momento perfecto para empezar ordenado.", "Desarrollamos CRMs adaptados a tu flujo de venta, no al revés."],
        options: [{ label: "Ver planes", nextStep: "PRICING_MENU" }]
    },
    CRM_YES: {
        id: 'CRM_YES',
        messages: ["Entiendo, migrar a algo que sí funcione es vital.", "Podemos auditar tu proceso actual y proponer una optimización."],
        options: [{ label: "Auditoría Gratuita", nextStep: "CLOSING_DISCOVERY" }]
    },
    // --- Qualification & Closing ---
    QUALIFY_BUDGET: {
        id: 'QUALIFY_BUDGET',
        messages: ["Para darte la mejor solución, necesito una idea de tu inversión aproximada:", "Esto garantiza que diseñemos algo viable para ti."],
        options: [
            { label: "Menos de $1,000 USD", nextStep: "CLOSING_DISCOVERY" },
            { label: "$1,000 - $5,000 USD", nextStep: "CLOSING_DISCOVERY" },
            { label: "Más de $5,000 USD", nextStep: "CLOSING_DISCOVERY" }
        ]
    },
    QUALIFY_TIME: {
        id: 'QUALIFY_TIME',
        messages: ["¿Para cuándo tienes planeado iniciar este proyecto?", "La disponibilidad es clave para planificar el sprint."],
        options: [
            { label: "Lo antes posible (ASAP)", nextStep: "CLOSING_DISCOVERY" },
            { label: "En 1-2 meses", nextStep: "CLOSING_DISCOVERY" },
            { label: "Solo estoy investigando", nextStep: "WELCOME" }
        ]
    },
    CLOSING_DISCOVERY: {
        id: 'CLOSING_DISCOVERY',
        messages: [
            "Excelente. Helixx no es para todos, pero parece que tenemos fit.",
            "El siguiente paso es una llamada estratégica de 15 min para revisar tu caso."
        ],
        options: [
            { label: "📅 Agendar ahora", nextStep: "CLOSING_DISCOVERY" }, // Removed URL to force internal handler
            { label: "Dejar mis datos", nextStep: "WELCOME" } // In a real app could open a form
        ]
    },
    DEFAULT: {
        id: 'DEFAULT',
        messages: ["No estoy seguro de entender eso. 😅", "¿Te gustaría ver nuestros servicios?"],
        options: [
            { label: "Ver Servicios", nextStep: "WELCOME" },
            { label: "Hablar con alguien", nextStep: "CONTACT_HUMAN" }
        ]
    }
};

export default function Chatbot() {
    const { openBooking } = useBooking();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentStep, setCurrentStep] = useState<StepId>('WELCOME');
    const [showOptions, setShowOptions] = useState(false); // Delay options until typing done
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            processStep('WELCOME');
        }
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, showOptions]);

    const processStep = async (stepId: StepId, dynamicMessages?: string[], dynamicOptions?: QuickReply[]) => {
        const step = FLOW[stepId] || FLOW['DEFAULT'];
        setCurrentStep(stepId);
        setShowOptions(false);

        const messagesToDisplay = dynamicMessages && dynamicMessages.length > 0 ? dynamicMessages : step.messages;
        const optionsToDisplay = dynamicOptions && dynamicOptions.length > 0 ? dynamicOptions : step.options;

        // Add bot messages sequentially with typing delay
        for (let i = 0; i < messagesToDisplay.length; i++) {
            setIsTyping(true);
            await new Promise(resolve => setTimeout(resolve, 600 + (messagesToDisplay[i].length * 10))); // Dynamic delay based on length

            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now().toString() + i,
                text: messagesToDisplay[i],
                sender: "bot",
                timestamp: new Date()
            }]);
        }

        // Only show options if they exist for the current step or were provided dynamically
        if (optionsToDisplay && optionsToDisplay.length > 0) {
            setShowOptions(true);
        } else {
            setShowOptions(false);
        }
    };

    const handleOptionClick = (option: QuickReply) => {
        // 1. Add User Click as Message
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: option.label,
            sender: "user",
            timestamp: new Date()
        }]);

        // 2. Action (URL or Next Step)
        if (option.url) {
            window.open(option.url, '_blank');
        }

        // Open Scheduler
        if (option.label.includes("Agendar") || option.label.includes("Schedule")) {
            openBooking();
            return;
        }

        if (option.nextStep) {
            processStep(option.nextStep);
        }
    };

    const handleSend = async (text: string) => {
        // 1. Add User Message
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: text,
            sender: "user",
            timestamp: new Date()
        }]);

        setShowOptions(false);
        setIsTyping(true);

        // 2. Simulate "Thinking" (Network Delay)
        await new Promise(resolve => setTimeout(resolve, 800));

        // 3. Detect Intent & Respond
        const intentStep = detectIntent(text);
        processStep(intentStep);
    };

    return (
        <>
            {/* Trigger Button (FAB) */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 group"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 relative"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero-star.png" alt="Helixx IA" className="w-full h-full object-contain" />
                </motion.div>
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white/10 animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white/90 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 p-1 border border-gray-200 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/hero-star.png" alt="Bot" className="w-full h-full object-contain scale-125" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Helixx AI</h3>
                                    <p className="text-xs text-brand-accent font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Asesor Digital
                                    </p>
                                </div>
                            </div>
                            <button onClick={toggleChat} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={clsx(
                                        "flex flex-col max-w-[85%]",
                                        msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                                    )}
                                >
                                    <div className={clsx(
                                        "p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                                        msg.sender === "user"
                                            ? "bg-brand-accent text-white rounded-br-none"
                                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                                    )}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="self-start bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center w-16 h-10"
                                >
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </motion.div>
                            )}

                            {/* Quick Replies / Options */}
                            {showOptions && FLOW[currentStep].options && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-wrap gap-2 mt-4"
                                >
                                    {FLOW[currentStep].options?.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(opt)}
                                            className="px-4 py-2 bg-white border border-brand-accent/30 text-brand-accent text-sm font-medium rounded-full hover:bg-brand-accent hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-1"
                                        >
                                            {opt.label}
                                            <ChevronRight size={14} className="opacity-50" />
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const input = (e.currentTarget.elements.namedItem('message') as HTMLInputElement);
                                if (input.value.trim()) {
                                    handleSend(input.value);
                                    input.value = "";
                                }
                            }}
                            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
                        >
                            <input
                                name="message"
                                type="text"
                                placeholder="Escribe tu consulta..."
                                className="flex-1 bg-gray-50 border-0 rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-accent/20 focus:bg-white transition-all outline-none"
                            />
                            <button
                                type="submit"
                                className="p-2.5 bg-brand-accent text-white rounded-full hover:bg-brand-primary transition-colors shadow-lg shadow-brand-accent/20"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// --- Basic NLP / Intent Detection ---
function detectIntent(text: string): StepId {
    const lower = text.toLowerCase();

    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto') || lower.includes('planes')) return 'PRICING_MENU';
    if (lower.includes('web') || lower.includes('pagina') || lower.includes('sitio') || lower.includes('landing')) return 'WEB_DEV';
    if (lower.includes('crm') || lower.includes('gestion') || lower.includes('leads')) return 'CRM';
    if (lower.includes('auto') || lower.includes('ia') || lower.includes('bot') || lower.includes('chat')) return 'AUTOMATION';
    if (lower.includes('humano') || lower.includes('persona') || lower.includes('hablar') || lower.includes('contacto')) return 'CONTACT_HUMAN';

    return 'DEFAULT';
}
