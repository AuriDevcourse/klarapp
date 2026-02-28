"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  ChevronLeft,
  Sparkles,
  User,
  Droplets,
  Package,
  AlertTriangle,
  Radio,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/klar/bottom-nav";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
  isScenario?: boolean;
  scenarioChoices?: { text: string; outcome: string; score: number }[];
}

const quickPrompts = [
  {
    icon: Droplets,
    label: "Flooding scenario",
    prompt: "Generate a realistic flooding emergency scenario for my area in Copenhagen. I live with 2 adults.",
    color: "#3b82f6",
  },
  {
    icon: Package,
    label: "Check my kit",
    prompt: "Help me evaluate if my 72-hour emergency kit is complete. I have water, canned food, and a flashlight. What am I missing?",
    color: "#22c55e",
  },
  {
    icon: AlertTriangle,
    label: "Siren heard",
    prompt: "I just heard the emergency siren in Denmark. Walk me through exactly what I should do step by step.",
    color: "#f59e0b",
  },
  {
    icon: Radio,
    label: "Power outage",
    prompt: "The power just went out in my apartment. It's winter and getting cold. What should I prioritize?",
    color: "#ef4444",
  },
];

// Simulated agent responses for demo (in production, these would come from the Claude API)
const agentResponses: Record<string, string> = {
  flooding: `**Emergency Flood Response Protocol**

Based on Danish Emergency Management Agency (DEMA) guidelines, here's your personalized scenario:

**Situation:** It's July in Copenhagen. DMI has issued a red warning (severe) for cloudbursts (skybrud). Rain intensity is projected at 100mm+ within 2 hours — similar to the devastating 2011 cloudburst.

**Your immediate actions:**

1. **Stay indoors** — Do not attempt to drive or walk through floodwater. Just 15cm of moving water can knock you off your feet.

2. **Move valuables upstairs** — Electronics, documents, medications. Start with irreplaceable items.

3. **Turn off the main breaker** (hovedafbryder) if water enters your home. Never touch electrical appliances while standing in water.

4. **Block entry points** — Place sandbags or tightly rolled towels at door thresholds and check floor drains for backflow.

5. **Monitor DR P1** (FM 90.8) for official emergency updates.

**Critical reminder:** Never go into a flooding basement — this is the #1 cause of flood deaths in Denmark.

Would you like me to generate a decision-based scenario to test your response skills?`,

  kit: `**72-Hour Kit Assessment**

Based on DEMA's official recommendations, let me evaluate your current kit:

**You have (3 items):**
- Water
- Canned food
- Flashlight

**You're missing these essentials:**

- **Battery/wind-up FM radio** — Your lifeline when mobile networks fail. Tune to DR P1 (90.8 MHz)
- **Power bank** — Fully charged. Your phone is critical for the first hours
- **Extra batteries** — For flashlight and radio
- **Candles + matches** — Backup lighting that needs no batteries
- **Cash in small bills** — Card terminals won't work without power. Keep at least 1,000 DKK
- **Manual can opener** — Your canned food is useless without one!
- **First aid kit** — Basic medical supplies
- **Warm blankets** — Body heat drops fast without heating
- **Important documents** — Copies of ID, insurance, medical info
- **Written phone numbers** — You can't access your contacts if your phone dies

**Your readiness score: 3/15 essential items (20%)**

Want me to prioritize these by urgency so you know what to buy first?`,

  siren: `**EMERGENCY SIREN PROTOCOL**

The siren you heard is S!RENEN — Denmark's national warning system. Here's your step-by-step response:

**RIGHT NOW:**

1. **Go indoors immediately** — Find the nearest solid building. Close all doors and windows.

2. **Turn on DR P1** at FM 90.8 MHz, or DR TV. This is where official instructions will be broadcast.

3. **Do NOT call 112** unless you have a personal emergency. The lines must stay open for real emergencies.

4. **Check brs.dk** or the DK-Alert system on your phone for official updates.

**The siren signals:**
- **Long steady tone (45 sec)** = Seek shelter and listen to DR
- **Short repeated blasts** = All clear

**While waiting for instructions:**
- Close windows and turn off ventilation/AC
- If told to stay indoors, seal gaps with wet towels
- Gather your 72-hour emergency kit
- Keep your phone charged but limit non-essential use
- Account for all household members

**Remember:** The siren is tested every year on the first Wednesday of May at 12:00. If it's not test day, this is real.

Would you like help creating an emergency action plan for your household?`,

  power: `**Power Outage Survival Plan — Winter Edition**

With no electricity in a Danish winter, heat loss is your biggest threat. Here's your priority list:

**First 30 minutes:**
1. **Check if it's just your home** — Look outside. If neighbors have light, check your fuse box (eltavle)
2. **Switch phone to airplane mode** — Preserve battery for emergencies
3. **Put on warm layers** — Multiple thin layers beat one thick one. Don't forget hat and socks.

**First 2 hours:**
4. **Light candles** — Place safely on plates, away from curtains. Never leave unattended.
5. **Close off unused rooms** — Concentrate body heat in one room. Hang blankets over doorways.
6. **Listen to DR P1** (FM 90.8) on your battery radio for updates
7. **Open fridge/freezer as little as possible** — A closed fridge stays cold for 4-6 hours

**If outage continues (6+ hours):**
8. **Eat perishables first** — Fridge food before pantry food
9. **Fill bathtub with water** — Water pumps may fail during extended outages
10. **Check on elderly neighbors** — They're most vulnerable to cold

**Temperature danger zone:**
If your indoor temperature drops below 16°C and you can't stay warm, contact your kommune (municipality) about emergency shelters.

**Emergency numbers:**
- 112 — Life-threatening emergencies
- Your electricity provider's outage line
- Kommune emergency line

Should I generate a timed scenario to practice your power outage response?`,
};

function getAgentResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("flood") || lower.includes("water") || lower.includes("rain") || lower.includes("cloudburst")) {
    return agentResponses.flooding;
  }
  if (lower.includes("kit") || lower.includes("supplies") || lower.includes("missing") || lower.includes("prepared")) {
    return agentResponses.kit;
  }
  if (lower.includes("siren") || lower.includes("alarm") || lower.includes("warning") || lower.includes("heard")) {
    return agentResponses.siren;
  }
  if (lower.includes("power") || lower.includes("electricity") || lower.includes("blackout") || lower.includes("cold") || lower.includes("winter")) {
    return agentResponses.power;
  }
  return `I'm your AI emergency preparedness agent, powered by Claude. I can help you with:

- **Emergency scenarios** — Practice realistic Danish emergency situations
- **Kit assessment** — Check if your 72-hour kit is complete
- **Protocol guidance** — Step-by-step instructions for emergencies
- **Personalized advice** — Based on your household and location

Try asking me about a specific emergency situation, or tap one of the quick prompts above!`;
}

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "agent",
      content:
        "Hi! I'm your AI emergency preparedness agent, powered by Claude. I can generate personalized scenarios, assess your readiness, and guide you through emergency protocols based on official Danish guidelines.\n\nWhat would you like to practice?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate agent thinking time
    setTimeout(() => {
      const response = getAgentResponse(text);
      const agentMsg: Message = {
        id: `agent-${Date.now()}`,
        role: "agent",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="min-h-dvh bg-klar-bg flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border px-4 pt-12 pb-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-1 -ml-1">
            <ChevronLeft size={24} className="text-foreground" />
          </Link>
          <div className="w-9 h-9 rounded-xl bg-klar-primary flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-foreground">
                Emergency Agent
              </h1>
              <Sparkles size={12} className="text-klar-accent" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Powered by Claude AI
            </p>
          </div>
          <div className="flex items-center gap-1 bg-klar-success/10 px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-klar-success animate-pulse" />
            <span className="text-[10px] font-medium text-klar-success">
              Online
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-48">
        {/* Quick prompts (show only if just welcome message) */}
        {messages.length === 1 && (
          <motion.div
            className="grid grid-cols-2 gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => sendMessage(qp.prompt)}
                className="bg-white rounded-xl p-3 border border-border/50 text-left active:scale-[0.97] transition-transform shadow-sm"
              >
                <qp.icon
                  size={20}
                  style={{ color: qp.color }}
                  className="mb-2"
                />
                <p className="text-xs font-semibold text-foreground">
                  {qp.label}
                </p>
              </button>
            ))}
          </motion.div>
        )}

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === "agent"
                      ? "bg-klar-primary"
                      : "bg-muted"
                  }`}
                >
                  {msg.role === "agent" ? (
                    <Bot size={14} className="text-white" />
                  ) : (
                    <User size={14} className="text-muted-foreground" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-klar-primary text-white rounded-tr-sm"
                      : "bg-white border border-border/50 shadow-sm rounded-tl-sm"
                  }`}
                >
                  <MessageContent
                    text={msg.content}
                    isUser={msg.role === "user"}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              className="flex gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-7 h-7 rounded-lg bg-klar-primary flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2
                    size={14}
                    className="text-klar-primary animate-spin"
                  />
                  <span className="text-sm text-muted-foreground">
                    Analyzing situation...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Describe your emergency situation..."
            className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-klar-primary/20"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="w-10 h-10 rounded-xl bg-klar-primary hover:bg-klar-primary-light shrink-0"
          >
            <Send size={16} className="text-white" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* Simple markdown renderer for agent messages */
function MessageContent({
  text,
  isUser,
}: {
  text: string;
  isUser: boolean;
}) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<div key={key++} className="h-2" />);
      continue;
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      elements.push(
        <p
          key={key++}
          className={`font-bold text-sm mt-1.5 mb-0.5 ${
            isUser ? "text-white" : "text-foreground"
          }`}
        >
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <p
          key={key++}
          className={`text-sm leading-relaxed pl-3 ${
            isUser ? "text-white/90" : "text-foreground/80"
          }`}
        >
          <span className={isUser ? "text-white/60" : "text-klar-primary"}>
            •{" "}
          </span>
          <InlineFormat text={trimmed.slice(2)} isUser={isUser} />
        </p>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\.\s/)?.[1];
      const rest = trimmed.replace(/^\d+\.\s/, "");
      elements.push(
        <p
          key={key++}
          className={`text-sm leading-relaxed pl-3 ${
            isUser ? "text-white/90" : "text-foreground/80"
          }`}
        >
          <span
            className={`font-semibold mr-1 ${
              isUser ? "text-white/70" : "text-klar-primary"
            }`}
          >
            {num}.
          </span>
          <InlineFormat text={rest} isUser={isUser} />
        </p>
      );
    } else {
      elements.push(
        <p
          key={key++}
          className={`text-sm leading-relaxed ${
            isUser ? "text-white/90" : "text-foreground/80"
          }`}
        >
          <InlineFormat text={trimmed} isUser={isUser} />
        </p>
      );
    }
  }

  return <>{elements}</>;
}

function InlineFormat({ text, isUser }: { text: string; isUser: boolean }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let i = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch?.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(
        <strong
          key={i++}
          className={`font-semibold ${
            isUser ? "text-white" : "text-foreground"
          }`}
        >
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    } else {
      parts.push(remaining);
      remaining = "";
    }
  }

  return <>{parts}</>;
}
