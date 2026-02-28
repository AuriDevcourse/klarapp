import type { Lesson } from "../schema";

const kit72hLesson: Lesson = {
  id: "kit-72h-01",
  title: "Your 72-Hour Emergency Kit",
  titleDa: "Din 72-timers nødkasse",
  description:
    "Build a personalized emergency kit based on official Danish guidelines. Be prepared to take care of yourself and your household for 3 days.",
  icon: "Package",
  estimatedMinutes: 12,
  category: "kit-72h",
  difficulty: "beginner",
  steps: [
    {
      id: "kit-01-info-why",
      type: "info",
      content: {
        title: "Why 72 hours?",
        body: `**Beredskabsstyrelsen (DEMA)** — Denmark's emergency management agency — recommends that every household be prepared to manage on their own for at least **3 days (72 hours)**.

Why? Because in a major crisis:
- **Electricity** may fail, disabling heating, refrigeration, and communication
- **Water supply** may be disrupted or contaminated
- **Roads** may be blocked, delaying emergency services
- **Shops** may close or run out of essential supplies
- **Mobile networks** may be overloaded or down

Authorities need time to organize a coordinated response. During those critical first 72 hours, **you are your own first responder**.

This isn't hypothetical — Denmark experienced a near-miss during the December 2023 storm that knocked out power to thousands of households in Jutland for days.

The good news? A little preparation goes a long way. Let's build your kit.`,
        source: "https://www.brs.dk/en/prepared/",
        funFact:
          "Only about 30% of Danish households are currently prepared for a 72-hour emergency, according to a 2023 Beredskabsstyrelsen survey. By completing this lesson, you're already ahead of most!",
      },
    },
    {
      id: "kit-01-quiz-first-fail",
      type: "quiz",
      content: {
        question:
          "In most emergencies, what is typically the FIRST infrastructure to fail?",
        options: [
          {
            text: "Electricity (strøm)",
            correct: true,
            explanation:
              "Correct! Electricity is usually the first to go — and it triggers a cascade. Without power: no heating, no refrigeration, no charging phones, water pumps stop, traffic lights fail, card terminals go down, and mobile towers lose backup power within hours.",
          },
          {
            text: "Water supply (vandforsyning)",
            correct: false,
            explanation:
              "Water supply has backup systems and gravity-fed reserves, so it usually lasts longer than electricity. But it can fail if power outages persist, since pumping stations need electricity.",
          },
          {
            text: "Mobile network (mobilnetværk)",
            correct: false,
            explanation:
              "Mobile towers have battery backups (typically 2-8 hours). They'll keep working initially but will fail if the power outage lasts long enough.",
          },
          {
            text: "Roads and transport",
            correct: false,
            explanation:
              "Roads themselves don't 'fail' — but without traffic lights and with debris, they become difficult to navigate. This is usually a secondary effect.",
          },
        ],
        hint: "Think about what everything else depends on — a single point of failure that cascades.",
      },
    },
    {
      id: "kit-01-interactive-personalize",
      type: "interactive",
      content: {
        type: "personalize",
        config: {
          title: "Personalize your kit",
          subtitle:
            "Tell us about your household so we can calculate exactly what you need.",
          fields: [
            {
              id: "adults",
              label: "Adults (18+)",
              type: "stepper",
              min: 1,
              max: 8,
              default: 2,
            },
            {
              id: "children",
              label: "Children (0-17)",
              type: "stepper",
              min: 0,
              max: 8,
              default: 0,
            },
            {
              id: "pets",
              label: "Pets",
              type: "stepper",
              min: 0,
              max: 5,
              default: 0,
            },
            {
              id: "medical",
              label: "Anyone on daily medication?",
              type: "toggle",
              default: false,
            },
            {
              id: "baby",
              label: "Baby under 2 years?",
              type: "toggle",
              default: false,
            },
            {
              id: "iodine",
              label: "Anyone under 40 or breastfeeding?",
              type: "toggle",
              default: false,
              helpText:
                "Iodine tablets are recommended for those under 40 and breastfeeding mothers in case of nuclear incidents.",
            },
          ],
        },
      },
    },
    {
      id: "kit-01-quiz-water",
      type: "quiz",
      content: {
        question:
          "How much drinking water does DEMA recommend per person per day?",
        options: [
          {
            text: "3 liters",
            correct: true,
            explanation:
              "Correct! Beredskabsstyrelsen recommends 3 liters per person per day. For a household of 2 adults over 3 days, that's 18 liters. Don't forget extra for cooking and pets!",
          },
          {
            text: "1 liter",
            correct: false,
            explanation:
              "1 liter is not enough. The minimum survival amount is about 1.5L, but DEMA recommends 3L per person per day to account for cooking, hygiene, and safety margin.",
          },
          {
            text: "5 liters",
            correct: false,
            explanation:
              "5 liters would be generous! The official recommendation is 3 liters per person per day. More is fine if you have storage space.",
          },
          {
            text: "2 liters",
            correct: false,
            explanation:
              "2 liters is a common drinking water recommendation for daily health, but in an emergency you need extra for cooking and basic hygiene. DEMA says 3 liters.",
          },
        ],
        hint: "The official Danish recommendation from brs.dk — it's more than just drinking water.",
      },
    },
    {
      id: "kit-01-info-food",
      type: "info",
      content: {
        title: "Food that works without power",
        body: `Your emergency food needs to be:
- **Non-perishable** — no refrigeration needed
- **Ready to eat** or easy to prepare with minimal/no cooking
- **High energy** — you may be more active than normal
- **Familiar** — emergencies are stressful, eat food you actually like

**Good choices:**
- Canned food (dåsemad): beans, tuna, soup, fruit — **bring a manual can opener!**
- Crackers (knækbrød), crispbread, and hardtack
- Nut butters, trail mix, dried fruit
- Energy bars, chocolate, biscuits
- UHT milk (holdbar mælk) — lasts months unrefrigerated
- Instant noodles or couscous (just needs boiled water)
- Baby food and formula if needed

**Don't forget:**
- A **manual can opener** (dåseåbner) — electric ones won't work!
- Disposable plates and cutlery
- Water purification tablets as backup
- Comfort foods — chocolate and candy boost morale

**Storage tip:** Keep a rotation system. Use items before they expire and replace them. Mark a reminder in your calendar every 6 months to check dates.`,
        source: "https://www.brs.dk/en/prepared/",
        funFact:
          "The Danish classic rugbrød (rye bread) in vacuum packaging lasts weeks at room temperature and is incredibly nutritious — it's practically designed for emergencies. Danes eat about 30 kg per person per year!",
      },
    },
    {
      id: "kit-01-scenario-power",
      type: "scenario",
      content: {
        situation:
          "A winter storm has knocked out power across your area. It's 17:00, already dark outside. Your phone is at 12% battery. The temperature in your apartment is dropping. You have a partial emergency kit. Mobile data is slow but working. What do you prioritize?",
        choices: [
          {
            text: "Use remaining phone battery to call friends and scroll news updates",
            outcome:
              "Bad prioritization! Your phone is a critical tool — don't drain it on non-essentials. At 12%, you have maybe 20-30 minutes of screen time. Use it wisely for one essential call or to check official emergency updates, then switch to airplane mode.",
            score: 2,
          },
          {
            text: "Switch phone to airplane mode, light candles, put on warm layers, and listen to FM radio",
            outcome:
              "Excellent! You're prioritizing survival essentials: conserve phone battery (airplane mode), alternative light (candles), warmth (layers), and information (FM radio on DR P1 at 90.8 MHz doesn't need internet). This is textbook emergency response.",
            score: 10,
          },
          {
            text: "Drive to a friend's house across the city that might have power",
            outcome:
              "Risky! Roads may be dangerous with no traffic lights, fallen trees, and other drivers doing the same. If the outage is widespread, your friend may also be without power. Stay put unless authorities tell you to evacuate.",
            score: 3,
          },
          {
            text: "Open the fridge to use perishable food before it spoils",
            outcome:
              "Not yet! A closed refrigerator keeps food safe for about 4-6 hours. A closed freezer for 24-48 hours. Opening the door lets cold air escape. Wait as long as possible before opening, and eat perishables in a planned order.",
            score: 5,
          },
        ],
      },
    },
    {
      id: "kit-01-interactive-checklist",
      type: "interactive",
      content: {
        type: "checklist",
        config: {
          title: "Your 72-hour kit checklist",
          subtitle:
            "Check off items you already have. We'll show you what's missing.",
          categories: [
            {
              name: "Water & Food",
              icon: "Droplets",
              items: [
                {
                  id: "water",
                  label: "Drinking water",
                  quantityFormula: "(adults + children) * 3 * 3",
                  unit: "liters",
                  essential: true,
                },
                {
                  id: "canned-food",
                  label: "Canned food (3 days supply)",
                  quantityFormula: "(adults + children) * 2 * 3",
                  unit: "cans",
                  essential: true,
                },
                {
                  id: "can-opener",
                  label: "Manual can opener",
                  quantityFormula: "1",
                  unit: "piece",
                  essential: true,
                },
                {
                  id: "snacks",
                  label: "Energy bars / snacks",
                  quantityFormula: "(adults + children) * 3",
                  unit: "pieces",
                  essential: false,
                },
                {
                  id: "baby-food",
                  label: "Baby food & formula",
                  quantityFormula: "baby ? 3 : 0",
                  unit: "days supply",
                  essential: false,
                  conditional: "baby",
                },
                {
                  id: "pet-food",
                  label: "Pet food",
                  quantityFormula: "pets * 3",
                  unit: "days supply",
                  essential: false,
                  conditional: "pets > 0",
                },
              ],
            },
            {
              name: "Light & Power",
              icon: "Flashlight",
              items: [
                {
                  id: "flashlight",
                  label: "Flashlight (lommelygte)",
                  quantityFormula: "1",
                  unit: "piece",
                  essential: true,
                },
                {
                  id: "batteries",
                  label: "Extra batteries",
                  quantityFormula: "2",
                  unit: "sets",
                  essential: true,
                },
                {
                  id: "candles",
                  label: "Candles (stearinlys)",
                  quantityFormula: "10",
                  unit: "pieces",
                  essential: true,
                },
                {
                  id: "matches",
                  label: "Matches or lighter",
                  quantityFormula: "2",
                  unit: "boxes",
                  essential: true,
                },
                {
                  id: "powerbank",
                  label: "Power bank (fully charged)",
                  quantityFormula: "1",
                  unit: "piece",
                  essential: true,
                },
              ],
            },
            {
              name: "Information & Communication",
              icon: "Radio",
              items: [
                {
                  id: "radio",
                  label: "Battery/wind-up FM radio",
                  quantityFormula: "1",
                  unit: "piece",
                  essential: true,
                },
                {
                  id: "cash",
                  label: "Cash in small denominations",
                  quantityFormula: "1000",
                  unit: "DKK",
                  essential: true,
                },
                {
                  id: "payment-cards",
                  label: "Physical payment cards (know your PIN)",
                  quantityFormula: "1",
                  unit: "set",
                  essential: true,
                },
                {
                  id: "contacts",
                  label: "Important phone numbers (written down)",
                  quantityFormula: "1",
                  unit: "list",
                  essential: true,
                },
                {
                  id: "documents",
                  label: "Copies of ID & insurance papers",
                  quantityFormula: "1",
                  unit: "set",
                  essential: true,
                },
              ],
            },
            {
              name: "Health & Safety",
              icon: "Heart",
              items: [
                {
                  id: "first-aid",
                  label: "First aid kit",
                  quantityFormula: "1",
                  unit: "kit",
                  essential: true,
                },
                {
                  id: "medicines",
                  label: "Essential medicines (7 days supply)",
                  quantityFormula: "medical ? 1 : 0",
                  unit: "supply",
                  essential: true,
                  conditional: "medical",
                },
                {
                  id: "iodine",
                  label: "Iodine tablets (jodtabletter)",
                  quantityFormula: "iodine ? (adults + children) : 0",
                  unit: "doses",
                  essential: false,
                  conditional: "iodine",
                  helpText:
                    "Recommended for people under 40 and breastfeeding mothers to protect the thyroid in case of a nuclear incident.",
                },
                {
                  id: "warm-blankets",
                  label: "Warm blankets or sleeping bags",
                  quantityFormula: "adults + children",
                  unit: "pieces",
                  essential: true,
                },
                {
                  id: "hygiene",
                  label: "Basic hygiene supplies",
                  quantityFormula: "1",
                  unit: "bag",
                  essential: false,
                },
              ],
            },
          ],
        },
      },
    },
    {
      id: "kit-01-quiz-storage",
      type: "quiz",
      content: {
        question: "Where is the BEST place to store your 72-hour emergency kit?",
        options: [
          {
            text: "In a closet near your front door, easily accessible",
            correct: true,
            explanation:
              "Correct! Store your kit near the exit so you can grab it quickly if you need to evacuate. A hallway closet or entrance area is ideal. Make sure all household members know where it is.",
          },
          {
            text: "In the basement for safekeeping",
            correct: false,
            explanation:
              "Basements are the first area to flood and may be inaccessible during emergencies. Keep your kit at ground level or above, near an exit.",
          },
          {
            text: "In your car's trunk",
            correct: false,
            explanation:
              "A small car kit is a good supplement, but your main kit should be at home where you spend most time. Extreme temperatures in cars can damage food and batteries.",
          },
          {
            text: "Spread across different rooms for redundancy",
            correct: false,
            explanation:
              "Spreading items makes it impossible to grab and go quickly. Keep one consolidated kit near the exit. You can have a secondary small kit in the car.",
          },
        ],
        hint: "Think about when you'd need it most urgently — speed of access matters.",
      },
    },
    {
      id: "kit-01-info-maintain",
      type: "info",
      content: {
        title: "Maintaining your kit",
        body: `A kit is only useful if it's **ready when you need it**. Here's your maintenance routine:

**Every 6 months (sæt en reminder!)**
- Check expiry dates on all food and water
- Replace expired items and eat the old ones (reduce waste!)
- Test your flashlight and radio — replace batteries if weak
- Charge your power bank fully
- Update your contact list if numbers have changed
- Check that medicines haven't expired

**When life changes**
- New family member? → Add water, food, and supplies
- New pet? → Add pet food and supplies
- New medication? → Add to kit immediately
- Moved to a new home? → Position kit near the new exit

**Pro tips**
- Set a calendar reminder for **1 May** (siren test day) and **1 November** to check your kit — twice a year, easy to remember
- Use the FIFO method: First In, First Out — rotate food into daily meals and replace with fresh stock
- Take a photo of your kit contents and store it in the cloud — useful for insurance if the kit is lost
- Tell everyone in the household where the kit is and what to do

**You're almost done!** Completing this checklist puts you ahead of 70% of Danish households.`,
        source: "https://www.brs.dk/en/prepared/",
      },
    },
    {
      id: "kit-01-info-complete",
      type: "info",
      content: {
        title: "Your readiness score",
        body: `**Tillykke! (Congratulations!)**

You now know:
- Why 72-hour preparedness matters
- What cascading failures look like in a real emergency
- Exactly what your household needs in a kit
- Where to store it and how to maintain it
- How to act when the power goes out

**Your personalized kit list has been saved** — find it on the "Min nødkasse" tab.

**What's next?**
- Complete the Oversvømmelse (Floods) lesson to learn water-specific survival skills
- Try the Sirener (Sirens) lesson to understand Denmark's warning system
- Share your readiness score with friends and family — preparedness is a team effort

Remember: **Du er klar!** (You are ready!)`,
        source: "https://www.brs.dk/en/prepared/",
        funFact:
          "Countries like Finland and Sweden have a longer tradition of civilian preparedness. Finland distributes a 'Prepare for 72 hours' guide to every household. Denmark launched its own campaign in 2022 — and you're now part of it!",
      },
    },
  ],
};

export default kit72hLesson;
