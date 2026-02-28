import type { Lesson } from "../schema";

export const kit72hLesson: Lesson = {
  id: "kit-72h-101",
  title: "Your 72-Hour Emergency Kit",
  titleDa: "Din 72-timers Nødforsyning",
  description:
    "Build a personalised emergency kit based on official Danish DEMA recommendations. Learn what you need, why 72 hours, and how to keep your household prepared.",
  descriptionDa:
    "Byg en personlig nødforsyning baseret på officielle danske anbefalinger fra Beredskabsstyrelsen. Lær hvad du har brug for, hvorfor 72 timer, og hvordan du holder din husstand forberedt.",
  icon: "Package",
  estimatedMinutes: 15,
  category: "kit-72h",
  difficulty: "beginner",
  steps: [
    // ── Step 1: Why 72 hours? ────────────────────────────────
    {
      id: "kit-info-why-72h",
      stepNumber: 1,
      type: "info",
      content: {
        type: "info",
        title: "Why 72 Hours?",
        titleDa: "Hvorfor 72 timer?",
        body: `Denmark's Beredskabsstyrelsen (DEMA) officially recommends every household be able to manage on its own for **3 days (72 hours)** during a crisis.

### Why this number?
If citizens manage on their own for three days, the authorities can focus on:
- Stabilising critical infrastructure (power, water, communications)
- Evacuating the most vulnerable
- Coordinating emergency response across kommuner (municipalities)

### It's not hypothetical
- **2011 Copenhagen cloudburst**: 50,000 homes lost heat for a full week
- **2025 Spain/Portugal blackout**: 5 EU countries lost power simultaneously — shops, ATMs, trains, and phone networks went offline for hours
- **Denmark's 2026 Totalberedskab strategy**: DKK 1.2 billion allocated to civil-military emergency preparedness, integrating civilian and defence readiness

### Not just Denmark
The EU Commission also recommends 72-hour household survival kits across all member states. Denmark's recommendation is based on the **National Risk Assessment** (national risikovurdering) developed by DEMA in collaboration with multiple authorities.

The good news? Building your kit is simpler than you think.`,
        bodyDa: `Beredskabsstyrelsen anbefaler officielt at hver husstand skal kunne klare sig selv i **3 dage (72 timer)** under en krise.

### Hvorfor dette tal?
Hvis borgerne klarer sig selv i tre dage, kan myndighederne fokusere på:
- At stabilisere kritisk infrastruktur (strøm, vand, kommunikation)
- At evakuere de mest sårbare
- At koordinere beredskabsrespons på tværs af kommuner

### Det er ikke hypotetisk
- **Skybruddet i København 2011**: 50.000 boliger mistede varme i en hel uge
- **Strømafbrydelsen i Spanien/Portugal 2025**: 5 EU-lande mistede strøm samtidigt — butikker, hæveautomater, tog og telefonnetværk gik ned i timevis
- **Danmarks Totalberedskab-strategi 2026**: 1,2 milliarder kr. afsat til civil-militær beredskab, der integrerer civilt og forsvarsmæssigt beredskab

### Ikke kun Danmark
EU-Kommissionen anbefaler også 72-timers nødforsyninger til husstande i alle medlemsstater. Danmarks anbefaling er baseret på den **nationale risikovurdering** udviklet af Beredskabsstyrelsen i samarbejde med flere myndigheder.

Den gode nyhed? At bygge din nødforsyning er nemmere end du tror.`,
        sourceUrl: "https://www.brs.dk/en/prepared",
        keyTakeaway:
          "DEMA says: manage 3 days on your own so authorities can help the most vulnerable first.",
        keyTakeawayDa:
          "Beredskabsstyrelsen siger: klar dig selv i 3 dage, så myndighederne kan hjælpe de mest sårbare først.",
        funFact:
          "Denmark allocated DKK 1.2 billion for emergency preparedness in 2026 and launched a new 'total preparedness strategy' integrating military and civilian emergency functions.",
        funFactDa:
          "Danmark afsatte 1,2 milliarder kroner til beredskab i 2026 og lancerede en ny 'totalberedskabsstrategi' der integrerer militære og civile beredskabsfunktioner.",
      },
    },

    // ── Step 2: Quiz — most likely crisis ────────────────────
    {
      id: "kit-quiz-likely-crisis",
      stepNumber: 2,
      type: "quiz",
      content: {
        type: "quiz",
        question:
          "According to DEMA's national risk assessment, which crisis scenario is MOST likely to affect Danish households?",
        questionDa:
          "Ifølge Beredskabsstyrelsens nationale risikovurdering, hvilket krisescenario vil MEST sandsynligt påvirke danske husstande?",
        options: [
          {
            id: "a",
            text: "Extreme weather events (storms, cloudbursts, flooding)",
            textDa: "Ekstremt vejr (storme, skybrud, oversvømmelser)",
            correct: true,
            explanation:
              "Correct! Denmark's risk assessment identifies extreme weather as the most probable disruption for households. Climate change is increasing the frequency and intensity of storms and cloudbursts. The 2011 Copenhagen cloudburst alone affected over 90,000 households.",
            explanationDa:
              "Korrekt! Danmarks risikovurdering identificerer ekstremt vejr som den mest sandsynlige forstyrrelse for husstande. Klimaforandringer øger hyppigheden og intensiteten af storme og skybrud. Skybruddet i København i 2011 alene påvirkede over 90.000 husstande.",
          },
          {
            id: "b",
            text: "Cyberattack on critical infrastructure",
            textDa: "Cyberangreb på kritisk infrastruktur",
            correct: false,
            explanation:
              "Cyberattacks are a growing concern in Denmark's risk assessment, but extreme weather events are statistically more frequent and have historically caused more widespread household disruption.",
            explanationDa:
              "Cyberangreb er en voksende bekymring i Danmarks risikovurdering, men ekstremt vejr er statistisk hyppigere og har historisk forårsaget mere udbredt forstyrrelse af husstande.",
          },
          {
            id: "c",
            text: "Prolonged power grid failure",
            textDa: "Langvarig strømnetudbrud",
            correct: false,
            explanation:
              "Denmark's power grid is reliable, but major outages can happen — often triggered by extreme weather. The weather itself is the more likely root cause affecting households.",
            explanationDa:
              "Danmarks elnet er pålideligt, men store udfald kan ske — ofte udløst af ekstremt vejr. Vejret er selve den mere sandsynlige grundårsag der påvirker husstande.",
          },
          {
            id: "d",
            text: "Military conflict affecting Denmark directly",
            textDa: "Militær konflikt der direkte påvirker Danmark",
            correct: false,
            explanation:
              "While Denmark has strengthened defence preparedness, direct military conflict on Danish soil is assessed as less probable than natural disasters and weather events.",
            explanationDa:
              "Selvom Danmark har styrket forsvarsberedskabet, vurderes direkte militær konflikt på dansk jord som mindre sandsynlig end naturkatastrofer og vejrhændelser.",
          },
        ],
        points: 10,
        difficulty: "easy",
        hint: "Think about what has actually disrupted Danish households in recent years.",
        hintDa: "Tænk over hvad der rent faktisk har forstyrret danske husstande de seneste år.",
      },
    },

    // ── Step 3: Water ────────────────────────────────────────
    {
      id: "kit-info-water",
      stepNumber: 3,
      type: "info",
      content: {
        type: "info",
        title: "Water: Your #1 Priority",
        titleDa: "Vand: Din vigtigste prioritet",
        body: `DEMA recommends **3 litres per person per day** for drinking and food preparation. For 3 days, that's **9 litres per person**.

### Quick math
| Household | Total water needed |
|-----------|-------------------|
| 1 person | 9 litres |
| 2 people | 18 litres |
| 3 people | 27 litres |
| 4 people | 36 litres |

### Storage tips
- **Commercially sealed bottles** last 1-2 years — check expiry dates
- Store in a **cool, dark place** away from chemicals
- Don't use old milk jugs or containers that held other liquids
- Replace stored tap water every **6 months**

### Don't forget pets
Large dogs need roughly 1-2 litres per day. Cats need about 0.3 litres. Add this to your household total.

### Why water fails in a crisis
Water treatment and pumping depend on electricity. When power goes down:
1. Pumps stop → water pressure drops
2. Treatment plants can't purify → boil-water advisories
3. After 12-24 hours → taps may run dry entirely

This is why stored water is non-negotiable.`,
        bodyDa: `Beredskabsstyrelsen anbefaler **3 liter per person per dag** til drikkevand og madlavning. For 3 dage er det **9 liter per person**.

### Hurtig beregning
| Husstand | Samlet vandbehov |
|----------|------------------|
| 1 person | 9 liter |
| 2 personer | 18 liter |
| 3 personer | 27 liter |
| 4 personer | 36 liter |

### Opbevaringstips
- **Kommercielt forseglede flasker** holder 1-2 år — tjek udløbsdato
- Opbevar på et **køligt, mørkt sted** væk fra kemikalier
- Brug ikke gamle mælkekartoner eller beholdere der har haft andre væsker
- Udskift opbevaret postevand hver **6. måned**

### Glem ikke kæledyr
Store hunde har brug for cirka 1-2 liter om dagen. Katte har brug for cirka 0,3 liter. Læg dette til din husstands total.

### Hvorfor vand svigter i en krise
Vandbehandling og pumpning afhænger af elektricitet. Når strømmen går:
1. Pumper stopper → vandtrykket falder
2. Behandlingsanlæg kan ikke rense → kog-vand-rådgivning
3. Efter 12-24 timer → vandhanerne kan løbe helt tørre

Derfor er opbevaret vand ikke til forhandling.`,
        sourceUrl: "https://www.brs.dk/en/prepared",
        keyTakeaway:
          "Store 3 litres per person per day — that's 9 litres per person for a 72-hour kit. Don't forget pets.",
        keyTakeawayDa:
          "Opbevar 3 liter per person per dag — det er 9 liter per person til en 72-timers nødforsyning. Glem ikke kæledyr.",
        funFact:
          "A human can survive about 3 weeks without food but only about 3 days without water. In Denmark's temperate climate, dehydration during a winter power outage is a real risk because people forget to drink when it's cold.",
        funFactDa:
          "Et menneske kan overleve cirka 3 uger uden mad, men kun cirka 3 dage uden vand. I Danmarks tempererede klima er dehydrering under et vinterstrømudbrud en reel risiko, fordi folk glemmer at drikke når det er koldt.",
      },
    },

    // ── Step 4: Quiz — water math ────────────────────────────
    {
      id: "kit-quiz-water-math",
      stepNumber: 4,
      type: "quiz",
      content: {
        type: "quiz",
        question:
          "A household of 3 people and one large dog needs water for 72 hours. Following DEMA guidelines (3L/person/day, ~1.5L/day for a large dog), how much water should they store?",
        questionDa:
          "En husstand med 3 personer og én stor hund har brug for vand i 72 timer. Ifølge Beredskabsstyrelsens retningslinjer (3L/person/dag, ~1,5L/dag for en stor hund), hvor meget vand bør de opbevare?",
        options: [
          {
            id: "a",
            text: "31.5 litres",
            textDa: "31,5 liter",
            correct: true,
            explanation:
              "Correct! 3 people × 3L × 3 days = 27L. Plus 1 dog × 1.5L × 3 days = 4.5L. Total: 31.5 litres. That's roughly five 6-litre bottles plus a smaller one.",
            explanationDa:
              "Korrekt! 3 personer × 3L × 3 dage = 27L. Plus 1 hund × 1,5L × 3 dage = 4,5L. I alt: 31,5 liter. Det svarer til cirka fem 6-liters dunke plus en mindre.",
          },
          {
            id: "b",
            text: "27 litres",
            textDa: "27 liter",
            correct: false,
            explanation:
              "27 litres covers the 3 people (3 × 3L × 3 days), but you forgot the dog! A large dog needs about 1.5L/day × 3 days = 4.5L extra. Total should be 31.5L.",
            explanationDa:
              "27 liter dækker de 3 personer (3 × 3L × 3 dage), men du glemte hunden! En stor hund har brug for cirka 1,5L/dag × 3 dage = 4,5L ekstra. I alt bør det være 31,5L.",
          },
          {
            id: "c",
            text: "18 litres",
            textDa: "18 liter",
            correct: false,
            explanation:
              "18 litres would cover 2 people for 3 days, not 3 people plus a dog. The correct calculation: (3 × 3 × 3) + (1.5 × 3) = 31.5 litres.",
            explanationDa:
              "18 liter ville dække 2 personer i 3 dage, ikke 3 personer plus en hund. Den korrekte beregning: (3 × 3 × 3) + (1,5 × 3) = 31,5 liter.",
          },
          {
            id: "d",
            text: "36 litres",
            textDa: "36 liter",
            correct: false,
            explanation:
              "Close! 36L would be the amount for 4 people (4 × 3 × 3). But this household has 3 people + 1 dog. A dog needs less than a person — about 1.5L/day. Correct total: 31.5L.",
            explanationDa:
              "Tæt på! 36L ville være mængden for 4 personer (4 × 3 × 3). Men denne husstand har 3 personer + 1 hund. En hund har brug for mindre end et menneske — cirka 1,5L/dag. Korrekt total: 31,5L.",
          },
        ],
        points: 10,
        difficulty: "medium",
        hint: "Calculate humans and the dog separately, then add them together.",
        hintDa: "Beregn mennesker og hunden separat, og læg dem derefter sammen.",
      },
    },

    // ── Step 5: Food ─────────────────────────────────────────
    {
      id: "kit-info-food",
      stepNumber: 5,
      type: "info",
      content: {
        type: "info",
        title: "Food That Works Without Power",
        titleDa: "Mad der virker uden strøm",
        body: `Your emergency food must survive without a refrigerator and be edible without cooking. DEMA recommends choosing foods your household already enjoys.

### Good choices (Gode valg)
- **Canned goods** (dåsemad) — beans, tuna, soup, fruit, vegetables. Get a manual can opener!
- **Knækbrød (crispbread)** & crackers — long shelf life, no preparation
- **Peanut butter & Nutella** — calorie-dense, lasts months
- **Dried fruit & nuts** (tørret frugt og nødder) — lightweight energy
- **Müsli bars & energy bars** — portable and filling
- **UHT milk** (langtidsholdbar mælk) — lasts months unopened
- **Honey** — literally never expires
- **Rugbrød (rye bread)** — vacuum-packed for longer shelf life

### For infants
- Formula and sterile water
- Ready-to-feed bottles if possible (no mixing needed)

### For pets
- 3 days of regular pet food, stored with your kit
- Don't forget treats for comfort — stressed animals need reassurance too

### Rotation tip
Build your kit from food you actually eat. When a can approaches its expiry, eat it and replace it. Your kit stays fresh and you waste nothing.`,
        bodyDa: `Din nødmad skal kunne overleve uden køleskab og kunne spises uden madlavning. Beredskabsstyrelsen anbefaler at vælge mad din husstand allerede kan lide.

### Gode valg
- **Dåsemad** — bønner, tun, suppe, frugt, grøntsager. Husk en manuel dåseåbner!
- **Knækbrød** & kiks — lang holdbarhed, ingen tilberedning
- **Jordnøddesmør & Nutella** — kalorierigt, holder i måneder
- **Tørret frugt og nødder** — letvægts energi
- **Müslibarer og energibarer** — bærbare og mættende
- **Langtidsholdbar mælk** — holder i måneder uåbnet
- **Honning** — udløber bogstaveligt talt aldrig
- **Rugbrød** — vakuumpakket for længere holdbarhed

### Til spædbørn
- Modermælkserstatning og sterilt vand
- Drikkeklare flasker hvis muligt (ingen blanding nødvendig)

### Til kæledyr
- 3 dages almindelig dyrefoder, opbevaret med din nødforsyning
- Glem ikke godbidder for tryghed — stressede dyr har også brug for beroligelse

### Rotationstip
Byg din nødforsyning af mad du faktisk spiser. Når en dåse nærmer sig udløb, spis den og erstat den. Din nødforsyning forbliver frisk og du spilder intet.`,
        sourceUrl: "https://www.brs.dk/en/prepared",
        keyTakeaway:
          "Stock non-perishable food that needs no cooking or refrigeration. Rotate it by eating and replacing items before expiry.",
        keyTakeawayDa:
          "Opbevar langtidsholdbar mad der ikke kræver madlavning eller køling. Rotér den ved at spise og erstatte varer inden udløb.",
        funFact:
          "Honey found in 3,000-year-old Egyptian tombs was still perfectly edible. It's the only food that genuinely never spoils.",
        funFactDa:
          "Honning fundet i 3.000 år gamle egyptiske grave var stadig helt spiselig. Det er den eneste mad der bogstaveligt talt aldrig fordærves.",
      },
    },

    // ── Step 6: Interactive — personalise your kit ────────────
    {
      id: "kit-interactive-personalise",
      stepNumber: 6,
      type: "interactive",
      content: {
        type: "interactive",
        interactiveType: "personalize",
        title: "Personalise Your Kit",
        titleDa: "Tilpas din nødforsyning",
        instructions:
          "Tell us about your household so we can calculate exactly what you need for 72 hours.",
        instructionsDa:
          "Fortæl os om din husstand, så vi kan beregne præcis hvad du har brug for i 72 timer.",
        config: {
          questions: [
            {
              id: "adults",
              label: "Number of adults (18+)",
              labelDa: "Antal voksne (18+)",
              type: "number",
              min: 1,
              max: 10,
              default: 2,
            },
            {
              id: "children",
              label: "Number of children (1–17)",
              labelDa: "Antal børn (1–17)",
              type: "number",
              min: 0,
              max: 10,
              default: 0,
            },
            {
              id: "infants",
              label: "Infants (under 1 year)",
              labelDa: "Spædbørn (under 1 år)",
              type: "number",
              min: 0,
              max: 5,
              default: 0,
            },
            {
              id: "pets",
              label: "Do you have pets?",
              labelDa: "Har du kæledyr?",
              type: "select",
              options: [
                { value: "none", label: "No pets", labelDa: "Ingen kæledyr" },
                { value: "dog", label: "Dog", labelDa: "Hund" },
                { value: "cat", label: "Cat", labelDa: "Kat" },
                { value: "both", label: "Dog and cat", labelDa: "Hund og kat" },
              ],
              default: "none",
            },
            {
              id: "iodine_eligible",
              label: "Is anyone under 40, pregnant, or breastfeeding?",
              labelDa: "Er nogen under 40, gravid eller ammende?",
              type: "boolean",
              default: false,
              helpText:
                "Iodine tablets are recommended for people under 40, pregnant women, and breastfeeding women in case of a nuclear incident.",
              helpTextDa:
                "Jodtabletter anbefales til personer under 40, gravide kvinder og ammende kvinder i tilfælde af en nuklear hændelse.",
            },
            {
              id: "essential_medicines",
              label: "Does anyone take daily medication?",
              labelDa: "Tager nogen daglig medicin?",
              type: "boolean",
              default: false,
            },
          ],
        },
      },
    },

    // ── Step 7: Scenario — power out, phone dying ────────────
    {
      id: "kit-scenario-power-out",
      stepNumber: 7,
      type: "scenario",
      content: {
        type: "scenario",
        situation: `It's a cold November evening. The power went out 8 hours ago across your neighbourhood. Your phone is at 15% battery. Mobile signal is weak but still working. All nearby shops are closed and dark. You have no cash — only MobilePay and cards. Your power bank is empty because you forgot to charge it.

You're getting cold, hungry, and uncertain about how long this will last. What do you prioritise?`,
        situationDa: `Det er en kold novemberaften. Strømmen har været ude i 8 timer i dit nabolag. Din telefon er på 15% batteri. Mobilsignalet er svagt men virker stadig. Alle nærliggende butikker er lukket og mørke. Du har ingen kontanter — kun MobilePay og kort. Din powerbank er tom fordi du glemte at oplade den.

Du fryser, er sulten og usikker på hvor længe det her varer. Hvad prioriterer du?`,
        urgencyLevel: "medium",
        choices: [
          {
            id: "a",
            text: "Use remaining battery to check DR.dk or dmi.dk for the outage status, then switch to airplane mode and conserve power for a 112 call if needed. Use candles for light and wrap in blankets for warmth.",
            textDa:
              "Brug resterende batteri til at tjekke DR.dk eller dmi.dk for status på afbrydelsen, skift derefter til flytilstand og spar strøm til et 112-opkald om nødvendigt. Brug stearinlys til lys og pak dig ind i tæpper for varme.",
            outcome:
              "Optimal response. Checking official sources first tells you the expected duration. Airplane mode preserves battery for genuine emergencies. Candles and blankets provide light and warmth without power. This is exactly why DEMA recommends a battery FM radio — so your phone isn't your only information source.",
            outcomeDa:
              "Optimal reaktion. At tjekke officielle kilder først fortæller dig den forventede varighed. Flytilstand bevarer batteri til reelle nødsituationer. Stearinlys og tæpper giver lys og varme uden strøm. Det er præcis derfor Beredskabsstyrelsen anbefaler en batteri-FM-radio — så din telefon ikke er din eneste informationskilde.",
            score: 100,
            consequence: "optimal",
          },
          {
            id: "b",
            text: "Walk to a friend's neighbourhood to see if they have power and can let you charge your phone and warm up",
            textDa:
              "Gå hen til en vens nabolag for at se om de har strøm og kan lade dig oplade din telefon og varme dig",
            outcome:
              "Risky. Walking in a blacked-out area at night is dangerous — traffic lights are off, streets are dark, and you may not find power elsewhere either. If the outage is widespread, you've expended energy and body heat for nothing. Better to shelter in place with blankets and candles.",
            outcomeDa:
              "Risikabelt. At gå rundt i et strømløst område om natten er farligt — trafiklys er slukket, gader er mørke, og du finder måske heller ikke strøm andetsteds. Hvis afbrydelsen er udbredt, har du brugt energi og kropsvarme forgæves. Bedre at søge ly med tæpper og stearinlys.",
            score: 25,
            consequence: "risky",
          },
          {
            id: "c",
            text: "Turn off the phone completely to save all battery, light candles, eat whatever is in the fridge before it spoils, and wait it out",
            textDa:
              "Sluk telefonen helt for at spare alt batteri, tænd stearinlys, spis det der er i køleskabet inden det fordærves, og vent det ud",
            outcome:
              "Partially good — conserving battery and using candles is smart, and eating perishables first makes sense. But turning the phone completely off means you miss S!RENEN alerts and can't call 112. Better: check official updates once, then switch to airplane mode rather than powering off entirely.",
            outcomeDa:
              "Delvist godt — at spare batteri og bruge stearinlys er klogt, og at spise letfordærvelige varer først giver mening. Men at slukke telefonen helt betyder du går glip af S!RENEN-beskeder og ikke kan ringe 112. Bedre: tjek officielle opdateringer én gang, skift derefter til flytilstand i stedet for at slukke helt.",
            score: 55,
            consequence: "acceptable",
          },
        ],
      },
    },

    // ── Step 8: Communications ───────────────────────────────
    {
      id: "kit-info-comms",
      stepNumber: 8,
      type: "info",
      content: {
        type: "info",
        title: "Staying Connected When Everything Goes Down",
        titleDa: "Hold forbindelsen når alt går ned",
        body: `In a prolonged crisis, your usual communication channels fail one by one. Here's what to prepare:

### FM Radio (Your lifeline)
DR P1 broadcasts official emergency information 24/7. A **battery-operated, wind-up, or solar FM radio** works when:
- Power is out
- Internet is down
- Mobile networks are overloaded or collapsed

This is the single most important communication tool in your kit.

### Power bank (Powerbank)
- Keep a 10,000+ mAh power bank **charged to 80%** at all times
- Charges a phone 2-3 times
- Recharge it every 3 months (lithium batteries degrade at 100%)
- During a crisis: use phone sparingly, airplane mode between checks

### Cash (Kontanter)
When power fails, card terminals and MobilePay stop working:
- Store **DKK 500–1,000** in small denominations and coins
- Small shops may still sell essentials for cash
- Memorise your card PIN — don't rely on contactless only

### Physical payment cards
- Keep at least one physical card (not just phone wallet)
- **Memorise the PIN** — if your phone dies, you can't look it up
- Some systems restore faster than others — cards may work before MobilePay

### Emergency contacts on paper
Write down key phone numbers — don't rely on your phone's contact list:
- Family members, neighbours, your doctor
- 112 (emergency), 114 (police), 1813 (medical helpline)
- Your kommune's emergency number`,
        bodyDa: `I en langvarig krise svigter dine normale kommunikationskanaler én efter én. Her er hvad du skal forberede:

### FM-radio (Din livline)
DR P1 sender officiel beredskabsinformation 24/7. En **batteridrevet, optrækker- eller soldrevet FM-radio** virker når:
- Strømmen er væk
- Internettet er nede
- Mobilnetværk er overbelastede eller kollapset

Dette er det vigtigste kommunikationsværktøj i din nødforsyning.

### Powerbank
- Hold en 10.000+ mAh powerbank **opladet til 80%** til enhver tid
- Oplader en telefon 2-3 gange
- Genoplad den hver 3. måned (lithiumbatterier nedbrydes ved 100%)
- Under en krise: brug telefon sparsomt, flytilstand mellem tjek

### Kontanter
Når strømmen svigter, stopper kortterminaler og MobilePay med at virke:
- Opbevar **500-1.000 kr.** i små sedler og mønter
- Små butikker sælger måske stadig nødvendigheder mod kontanter
- Husk din kort-PIN — stol ikke kun på kontaktløs betaling

### Fysiske betalingskort
- Hav mindst ét fysisk kort (ikke kun telefonpung)
- **Husk PIN-koden** — hvis din telefon dør, kan du ikke slå den op
- Nogle systemer gendannes hurtigere end andre — kort kan virke før MobilePay

### Nødkontakter på papir
Skriv vigtige telefonnumre ned — stol ikke på telefonens kontaktliste:
- Familiemedlemmer, naboer, din læge
- 112 (nødsituation), 114 (politi), 1813 (lægevagt)
- Din kommunes nødnummer`,
        sourceUrl: "https://www.brs.dk/en/prepared",
        keyTakeaway:
          "A battery FM radio is your #1 communication tool. Back it up with a charged power bank, cash in small notes, and emergency contacts on paper.",
        keyTakeawayDa:
          "En batteri-FM-radio er dit vigtigste kommunikationsværktøj. Supplér med en opladet powerbank, kontanter i små sedler og nødkontakter på papir.",
        funFact:
          "During the 2025 Iberian blackout, MobilePay and card payments failed across 5 countries simultaneously. People with cash were the only ones who could buy food and water.",
        funFactDa:
          "Under den iberiske strømafbrydelse i 2025 svigtede MobilePay og kortbetalinger i 5 lande samtidigt. Folk med kontanter var de eneste der kunne købe mad og vand.",
      },
    },

    // ── Step 9: Quiz — phone networks down ───────────────────
    {
      id: "kit-quiz-fm-radio",
      stepNumber: 9,
      type: "quiz",
      content: {
        type: "quiz",
        question:
          "Mobile networks are down and internet is offline. How do Danish authorities broadcast emergency instructions to the public?",
        questionDa:
          "Mobilnetværk er nede og internettet er offline. Hvordan udsender de danske myndigheder nødinstrukser til offentligheden?",
        options: [
          {
            id: "a",
            text: "DR P1 FM radio — which works without internet or mobile networks",
            textDa: "DR P1 FM-radio — som virker uden internet eller mobilnetværk",
            correct: true,
            explanation:
              "Correct! DR (Danmarks Radio) P1 is the official emergency broadcast channel. FM radio signals are transmitted from powerful towers that have backup generators — they work when everything else fails. This is why DEMA lists a battery FM radio as an essential item in every household kit.",
            explanationDa:
              "Korrekt! DR (Danmarks Radio) P1 er den officielle nødudsendelseskanal. FM-radiosignaler sendes fra kraftige tårne der har nødgeneratorer — de virker når alt andet svigter. Derfor opfører Beredskabsstyrelsen en batteri-FM-radio som en essentiel genstand i enhver nødforsyning.",
          },
          {
            id: "b",
            text: "S!RENEN mobile alerts via cell broadcast",
            textDa: "S!RENEN-mobilbeskeder via cell broadcast",
            correct: false,
            explanation:
              "S!RENEN cell broadcasts can work without internet, but they depend on mobile network towers being powered and operational. If networks are fully down, these alerts can't reach you. FM radio is the true fallback.",
            explanationDa:
              "S!RENEN cell broadcasts kan virke uden internet, men de afhænger af at mobiltårne har strøm og er operationelle. Hvis netværk er helt nede, kan disse beskeder ikke nå dig. FM-radio er den ægte nødløsning.",
          },
          {
            id: "c",
            text: "Loudspeaker trucks driving through neighbourhoods",
            textDa: "Højttalervogne der kører gennem nabolag",
            correct: false,
            explanation:
              "While authorities may use loudspeakers in specific evacuation scenarios, this isn't scalable for nationwide communication. FM radio reaches the entire country simultaneously.",
            explanationDa:
              "Selvom myndigheder kan bruge højttalere i specifikke evakueringsscenarier, er dette ikke skalerbart til landsdækkende kommunikation. FM-radio når hele landet samtidigt.",
          },
          {
            id: "d",
            text: "Social media posts on the government's accounts",
            textDa: "Opslag på sociale medier fra myndighedernes konti",
            correct: false,
            explanation:
              "Social media requires both internet and powered devices. When mobile networks and internet are down, social media is completely inaccessible. FM radio is the only mass communication that works independently of all digital infrastructure.",
            explanationDa:
              "Sociale medier kræver både internet og strøm på enheder. Når mobilnetværk og internet er nede, er sociale medier helt utilgængelige. FM-radio er den eneste massekommunikation der virker uafhængigt af al digital infrastruktur.",
          },
        ],
        points: 20,
        difficulty: "medium",
        hint: "Think about which technology works with zero digital infrastructure.",
        hintDa: "Tænk over hvilken teknologi der virker med nul digital infrastruktur.",
      },
    },

    // ── Step 10: Interactive — full checklist ─────────────────
    {
      id: "kit-interactive-full-checklist",
      stepNumber: 10,
      type: "interactive",
      content: {
        type: "interactive",
        interactiveType: "checklist",
        title: "Your Complete 72-Hour Kit Checklist",
        titleDa: "Din komplette 72-timers nødforsynings tjekliste",
        instructions:
          "Check off items you already have. Quantities are adjusted based on your household profile from Step 6. Your readiness score will be calculated automatically.",
        instructionsDa:
          "Markér ting du allerede har. Mængder er tilpasset baseret på din husstandsprofil fra Trin 6. Din beredskabsscore beregnes automatisk.",
        config: {
          items: [
            // Water
            {
              id: "water",
              label: "Drinking water (9L per person)",
              labelDa: "Drikkevand (9L per person)",
              category: "Water (Vand)",
              essential: true,
              perPerson: true,
              quantity: "9 litres",
            },
            // Food
            {
              id: "canned-food",
              label: "Canned food — 3 days of meals",
              labelDa: "Dåsemad — 3 dages måltider",
              category: "Food (Mad)",
              essential: true,
              perPerson: true,
              quantity: "6-9 cans",
            },
            {
              id: "crackers",
              label: "Knækbrød / crackers",
              labelDa: "Knækbrød / kiks",
              category: "Food (Mad)",
              essential: true,
              perPerson: false,
              quantity: "2 packs",
            },
            {
              id: "snacks",
              label: "Energy bars, nuts, dried fruit",
              labelDa: "Energibarer, nødder, tørret frugt",
              category: "Food (Mad)",
              essential: false,
              perPerson: true,
              quantity: "6-9 bars",
            },
            {
              id: "can-opener",
              label: "Manual can opener",
              labelDa: "Manuel dåseåbner",
              category: "Food (Mad)",
              essential: true,
              perPerson: false,
              quantity: "1",
            },
            // Communication
            {
              id: "fm-radio",
              label: "Battery / wind-up / solar FM radio",
              labelDa: "Batteri / optræk / sol FM-radio",
              category: "Communication (Kommunikation)",
              essential: true,
              perPerson: false,
              quantity: "1",
            },
            {
              id: "powerbank",
              label: "Power bank (10,000+ mAh, charged to 80%)",
              labelDa: "Powerbank (10.000+ mAh, opladet til 80%)",
              category: "Communication (Kommunikation)",
              essential: true,
              perPerson: false,
              quantity: "1",
            },
            // Light & Heat
            {
              id: "flashlight",
              label: "Flashlight (lommelygte) + spare batteries",
              labelDa: "Lommelygte + ekstra batterier",
              category: "Light & Heat (Lys & Varme)",
              essential: true,
              perPerson: false,
              quantity: "1 + batteries",
            },
            {
              id: "candles",
              label: "Candles (stearinlys) + matches / lighter",
              labelDa: "Stearinlys + tændstikker / lighter",
              category: "Light & Heat (Lys & Varme)",
              essential: true,
              perPerson: false,
              quantity: "10+ candles, 2 lighters",
            },
            {
              id: "blankets",
              label: "Extra blankets or sleeping bags",
              labelDa: "Ekstra tæpper eller soveposer",
              category: "Light & Heat (Lys & Varme)",
              essential: true,
              perPerson: true,
              quantity: "1 per person",
            },
            // Payment
            {
              id: "cash",
              label: "Cash in small denominations + coins",
              labelDa: "Kontanter i små sedler + mønter",
              category: "Payment (Betaling)",
              essential: true,
              perPerson: false,
              quantity: "DKK 500-1,000",
            },
            {
              id: "payment-card",
              label: "Physical payment card (PIN memorised!)",
              labelDa: "Fysisk betalingskort (PIN husket!)",
              category: "Payment (Betaling)",
              essential: true,
              perPerson: false,
              quantity: "1+ per adult",
            },
            // Health
            {
              id: "medicines",
              label: "Essential medicines (3+ days supply)",
              labelDa: "Vigtig medicin (3+ dages forsyning)",
              category: "Health (Sundhed)",
              essential: true,
              perPerson: false,
              quantity: "As prescribed",
              conditionalOn: "essential_medicines",
            },
            {
              id: "first-aid",
              label: "First aid kit (bandages, disinfectant, gauze)",
              labelDa: "Førstehjælpskasse (bandager, desinfektionsmiddel, gaze)",
              category: "Health (Sundhed)",
              essential: true,
              perPerson: false,
              quantity: "1",
            },
            {
              id: "iodine",
              label: "Iodine tablets (jodtabletter)",
              labelDa: "Jodtabletter",
              category: "Health (Sundhed)",
              essential: false,
              perPerson: true,
              quantity: "130mg/adult, 65mg/child 3-12, 32.5mg/child 1-3",
              conditionalOn: "iodine_eligible",
            },
            // Hygiene
            {
              id: "toilet-paper",
              label: "Toilet paper",
              labelDa: "Toiletpapir",
              category: "Hygiene (Hygiejne)",
              essential: true,
              perPerson: true,
              quantity: "1 roll",
            },
            {
              id: "sanitizer",
              label: "Hand sanitizer + wet wipes",
              labelDa: "Håndsprit + vådservietter",
              category: "Hygiene (Hygiejne)",
              essential: true,
              perPerson: false,
              quantity: "1 bottle + 1 pack",
            },
            // Documents
            {
              id: "emergency-contacts",
              label: "Emergency contacts written on paper",
              labelDa: "Nødkontakter skrevet på papir",
              category: "Documents (Dokumenter)",
              essential: true,
              perPerson: false,
              quantity: "1 list",
            },
            {
              id: "document-copies",
              label: "Copies of ID, insurance, prescriptions",
              labelDa: "Kopier af ID, forsikring, recepter",
              category: "Documents (Dokumenter)",
              essential: false,
              perPerson: false,
              quantity: "1 set",
            },
            // Pets (conditional)
            {
              id: "pet-food",
              label: "Pet food (3 days supply)",
              labelDa: "Dyrefoder (3 dages forsyning)",
              category: "Pets (Kæledyr)",
              essential: true,
              perPerson: false,
              quantity: "3 days",
              conditionalOn: "pets",
            },
            {
              id: "pet-water",
              label: "Extra water for pets",
              labelDa: "Ekstra vand til kæledyr",
              category: "Pets (Kæledyr)",
              essential: true,
              perPerson: false,
              quantity: "1-2L/day for dogs, 0.3L/day for cats",
              conditionalOn: "pets",
            },
          ],
        },
      },
    },
  ],
  sources: [
    {
      title: "DEMA — Prepared for Crises",
      url: "https://www.brs.dk/en/prepared",
    },
    {
      title: "S!RENEN — Public Warning System",
      url: "https://www.brs.dk/en/sirenen/",
    },
    {
      title: "DMI Weather Warnings",
      url: "https://www.dmi.dk/varsler/warnings",
    },
    {
      title: "Sundhedsstyrelsen — Jod og jodtabletter",
      url: "https://www.sst.dk/vidensbase/forebyggelse/forurening-og-miljoe/luftforurening/jod-og-jodtabletter",
    },
    {
      title: "2011 Copenhagen Cloudburst — Wikipedia",
      url: "https://en.wikipedia.org/wiki/2011_cloudburst_in_Denmark",
    },
  ],
};
