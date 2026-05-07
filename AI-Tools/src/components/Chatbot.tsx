import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

interface Message {
    id: number;
    role: "assistant" | "user";
    text: string;
}

const quickQuestions = [
    "Best free AI tools?",
    "Top coding assistants?",
    "AI for image generation?",
    "AI video tools?",
    "AI for writing?",
];

const toolKnowledge: { keywords: string[]; answer: string }[] = [
    {
        keywords: ["free", "مجاني", "freemium"],
        answer: "Here are some great **free AI tools** to start with:\n\n• **ChatGPT** – free tier for general chat & writing\n• **Gemini** – Google's free AI assistant\n• **Codeium** – 100% free AI coding assistant\n• **Adobe Podcast** – free AI audio enhancement\n• **Stable Diffusion** – free open-source image generation\n\nCheck the **FREE** badge on any tool card!",
    },
    {
        keywords: ["code", "coding", "developer", "programming", "كود", "برمجة"],
        answer: "Top AI tools for **coding & development**:\n\n• **Cursor** – AI-first editor, highly recommended\n• **GitHub Copilot** – best IDE autocomplete\n• **Bolt.new** – builds full apps from text\n• **v0 by Vercel** – generates React UI components\n• **Codeium** – free alternative to Copilot\n\nFilter by **Code** category to see them all!",
    },
    {
        keywords: ["image", "photo", "art", "design", "صورة", "تصميم"],
        answer: "Best AI tools for **image generation**:\n\n• **Midjourney** – stunning artistic quality\n• **Leonardo AI** – great for game & concept art\n• **DALL·E 3** – excellent prompt accuracy\n• **Adobe Firefly** – integrated with Creative Cloud\n• **Canva AI** – easiest for non-designers\n\nFilter by **Image** category to explore more!",
    },
    {
        keywords: ["video", "film", "movie", "فيديو", "clip"],
        answer: "Top AI tools for **video creation**:\n\n• **Runway** – professional video generation\n• **Pika** – fast short video clips\n• **Sora** – OpenAI's cinematic quality video\n• **Synthesia** – AI avatar videos\n• **HeyGen** – great for marketing videos\n\nFilter by **Video** category to see all options!",
    },
    {
        keywords: ["audio", "music", "voice", "sound", "song", "موسيقى", "صوت"],
        answer: "Best AI tools for **audio & music**:\n\n• **ElevenLabs** – ultra-realistic voice cloning\n• **Suno** – creates full songs from text\n• **Udio** – AI music in any genre\n• **Mubert** – royalty-free background music\n• **Adobe Podcast** – enhance audio quality\n\nFilter by **Audio** category for more!",
    },
    {
        keywords: ["write", "writing", "content", "blog", "كتابة", "محتوى"],
        answer: "Top AI tools for **writing & content**:\n\n• **ChatGPT** – versatile writing assistant\n• **Claude** – excellent long-form writing\n• **Jasper AI** – marketing copy specialist\n• **Grammarly** – grammar & style checker\n• **Copy.ai** – sales & marketing copy\n\nFilter by **Productivity** category to explore!",
    },
    {
        keywords: ["productivity", "work", "notion", "task", "إنتاجية", "عمل"],
        answer: "Best AI tools for **productivity**:\n\n• **Notion AI** – smart notes & summaries\n• **Gamma** – AI presentation maker\n• **Grammarly** – writing & grammar assistant\n• **Otter.ai** – meeting transcription\n• **Zapier AI** – workflow automation\n\nFilter by **Productivity** to see all!",
    },
    {
        keywords: ["best", "top", "recommend", "افضل", "أفضل", "ماذا"],
        answer: "Here are the **top-rated AI tools** on this site:\n\n⭐ **ChatGPT** – best all-around assistant\n⭐ **Midjourney** – best image generation\n⭐ **Cursor** – best coding editor\n⭐ **ElevenLabs** – best voice AI\n⭐ **Runway** – best video generation\n\nLook for the **POPULAR** badge on cards!",
    },
    {
        keywords: ["hello", "hi", "hey", "مرحبا", "هاي", "اهلا", "أهلا"],
        answer: "Hello! 👋 I'm **Find My AI** assistant.\n\nI can help you discover the right AI tool for your needs. Try asking me:\n\n• \"Best free AI tools?\"\n• \"What's good for coding?\"\n• \"AI tools for video editing?\"\n\nWhat are you looking for?",
    },
    {
        keywords: ["how many", "كم", "count", "total", "عدد"],
        answer: "This website currently features **43+ AI tools** across **6 categories**:\n\n💬 Chat • 🎨 Image • 🎬 Video\n🎵 Audio • 💻 Code • ⚡ Productivity\n\nUse the category filter or search bar to find exactly what you need!",
    },
];

function getBotReply(input: string): string {
    const lower = input.toLowerCase();
    for (const entry of toolKnowledge) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
            return entry.answer;
        }
    }
    return (
        "I'm not sure about that specific question, but I can help you find AI tools! Try asking:\n\n" +
        "• \"Best AI tools for coding?\"\n" +
        "• \"Free AI image generators?\"\n" +
        "• \"Top AI video tools?\"\n\n" +
        "Or use the **search bar** and **category filter** above to browse all 43+ tools!"
    );
}

function formatMessage(text: string) {
    const lines = text.split("\n");
    return lines.map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
            <span key={i}>
                {parts.map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={j}>{part.slice(2, -2)}</strong>
                    ) : (
                        <span key={j}>{part}</span>
                    )
                )}
                {i < lines.length - 1 && <br />}
            </span>
        );
    });
}

let msgIdCounter = 100;

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "assistant",
            text: "Hi! 👋 I'm your **AI tool finder**. Ask me anything — I'll help you discover the perfect AI tool for your needs!",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showQuick, setShowQuick] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open, messages]);

    function sendMessage(text: string) {
        if (!text.trim() || loading) return;
        const userMsg: Message = { id: ++msgIdCounter, role: "user", text: text.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        setShowQuick(false);

        setTimeout(() => {
            const reply = getBotReply(text);
            const botMsg: Message = { id: ++msgIdCounter, role: "assistant", text: reply };
            setMessages((prev) => [...prev, botMsg]);
            setLoading(false);
        }, 900);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    }

    return (
        <>
            <button
                className={`chatbot-toggle ${open ? "chatbot-toggle--open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close chat" : "Open chat"}
            >
                {!open && <span className="chatbot-badge">AI</span>}
                {open ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>

            <div className={`chatbot-window ${open ? "chatbot-window--open" : ""}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header__info">
                        <div className="chatbot-avatar">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <div>
                            <p className="chatbot-header__title">Find My AI Assistant</p>
                            <p className="chatbot-header__status">
                                <span className="chatbot-status-dot" />
                                Online · Ready to help
                            </p>
                        </div>
                    </div>
                    <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chatbot-message chatbot-message--${msg.role}`}>
                            {msg.role === "assistant" && (
                                <div className="chatbot-message__avatar">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                            )}
                            <div className="chatbot-message__bubble">
                                {formatMessage(msg.text)}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="chatbot-message chatbot-message--assistant">
                            <div className="chatbot-message__avatar">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <div className="chatbot-message__bubble chatbot-message__bubble--loading">
                                <span /><span /><span />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {showQuick && (
                    <div className="chatbot-quick">
                        {quickQuestions.map((q) => (
                            <button key={q} className="chatbot-quick__btn" onClick={() => sendMessage(q)}>
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chatbot-input-area">
                    <textarea
                        ref={inputRef}
                        className="chatbot-input"
                        placeholder="Ask about AI tools..."
                        rows={1}
                        value={input}
                        disabled={loading}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="chatbot-send"
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || loading}
                        aria-label="Send"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}