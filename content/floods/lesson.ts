import type { Lesson } from "../schema";

const floodsLesson: Lesson = {
  id: "floods-01",
  title: "Flooding in Denmark",
  titleDa: "Oversvømmelse i Danmark",
  description:
    "Learn how to prepare for and respond to flooding — from cloudbursts to storm surges. Based on real Danish emergency guidelines.",
  icon: "Droplets",
  estimatedMinutes: 15,
  category: "floods",
  difficulty: "beginner",
  steps: [
    {
      id: "floods-01-info-causes",
      type: "info",
      content: {
        title: "What causes flooding in Denmark?",
        body: `Denmark faces three main flood risks:

**1. Skybrud (Cloudbursts)**
Sudden, extreme rainfall that overwhelms sewers and drainage. Copenhagen's 2 July 2011 cloudburst dropped 150mm of rain in just 2 hours — the most expensive natural disaster in Danish history, causing over **6 billion DKK** in insurance claims.

**2. Stormflod (Storm surges)**
Strong winds push seawater inland, especially along the west coast of Jutland and into the fjords. The 1872 storm surge in the western Baltic remains one of the worst recorded.

**3. Havvandsstigning (Sea level rise)**
DMI projects 0.3–1.0 meters of sea level rise by 2100. Parts of Copenhagen, including Amager and the harbor area, are less than 1 meter above sea level.

Climate change is making all three worse: heavier rainfall, stronger storms, and rising seas.`,
        source: "https://www.brs.dk/en/prepared/",
        funFact:
          "The 2011 Copenhagen cloudburst flooded the main road Lyngbyvej so deeply that cars floated away. Copenhagen has since invested over 13 billion DKK in climate adaptation, including parks that double as rainwater basins.",
      },
    },
    {
      id: "floods-01-quiz-risk",
      type: "quiz",
      content: {
        question:
          "Which area of Copenhagen is particularly vulnerable to flooding because parts of it sit below sea level?",
        options: [
          {
            text: "Amager",
            correct: true,
            explanation:
              "Correct! Parts of Amager, including the airport area, are at or below sea level, making it highly vulnerable to both storm surges and cloudbursts.",
          },
          {
            text: "Frederiksberg",
            correct: false,
            explanation:
              "Frederiksberg sits on higher ground. While it can flood during extreme cloudbursts, it's not below sea level.",
          },
          {
            text: "Nørrebro",
            correct: false,
            explanation:
              "Nørrebro experienced flooding in 2011, but it's not below sea level. Its flooding was due to overwhelmed sewers during the cloudburst.",
          },
          {
            text: "Hellerup",
            correct: false,
            explanation:
              "Hellerup is a coastal area north of Copenhagen but sits above sea level.",
          },
        ],
        hint: "Think about which area is closest to sea level and has large flat areas near the coast.",
      },
    },
    {
      id: "floods-01-info-warnings",
      type: "info",
      content: {
        title: "Denmark's warning systems",
        body: `Denmark has a layered warning system to alert you:

**DMI Varsler (Weather Warnings)**
DMI (Danmarks Meteorologiske Institut) issues warnings at three levels:
- 🟡 **Varsel (Caution)** — Be aware. Weather may cause minor problems.
- 🟠 **Varsel (Warning)** — Be prepared. Significant impact expected.
- 🔴 **Varsel (Severe warning)** — Take action. Dangerous, potentially life-threatening.

**S!RENEN (The Siren)**
Denmark has approximately 1,078 sirens across the country. When you hear the siren:
1. **Go indoors** immediately
2. **Close** all doors and windows
3. **Turn on** DR P1 (FM 90.8) or DR TV for instructions
4. **Follow** the authorities' guidance

The sirens are tested every year on the **first Wednesday of May at 12:00**.

**Varsling via mobil**
Denmark is rolling out cell broadcast alerts (EU-Alert / DK-Alert) that send emergency messages directly to all mobile phones in an affected area — no app needed.`,
        source: "https://www.brs.dk/en/emergency/sirens/",
        funFact:
          "S!RENEN sounds a steady tone for 45 seconds — that means 'seek shelter and listen to DR.' If you hear a series of short blasts, it means 'all clear.'",
      },
    },
    {
      id: "floods-01-quiz-warnings",
      type: "quiz",
      content: {
        question:
          "You hear Denmark's emergency siren (S!RENEN). What is the FIRST thing you should do?",
        options: [
          {
            text: "Go indoors and close doors and windows",
            correct: true,
            explanation:
              "Correct! The first action is always to go indoors, close all doors and windows, and then tune in to DR P1 or DR TV for instructions.",
          },
          {
            text: "Call 112 to find out what's happening",
            correct: false,
            explanation:
              "Don't call 112 unless you have a personal emergency. The lines need to stay open. Instead, turn on DR P1 or check brs.dk.",
          },
          {
            text: "Check social media for updates",
            correct: false,
            explanation:
              "Social media may have misinformation. The official channel is DR P1 (FM 90.8) or DR TV. Go indoors first!",
          },
          {
            text: "Drive to a higher area",
            correct: false,
            explanation:
              "Going outside during an emergency alert can be dangerous. The siren means go indoors, not outdoors.",
          },
        ],
        hint: "The siren literally means: 'Gå indendørs' — go inside.",
      },
    },
    {
      id: "floods-01-scenario-street",
      type: "scenario",
      content: {
        situation:
          "It's July in Copenhagen. A sudden skybrud (cloudburst) hits while you're at home. Rain is pouring harder than you've ever seen. You look out the window and water is rising on your street — already ankle-deep and climbing. Your basement has valuables stored in boxes on the floor. What do you do first?",
        choices: [
          {
            text: "Rush to the basement to save your valuables",
            outcome:
              "Dangerous choice! Basements flood first and fastest. You risk being trapped by rising water. People have drowned in flooded basements during cloudbursts. Never enter a flooding basement.",
            score: 0,
          },
          {
            text: "Move valuables upstairs and turn off electricity at the main breaker",
            outcome:
              "Good thinking! Moving items to higher floors and cutting power prevents electrocution risk and water damage. But don't go to the basement if water is already entering — focus on ground floor items.",
            score: 8,
          },
          {
            text: "Put sandbags or towels at the front door and drains",
            outcome:
              "Practical! Blocking entry points slows water ingress. If you have sandbags or water-filled bags ready, place them at doors and low windows. Also check floor drains — water can back up through the sewer system.",
            score: 10,
          },
          {
            text: "Get in your car and drive to higher ground",
            outcome:
              "Very dangerous! Just 15 cm of moving water can knock you off your feet, and 30 cm can float a car. Several people died in the 2011 Copenhagen cloudburst trying to drive through floodwater.",
            score: 0,
          },
        ],
      },
    },
    {
      id: "floods-01-info-protect",
      type: "info",
      content: {
        title: "How to protect your home",
        body: `Before flooding arrives, you can take these steps:

**Preparation (do this now)**
- Know your risk: check [klimatilpasning.dk](https://www.klimatilpasning.dk) for flood maps of your area
- Install a højvandslukke (backflow preventer) on your drain to prevent sewer backup
- Keep sandbags or water-barrier bags ready
- Store important documents and valuables above ground level
- Know where your main electrical breaker (hovedafbryder) is

**When flooding threatens**
- Move furniture, electronics, and valuables to upper floors
- Block doors and low windows with sandbags or plastic sheeting
- Turn off electricity at the main breaker if water enters the house
- Never touch electrical appliances while standing in water
- Close gas valves if you smell gas

**If you must evacuate**
- Follow authorities' instructions
- Bring your 72-timers nødkasse (72-hour emergency kit)
- Turn off gas and electricity before leaving
- Lock your home
- Go to designated evacuation centers (announced via DR)`,
        source:
          "https://www.brs.dk/en/prepared/",
        funFact:
          "Copenhagen's Klimakvarter (Climate Quarter) in Østerbro redesigned streets and parks to absorb 30% of rainwater during cloudbursts. The green streets can handle a 10-year rain event without flooding.",
      },
    },
    {
      id: "floods-01-interactive-safety",
      type: "interactive",
      content: {
        type: "drag-and-drop",
        config: {
          instruction:
            "Water is rising! Drag items to safety by prioritizing what to move upstairs first. You only have time for 5 items.",
          items: [
            {
              id: "passports",
              label: "Passports & documents",
              priority: 1,
              points: 10,
            },
            {
              id: "medicines",
              label: "Essential medicines",
              priority: 1,
              points: 10,
            },
            {
              id: "phone-charger",
              label: "Phone & charger",
              priority: 2,
              points: 8,
            },
            {
              id: "emergency-kit",
              label: "72-hour emergency kit",
              priority: 2,
              points: 8,
            },
            {
              id: "photo-albums",
              label: "Family photo albums",
              priority: 3,
              points: 5,
            },
            { id: "tv", label: "Flat-screen TV", priority: 5, points: 2 },
            {
              id: "laptop",
              label: "Laptop with work files",
              priority: 3,
              points: 6,
            },
            {
              id: "pet-supplies",
              label: "Pet food & supplies",
              priority: 2,
              points: 8,
            },
            {
              id: "winter-coats",
              label: "Winter coats",
              priority: 4,
              points: 3,
            },
            {
              id: "board-games",
              label: "Board games collection",
              priority: 6,
              points: 1,
            },
          ],
          maxSelections: 5,
          timeLimit: 30,
        },
      },
    },
    {
      id: "floods-01-quiz-after",
      type: "quiz",
      content: {
        question:
          "The floodwater has receded and you return home. What should you NOT do?",
        options: [
          {
            text: "Turn the electricity back on immediately",
            correct: true,
            explanation:
              "Correct — never turn electricity back on yourself after flooding! A certified electrician (autoriseret elektriker) must inspect the system first. Water-damaged wiring can cause fires or electrocution.",
          },
          {
            text: "Document all damage with photos before cleaning up",
            correct: false,
            explanation:
              "You SHOULD do this. Photograph everything before moving or cleaning anything — your insurance company (forsikringsselskab) needs documentation.",
          },
          {
            text: "Contact your insurance company as soon as possible",
            correct: false,
            explanation:
              "You SHOULD do this. Contact your forsikringsselskab immediately. Most Danish home insurance (husforsikring) covers flood damage, but you need to report promptly.",
          },
          {
            text: "Open windows to start drying out the house",
            correct: false,
            explanation:
              "You SHOULD do this. Ventilation is crucial to prevent mold (skimmelsvamp). Open windows and doors as soon as it's safe.",
          },
        ],
        hint: "Think about what could be dangerous after water has been in contact with your home's infrastructure.",
      },
    },
    {
      id: "floods-01-scenario-basement",
      type: "scenario",
      content: {
        situation:
          "Your neighbor calls you in a panic — their basement is flooding and they want to go down to rescue stored boxes. The water is already 20 cm deep and rising. The basement light is still on. They ask you to help carry things out. What do you do?",
        choices: [
          {
            text: "Help them — two people can work faster to save their things",
            outcome:
              "Extremely dangerous! A flooded basement with active electricity is potentially lethal. Water conducts electricity, and submerged outlets or appliances can electrocute you instantly. Every year people die in flooded basements across Europe.",
            score: 0,
          },
          {
            text: "Tell them to STOP — turn off the main breaker first, then only enter if water is below knee level",
            outcome:
              "Excellent decision! The main breaker (hovedafbryder) must be off before anyone enters standing water. Even then, only enter if water is shallow and not rising. If in doubt, wait for emergency services.",
            score: 10,
          },
          {
            text: "Call 112 and tell your neighbor to stay out of the basement",
            outcome:
              "Good call! If flooding is severe or electricity cannot be safely shut off, 112 is the right choice. Keep your neighbor out of the basement until professionals arrive. Material possessions can be replaced — lives cannot.",
            score: 8,
          },
          {
            text: "Suggest they use a pump to remove the water while going downstairs",
            outcome:
              "Using a pump is a good idea eventually, but going into an electrified flooded space is deadly. The electricity must be off first. A sump pump can be used once the area is safe to enter.",
            score: 3,
          },
        ],
      },
    },
    {
      id: "floods-01-info-recovery",
      type: "info",
      content: {
        title: "Recovery and resources",
        body: `After a flood, here's your action plan:

**Immediate steps**
1. Do **not** enter until authorities say it's safe
2. **Document** all damage with photos and video before touching anything
3. **Do not** turn on electricity — wait for an authorized electrician
4. **Contact** your insurance company (forsikringsselskab) immediately
5. **Ventilate** — open windows to prevent mold (skimmelsvamp)

**Who to contact**
- **112** — Emergency situations, life-threatening
- **Kommune (municipality)** — Your local kommune coordinates cleanup and temporary housing
- **Forsikring & Pension** — The insurance industry's helpline: +45 41 91 91 91
- **Stormrådet (The Storm Council)** — If flooding is declared a stormflod, compensation is available via stormraadet.dk
- **DEMA / Beredskabsstyrelsen** — National emergency management guidance at brs.dk

**Insurance in Denmark**
Most Danish home insurance covers water damage from cloudbursts. **Stormflod** (storm surge) is covered through a national scheme — all property insurance policies include this automatically. File claims within 2 months.

**Mental health**
Flooding is traumatic. The Danish Health Authority (Sundhedsstyrelsen) provides guidance for coping after natural disasters. Talk to your doctor if you experience prolonged anxiety or stress.`,
        source: "https://www.stormraadet.dk/",
        funFact:
          "Denmark's Stormrådet (Storm Council) was established in 1991 and has paid out over 5 billion DKK in compensation for storm surge damage. Every homeowner with property insurance automatically contributes to this national solidarity fund.",
      },
    },
  ],
};

export default floodsLesson;
