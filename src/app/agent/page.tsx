"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
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
  return (
    <div className="min-h-dvh bg-transparent flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-foreground">
              Emergency Agent
            </h1>
            <Sparkles size={14} className="text-muted-foreground/40" />
          </div>
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
            <span className="text-[10px] font-medium text-muted-foreground">
              Offline
            </span>
          </div>
        </div>
      </header>

      {/* Coming Soon content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Bot size={28} className="text-muted-foreground/50" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Coming Soon
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your AI emergency preparedness agent is under development. It will generate personalised scenarios, assess your readiness, and guide you through emergency protocols.
          </p>

          {/* Greyed-out quick prompts preview */}
          <div className="grid grid-cols-2 gap-2 mt-6 opacity-40 pointer-events-none">
            {quickPrompts.map((qp) => (
              <div
                key={qp.label}
                className="bg-white rounded-xl p-3 border border-border/50 text-left shadow-sm"
              >
                <qp.icon size={20} className="text-muted-foreground/50 mb-2" />
                <p className="text-xs font-semibold text-muted-foreground">
                  {qp.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Greyed-out input */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3">
        <div className="flex items-center gap-2 opacity-50 pointer-events-none">
          <input
            type="text"
            disabled
            placeholder="Coming soon..."
            className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-muted-foreground placeholder:text-muted-foreground/60 outline-none cursor-not-allowed"
          />
          <Button
            disabled
            size="icon"
            className="w-10 h-10 rounded-xl bg-muted shrink-0"
          >
            <Send size={16} className="text-muted-foreground" />
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
