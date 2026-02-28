import type { Lesson } from "../schema";

export const floodLesson: Lesson = {
  id: "floods-101",
  title: "Flooding in Denmark",
  titleDa: "Oversvømmelse i Danmark",
  description:
    "Learn what causes flooding in Denmark, how to read warning systems, and what to do when water rises — from cloudbursts to storm surges.",
  descriptionDa:
    "Lær hvad der forårsager oversvømmelser i Danmark, hvordan du læser varslingssystemer, og hvad du skal gøre når vandet stiger — fra skybrud til stormflod.",
  icon: "CloudRain",
  estimatedMinutes: 18,
  category: "floods",
  difficulty: "beginner",
  steps: [
    // ── Step 1: Causes of flooding ───────────────────────────
    {
      id: "floods-info-causes",
      stepNumber: 1,
      type: "info",
      content: {
        type: "info",
        title: "What Causes Flooding in Denmark?",
        titleDa: "Hvad forårsager oversvømmelser i Danmark?",
        body: `Denmark faces three main flood risks:

**1. Skybrud (Cloudbursts)**
Extreme rainfall where more than 15 mm falls in 30 minutes. Climate change is making these more frequent. Copenhagen is expected to receive **30% more rainfall** by the end of the century.

**2. Stormflod (Storm Surges)**
Powerful storms push seawater onto land. Denmark sits between the North Sea and the Baltic Sea, making coastlines especially vulnerable. Water levels in Øresund can rise by **over 4 metres** during severe storm surges.

**3. Havstigning (Sea Level Rise)**
Danish sea levels could rise by up to **1.2 metres** within this century. About 2% of Copenhagen's population already lives below 1 metre elevation — particularly on Amager, where roughly half the island sits at or below sea level.

**The 2011 Copenhagen Cloudburst**
On 2 July 2011, **150 mm of rain** fell in under two hours — a 1-in-1,000-year event. The damage cost over **DKK 6 billion** (€800M+), with over 90,000 insurance claims. 50,000 homes lost heat for a week.`,
        bodyDa: `Danmark står over for tre hovedtyper af oversvømmelsesrisiko:

**1. Skybrud**
Ekstrem nedbør hvor mere end 15 mm falder på 30 minutter. Klimaforandringer gør disse hyppigere. København forventes at få **30% mere nedbør** inden udgangen af dette århundrede.

**2. Stormflod**
Kraftige storme presser havvand ind over land. Danmark ligger mellem Nordsøen og Østersøen, hvilket gør kystlinjer særligt sårbare. Vandstanden i Øresund kan stige med **over 4 meter** under kraftig stormflod.

**3. Havstigning**
Danske havniveauer kan stige op til **1,2 meter** inden for dette århundrede. Cirka 2% af Københavns befolkning bor allerede under 1 meters højde — særligt på Amager, hvor cirka halvdelen af øen ligger på eller under havniveau.

**Skybruddet i København 2011**
Den 2. juli 2011 faldt **150 mm regn** på under to timer — en 1.000-års hændelse. Skaderne kostede over **6 milliarder kroner**, med over 90.000 forsikringskrav. 50.000 boliger mistede varme i en uge.`,
        sourceUrl:
          "https://en.klimatilpasning.dk/media/568851/copenhagen_adaption_plan.pdf",
        keyTakeaway:
          "Denmark faces cloudbursts, storm surges, and rising seas. The 2011 Copenhagen cloudburst caused DKK 6 billion in damage.",
        keyTakeawayDa:
          "Danmark oplever skybrud, stormflod og stigende havniveauer. Skybruddet i København i 2011 forårsagede skader for 6 milliarder kroner.",
        funFact:
          "Researchers proved that a century of human-caused warming doubled the risk of the 2011 cloudburst event.",
        funFactDa:
          "Forskere beviste at et århundrede med menneskeskabt opvarmning fordoblede risikoen for skybruddet i 2011.",
      },
    },

    // ── Step 2: Quiz — what is a skybrud? ────────────────────
    {
      id: "floods-quiz-skybrud",
      stepNumber: 2,
      type: "quiz",
      content: {
        type: "quiz",
        question: "What is a 'skybrud' (cloudburst)?",
        questionDa: "Hvad er et skybrud?",
        options: [
          {
            id: "a",
            text: "Extreme rainfall of more than 15 mm in 30 minutes",
            textDa: "Ekstrem nedbør på mere end 15 mm på 30 minutter",
            correct: true,
            explanation:
              "Correct! DMI defines a skybrud as rainfall exceeding 15 mm in 30 minutes. These events overwhelm sewers and drainage systems, causing flash flooding in urban areas.",
            explanationDa:
              "Korrekt! DMI definerer et skybrud som nedbør over 15 mm på 30 minutter. Disse hændelser overbelaster kloakker og dræningssystemer og forårsager lynoversvømmelser i byområder.",
          },
          {
            id: "b",
            text: "A type of coastal storm surge from the North Sea",
            textDa: "En type kyststormflod fra Nordsøen",
            correct: false,
            explanation:
              "That describes a stormflod (storm surge), not a skybrud. A skybrud is specifically about extreme rainfall intensity — more than 15 mm in 30 minutes.",
            explanationDa:
              "Det beskriver en stormflod, ikke et skybrud. Et skybrud handler specifikt om ekstrem nedbørsintensitet — mere end 15 mm på 30 minutter.",
          },
          {
            id: "c",
            text: "Prolonged rain lasting more than 48 hours continuously",
            textDa: "Langvarig regn der varer mere end 48 timer uafbrudt",
            correct: false,
            explanation:
              "Prolonged rain can also cause flooding, but a skybrud is defined by intensity, not duration. It's the sudden, extreme volume — 15+ mm in just 30 minutes — that makes it a skybrud.",
            explanationDa:
              "Langvarig regn kan også forårsage oversvømmelser, men et skybrud defineres af intensitet, ikke varighed. Det er den pludselige, ekstreme mængde — 15+ mm på kun 30 minutter — der gør det til et skybrud.",
          },
          {
            id: "d",
            text: "Flooding caused by melting snow in spring",
            textDa: "Oversvømmelse forårsaget af smeltende sne om foråret",
            correct: false,
            explanation:
              "Snowmelt flooding exists but is rare in Denmark's mild climate. A skybrud is a specific type of extreme rainfall event — sudden, intense, and typically in summer.",
            explanationDa:
              "Snesmeltningsoversvømmelser findes, men er sjældne i Danmarks milde klima. Et skybrud er en specifik type ekstrem nedbørshændelse — pludselig, intens og typisk om sommeren.",
          },
        ],
        points: 10,
        difficulty: "easy",
        hint: "Think about the intensity of the rain, not how long it lasts.",
        hintDa: "Tænk over regnens intensitet, ikke hvor længe den varer.",
      },
    },

    // ── Step 3: Warning systems ──────────────────────────────
    {
      id: "floods-info-warnings",
      stepNumber: 3,
      type: "info",
      content: {
        type: "info",
        title: "Denmark's Warning Systems",
        titleDa: "Danmarks varslingssystemer",
        body: `Denmark has multiple layers of emergency warnings:

### DMI Varsler (Weather Warnings)
The Danish Meteorological Institute issues warnings at four levels:

| Level | Colour | Danish | Meaning |
|-------|--------|--------|---------|
| Risikomelding | Yellow | Risikomelding | Stay informed — dangerous weather may develop |
| Kategori 1 | Orange | Voldsomt vejr | Severe — can affect you and your surroundings |
| Kategori 2 | Red | Farligt vejr | Dangerous — prepare for damage and accidents |
| Kategori 3 | Dark red | Meget farligt vejr | Very dangerous — great danger expected |

### S!RENEN (Public Warning System)
**1,078 physical sirens** across Denmark cover ~80% of the population:
- **Rising-and-falling tone (45 sec)** → GO INSIDE, close windows/doors, turn on DR
- **Long continuous tone (45 sec)** → DANGER IS OVER

**S!RENEN mobile alerts** use cell broadcast — they reach your phone even on silent or flight mode, no internet needed.

### DR (Danish Broadcasting)
During emergencies, DR P1 radio and DR TV broadcast official instructions. This is why a battery-powered FM radio is essential — it works when power and mobile networks fail.`,
        bodyDa: `Danmark har flere lag af nødvarsler:

### DMI Varsler
Danmarks Meteorologiske Institut udsender varsler på fire niveauer:

| Niveau | Farve | Navn | Betydning |
|--------|-------|------|-----------|
| Risikomelding | Gul | Risikomelding | Hold dig orienteret — farligt vejr kan udvikle sig |
| Kategori 1 | Orange | Voldsomt vejr | Alvorligt — kan påvirke dig og dine omgivelser |
| Kategori 2 | Rød | Farligt vejr | Farligt — forbered dig på skader og ulykker |
| Kategori 3 | Mørkerød | Meget farligt vejr | Meget farligt — stor fare forventes |

### S!RENEN (Offentligt varslingssystem)
**1.078 fysiske sirener** i hele Danmark dækker ~80% af befolkningen:
- **Stigende og faldende tone (45 sek)** → GÅ INDENFOR, luk vinduer/døre, tænd for DR
- **Lang kontinuerlig tone (45 sek)** → FAREN ER OVRE

**S!RENEN mobilbeskeder** bruger cell broadcast — de når din telefon selv på lydløs eller flytilstand, uden internet.

### DR (Danmarks Radio)
Under nødsituationer sender DR P1 radio og DR TV officielle instrukser. Derfor er en batteridrevet FM-radio vigtig — den virker når strøm og mobilnetværk svigter.`,
        sourceUrl: "https://www.dmi.dk/varsler/warnings",
        keyTakeaway:
          "Denmark uses DMI weather warnings (4 levels), S!RENEN sirens and mobile alerts, and DR broadcasts. Know all three.",
        keyTakeawayDa:
          "Danmark bruger DMI-vejrvarsler (4 niveauer), S!RENEN-sirener og mobilbeskeder, samt DR-udsendelser. Kend alle tre.",
        funFact:
          "S!RENEN sirens are tested every year on the first Wednesday of May. When installed, it was the largest public warning system in the world.",
        funFactDa:
          "S!RENEN-sirenerne testes hvert år den første onsdag i maj. Da de blev installeret, var det verdens største offentlige varslingssystem.",
      },
    },

    // ── Step 4: Quiz — DMI red warning ───────────────────────
    {
      id: "floods-quiz-red-warning",
      stepNumber: 4,
      type: "quiz",
      content: {
        type: "quiz",
        question:
          "You receive a DMI Kategori 2 (red) warning for heavy rain. What should you do FIRST?",
        questionDa:
          "Du modtager en DMI Kategori 2 (rød) varsel for kraftig regn. Hvad bør du gøre FØRST?",
        options: [
          {
            id: "a",
            text: "Go inside, follow authorities' advice, and monitor DR or dmi.dk continuously",
            textDa:
              "Gå indenfor, følg myndighedernes råd og overvåg DR eller dmi.dk løbende",
            correct: true,
            explanation:
              "Correct! Kategori 2 ('Farligt vejr') means dangerous weather that can cause damage and accidents. DEMA advises: go inside, follow authorities' instructions, and stay informed via official channels.",
            explanationDa:
              "Korrekt! Kategori 2 ('Farligt vejr') betyder farligt vejr der kan forårsage skader og ulykker. Beredskabsstyrelsen anbefaler: gå indenfor, følg myndighedernes instrukser og hold dig orienteret via officielle kanaler.",
          },
          {
            id: "b",
            text: "Drive to a safer area outside the city",
            textDa: "Kør til et sikrere område uden for byen",
            correct: false,
            explanation:
              "Driving during severe weather is dangerous. During the 2011 cloudburst, Helsingørmotorvejen was blocked in both directions. Just 30 cm of moving water can float a car. Stay where you are.",
            explanationDa:
              "At køre under alvorligt vejr er farligt. Under skybruddet i 2011 var Helsingørmotorvejen blokeret i begge retninger. Kun 30 cm strømmende vand kan løfte en bil. Bliv hvor du er.",
          },
          {
            id: "c",
            text: "Wait and see — red warnings are often exaggerated",
            textDa: "Vent og se — røde varsler er ofte overdrevne",
            correct: false,
            explanation:
              "Red is the second-highest level in Denmark's system. DMI issues these warnings based on rigorous meteorological data. Ignoring them puts you and others at risk.",
            explanationDa:
              "Rød er det næsthøjeste niveau i Danmarks system. DMI udsender disse varsler baseret på grundige meteorologiske data. At ignorere dem udsætter dig og andre for fare.",
          },
          {
            id: "d",
            text: "Go to the basement to protect your belongings from flooding",
            textDa: "Gå ned i kælderen for at beskytte dine ejendele mod oversvømmelse",
            correct: false,
            explanation:
              "Basements are the first areas to flood and are extremely dangerous during heavy rain — risk of electrocution from submerged outlets and rapid water rise. Stay on upper floors.",
            explanationDa:
              "Kældre er de første områder der oversvømmes og er ekstremt farlige under kraftig regn — risiko for elektrisk stød fra vanddækkede stikkontakter og hurtig vandstigning. Bliv på øverste etager.",
          },
        ],
        points: 10,
        difficulty: "easy",
        hint: "Think about the S!RENEN protocol: go inside, close up, seek information.",
        hintDa: "Tænk på S!RENEN-protokollen: gå indenfor, luk til, søg information.",
      },
    },

    // ── Step 5: Scenario — street flooding ───────────────────
    {
      id: "floods-scenario-street",
      stepNumber: 5,
      type: "scenario",
      content: {
        type: "scenario",
        situation: `It's a July afternoon in Copenhagen. DMI has issued a Kategori 1 (orange) warning for skybrud. Rain has been hammering for 40 minutes, and water is now 15 cm deep on your street in Vesterbro. You live in a ground-floor apartment. Your phone buzzes with a S!RENEN alert: "Heavy rainfall. Risk of flooding. Stay indoors."

You can hear water gurgling near your front door. What do you do?`,
        situationDa: `Det er en julieftermiddag i København. DMI har udsendt en Kategori 1 (orange) varsel for skybrud. Regnen har hamret ned i 40 minutter, og vandet er nu 15 cm dybt på din gade på Vesterbro. Du bor i en stuelejlighed. Din telefon brummer med en S!RENEN-besked: "Kraftig regn. Risiko for oversvømmelse. Bliv indendørs."

Du kan høre vand gurgle nær din hoveddør. Hvad gør du?`,
        urgencyLevel: "medium",
        timedSeconds: 60,
        choices: [
          {
            id: "a",
            text: "Shut off electricity at the main breaker, move valuables upstairs or onto tables, block the door with towels, and tune into DR P1 for updates",
            textDa:
              "Sluk for strømmen ved hovedafbryderen, flyt værdier op eller op på borde, bloker døren med håndklæder og stil ind på DR P1 for opdateringer",
            outcome:
              "Optimal response. Cutting power eliminates electrocution risk from rising water. Moving valuables protects what matters. Blocking entry points slows water ingress. DR gives you official real-time updates. This follows DEMA protocol exactly.",
            outcomeDa:
              "Optimal reaktion. At slukke strømmen eliminerer risikoen for elektrisk stød fra stigende vand. At flytte værdier beskytter det vigtige. At blokere indgangspunkter bremser vandindtrængning. DR giver dig officielle realtidsopdateringer. Dette følger Beredskabsstyrelsens protokol præcist.",
            score: 100,
            consequence: "optimal",
          },
          {
            id: "b",
            text: "Grab your essentials (phone, wallet, medicines) and go upstairs to a neighbour on a higher floor",
            textDa:
              "Tag det vigtigste (telefon, pung, medicin) og gå op til en nabo på en højere etage",
            outcome:
              "Acceptable choice — getting to higher ground is smart. But you missed shutting off electricity first, which is critical when water enters a home. If water reaches outlets while power is on, anyone in the apartment faces electrocution risk.",
            outcomeDa:
              "Acceptabel handling — at komme op på højere grund er klogt. Men du glemte at slukke strømmen først, hvilket er kritisk når vand trænger ind. Hvis vandet når stikkontakter mens strømmen er tændt, risikerer alle i lejligheden elektrisk stød.",
            score: 60,
            consequence: "acceptable",
          },
          {
            id: "c",
            text: "Open the front door to see how bad it is and try to sweep water away from the entrance",
            textDa:
              "Åbn hoveddøren for at se hvor slemt det er og prøv at feje vand væk fra indgangen",
            outcome:
              "Dangerous. Opening the door removes your last barrier against the flood. At 15 cm and rising, water will rush in faster than you can sweep it. You'd be standing in electrified floodwater if any outlets are submerged. S!RENEN said stay inside for a reason.",
            outcomeDa:
              "Farligt. At åbne døren fjerner din sidste barriere mod oversvømmelsen. Ved 15 cm og stigende vil vandet strømme ind hurtigere end du kan feje det. Du ville stå i elektrisk ladet oversvømmelsesvand hvis stikkontakter er dækket. S!RENEN sagde bliv indendørs af en grund.",
            score: 10,
            consequence: "dangerous",
          },
        ],
      },
    },

    // ── Step 6: Protecting your home ─────────────────────────
    {
      id: "floods-info-protect",
      stepNumber: 6,
      type: "info",
      content: {
        type: "info",
        title: "How to Protect Your Home From Flooding",
        titleDa: "Sådan beskytter du dit hjem mod oversvømmelse",
        body: `### Before a Flood (Forebyggelse)
- **Know your risk**: Check your municipality's flood maps at klimatilpasning.dk
- **Install a kontraventil (backflow valve)** to prevent sewage backing up through drains
- **Seal basement walls** with waterproof coating
- **Keep sandbags (sandsække) ready** if you're in a known risk area — contact your kommune
- **Document possessions**: Photos and receipts for insurance claims

### When Water Is Rising
1. **Shut off electricity** at the main breaker (eltavle) — water + electricity = lethal
2. **Move valuables upstairs**: documents, electronics, medicines
3. **Block entry points**: sandbags at doors, towels at gaps
4. **Never enter a flooded basement** — electrocution risk from submerged sockets
5. **Open basement windows** if water is rising to equalise pressure and prevent structural damage

### Critical Don'ts
- Don't walk or drive through floodwater — hidden manholes, debris, sewage
- Don't use electrical appliances in or near flooded areas
- Don't pump out your basement too quickly — sudden pressure change can crack walls
- Don't drink tap water unless authorities confirm it's safe`,
        bodyDa: `### Før en oversvømmelse (Forebyggelse)
- **Kend din risiko**: Tjek din kommunes oversvømmelseskort på klimatilpasning.dk
- **Installer en kontraventil** for at forhindre kloak i at løbe baglæns op gennem afløb
- **Forsegl kældervægge** med vandtæt belægning
- **Hav sandsække klar** hvis du bor i et kendt risikoområde — kontakt din kommune
- **Dokumenter ejendele**: Fotos og kvitteringer til forsikringskrav

### Når vandet stiger
1. **Sluk strømmen** ved eltavlen — vand + elektricitet = livsfarligt
2. **Flyt værdier op**: dokumenter, elektronik, medicin
3. **Bloker indgangspunkter**: sandsække ved døre, håndklæder ved sprækker
4. **Gå aldrig ned i en oversvømmet kælder** — risiko for elektrisk stød
5. **Åbn kældervinduer** hvis vandet stiger for at udligne trykket og forhindre strukturelle skader

### Kritiske don'ts
- Gå eller kør ikke igennem oversvømmelsesvand — skjulte brønddæksler, affald, kloak
- Brug ikke elektriske apparater i eller nær oversvømmede områder
- Pump ikke din kælder for hurtigt — pludselig trykændring kan revne vægge
- Drik ikke vand fra hanen medmindre myndighederne bekræfter det er sikkert`,
        sourceUrl: "https://www.brs.dk/en/prepared",
        keyTakeaway:
          "Cut power first, move up, block water entry, and never enter a flooded basement.",
        keyTakeawayDa:
          "Sluk strømmen først, flyt op, bloker vandindtrængning og gå aldrig ned i en oversvømmet kælder.",
        funFact:
          "During the 2011 cloudburst, Rigshospitalet's trauma centre had to relocate to Herlev Hospital after floodwater destroyed equipment. Even critical infrastructure isn't immune.",
        funFactDa:
          "Under skybruddet i 2011 måtte Rigshospitalets traumecenter flytte til Herlev Hospital efter oversvømmelsesvand ødelagde udstyr. Selv kritisk infrastruktur er ikke immun.",
      },
    },

    // ── Step 7: Interactive — priority sort ──────────────────
    {
      id: "floods-interactive-priority",
      stepNumber: 7,
      type: "interactive",
      content: {
        type: "interactive",
        interactiveType: "priority-sort",
        title: "Rank Flood Actions by Priority",
        titleDa: "Rangér oversvømmelseshandlinger efter prioritet",
        instructions:
          "Water is entering your ground-floor home. Drag these 8 actions into the correct priority order (most urgent first).",
        instructionsDa:
          "Vand trænger ind i din stueetage. Træk disse 8 handlinger i den korrekte prioriterede rækkefølge (mest presserende først).",
        config: {
          items: [
            {
              id: "power-off",
              label: "Shut off electricity at the main breaker",
              labelDa: "Sluk strømmen ved hovedafbryderen",
              correctPosition: 1,
              explanation: "Always first — electrocution is the #1 killer in floods",
              explanationDa: "Altid først — elektrisk stød er den største dræber ved oversvømmelser",
            },
            {
              id: "people-up",
              label: "Move all people and pets to upper floors",
              labelDa: "Flyt alle mennesker og kæledyr til øverste etager",
              correctPosition: 2,
              explanation: "Human and animal safety comes immediately after eliminating electrical danger",
              explanationDa: "Menneskers og dyrs sikkerhed kommer umiddelbart efter eliminering af elektrisk fare",
            },
            {
              id: "grab-meds",
              label: "Grab essential medicines",
              labelDa: "Tag vigtig medicin med",
              correctPosition: 3,
              explanation: "Medicines may be irreplaceable in the short term and inaccessible once flooded",
              explanationDa: "Medicin kan være uerstattelig på kort sigt og utilgængelig efter oversvømmelse",
            },
            {
              id: "documents",
              label: "Secure ID documents, passport, insurance papers",
              labelDa: "Sikre ID-dokumenter, pas, forsikringspapirer",
              correctPosition: 4,
              explanation: "Critical for post-flood recovery and insurance claims",
              explanationDa: "Kritisk for genopretning efter oversvømmelse og forsikringskrav",
            },
            {
              id: "block-entry",
              label: "Block doors with towels or sandbags",
              labelDa: "Bloker døre med håndklæder eller sandsække",
              correctPosition: 5,
              explanation: "Slows water entry, buying time — but only after people and essentials are safe",
              explanationDa: "Bremser vandindtrængning og køber tid — men kun efter folk og nødvendigheder er sikre",
            },
            {
              id: "tune-dr",
              label: "Turn on DR P1 radio for official updates",
              labelDa: "Tænd for DR P1 radio for officielle opdateringer",
              correctPosition: 6,
              explanation: "Stay informed about the situation's development and any evacuation orders",
              explanationDa: "Hold dig informeret om situationens udvikling og eventuelle evakueringsordrer",
            },
            {
              id: "photo-damage",
              label: "Photograph the damage for insurance",
              labelDa: "Fotografer skaderne til forsikringen",
              correctPosition: 7,
              explanation: "Important for claims but only once everyone is safe and immediate threats handled",
              explanationDa: "Vigtigt for forsikringskrav men kun når alle er i sikkerhed og umiddelbare trusler er håndteret",
            },
            {
              id: "call-neighbours",
              label: "Check on elderly or vulnerable neighbours",
              labelDa: "Tjek ældre eller sårbare naboer",
              correctPosition: 8,
              explanation: "Community care matters, but secure your own household first",
              explanationDa: "Fællesskabsomsorg er vigtigt, men sikre dit eget husstand først",
            },
          ],
        },
      },
    },

    // ── Step 8: Quiz — after the flood ───────────────────────
    {
      id: "floods-quiz-after-flood",
      stepNumber: 8,
      type: "quiz",
      content: {
        type: "quiz",
        question:
          "The floodwater has receded from your basement. What should you check FIRST before entering?",
        questionDa:
          "Oversvømmelsesvandet er trukket sig tilbage fra din kælder. Hvad bør du tjekke FØRST inden du går ned?",
        options: [
          {
            id: "a",
            text: "That the electrical system has been confirmed safe by an authorised electrician",
            textDa:
              "At det elektriske system er bekræftet sikkert af en autoriseret elektriker",
            correct: true,
            explanation:
              "Correct! Even after water recedes, residual moisture can make outlets, wiring, and appliances deadly. A qualified electrician (autoriseret elektriker) must inspect and clear the system before anyone enters.",
            explanationDa:
              "Korrekt! Selv efter vandet er trukket væk, kan restfugt gøre stikkontakter, ledninger og apparater dødelige. En autoriseret elektriker skal inspicere og godkende systemet før nogen går ind.",
          },
          {
            id: "b",
            text: "Whether the structure is still standing and walls are intact",
            textDa: "Om konstruktionen stadig står og væggene er intakte",
            correct: false,
            explanation:
              "Structural integrity matters, but the most immediate invisible danger is electrical. Water in walls and floors can conduct electricity through the building even after visible water is gone.",
            explanationDa:
              "Strukturel integritet er vigtigt, men den mest umiddelbare usynlige fare er elektrisk. Vand i vægge og gulve kan lede elektricitet gennem bygningen selv efter synligt vand er væk.",
          },
          {
            id: "c",
            text: "If the smell has cleared — sewage gases are toxic",
            textDa: "Om lugten er forsvundet — kloakgasser er giftige",
            correct: false,
            explanation:
              "Sewage contamination is a real health risk (the 2011 cloudburst caused a leptospirosis death), but electrical safety must be confirmed first. You can ventilate while staying out.",
            explanationDa:
              "Kloakforurening er en reel sundhedsrisiko (skybruddet i 2011 forårsagede et dødsfald af leptospirose), men elektrisk sikkerhed skal bekræftes først. Du kan ventilere mens du holder dig ude.",
          },
          {
            id: "d",
            text: "Whether your insurance company has approved entry",
            textDa: "Om dit forsikringsselskab har godkendt adgang",
            correct: false,
            explanation:
              "Insurance doesn't control building access. The critical first step is electrical safety — verified by an authorised electrician, not your insurance company.",
            explanationDa:
              "Forsikring kontrollerer ikke bygningsadgang. Det kritiske første skridt er elektrisk sikkerhed — verificeret af en autoriseret elektriker, ikke dit forsikringsselskab.",
          },
        ],
        points: 20,
        difficulty: "medium",
        hint: "Think about what invisible danger remains even after the water is gone.",
        hintDa: "Tænk over hvilken usynlig fare der forbliver selv efter vandet er forsvundet.",
      },
    },

    // ── Step 9: Scenario — basement flooding ─────────────────
    {
      id: "floods-scenario-basement",
      stepNumber: 9,
      type: "scenario",
      content: {
        type: "scenario",
        situation: `It's 11 PM. Heavy rain has been falling for two hours. You hear gurgling from the basement. You open the door and see 20 cm of brown water — the smell confirms it's mixed with sewage. It's rising fast.

The electrical breaker box (eltavle) is in the basement, on the wall opposite the stairs. The power is still on — you can see the basement light flickering. Your family is upstairs.

What do you do?`,
        situationDa: `Klokken er 23. Kraftig regn har faldet i to timer. Du hører en gurlende lyd fra kælderen. Du åbner døren og ser 20 cm brunt vand — lugten bekræfter at det er blandet med kloak. Det stiger hurtigt.

Eltavlen sidder i kælderen, på væggen modsat trappen. Strømmen er stadig tændt — du kan se kælderlyset flimre. Din familie er ovenpå.

Hvad gør du?`,
        urgencyLevel: "high",
        timedSeconds: 45,
        choices: [
          {
            id: "a",
            text: "Do NOT enter the basement. Close the basement door, call an electrician or 112, and move the family to the highest floor",
            textDa:
              "GÅ IKKE ned i kælderen. Luk kælderdøren, ring til en elektriker eller 112, og flyt familien til den højeste etage",
            outcome:
              "Optimal response. The breaker box is in standing sewage water with the power on — entering is potentially lethal. Closing the door contains the water. Calling 112 brings professionals with the right equipment. You've prioritised life over property.",
            outcomeDa:
              "Optimal reaktion. Eltavlen er i stående kloakvand med strømmen tændt — at gå ned er potentielt dødelig. At lukke døren indeholder vandet. At ringe 112 bringer professionelle med det rigtige udstyr. Du har prioriteret liv over ejendom.",
            score: 100,
            consequence: "optimal",
          },
          {
            id: "b",
            text: "Quickly run down to the breaker box to shut off the main power, then run back up",
            textDa:
              "Løb hurtigt ned til eltavlen for at slukke hovedstrømmen, og løb op igen",
            outcome:
              "Extremely dangerous. You'd be wading through electrified sewage water to reach a live electrical panel. The 2011 cloudburst killed a man from leptospirosis after basement sewage contact. Combined with electrocution risk, this could be fatal. Never enter a flooded space where power is live.",
            outcomeDa:
              "Ekstremt farligt. Du ville vade igennem elektrificeret kloakvand for at nå en strømførende eltavle. Skybruddet i 2011 dræbte en mand af leptospirose efter kontakt med kloakvand i kælder. Kombineret med risikoen for elektrisk stød kan dette være fatalt. Gå aldrig ind i et oversvømmet rum hvor strømmen er tændt.",
            score: 5,
            consequence: "dangerous",
          },
          {
            id: "c",
            text: "Close the basement door, move valuables from the ground floor upstairs, and wait for the water to stop rising",
            textDa:
              "Luk kælderdøren, flyt værdier fra stueetagen op og vent til vandet stopper med at stige",
            outcome:
              "Partially right — closing the door and moving upstairs is good. But 'waiting it out' without contacting emergency services is risky. If water reaches the ground floor and the power is still on from the basement feed, the entire home becomes an electrocution hazard. Call 112.",
            outcomeDa:
              "Delvist rigtigt — at lukke døren og flytte op er godt. Men at 'vente det ud' uden at kontakte beredskabet er risikabelt. Hvis vandet når stueetagen og strømmen stadig er tændt fra kælderforsyningen, bliver hele hjemmet en risiko for elektrisk stød. Ring 112.",
            score: 50,
            consequence: "risky",
          },
        ],
      },
    },

    // ── Step 10: Recovery and resources ──────────────────────
    {
      id: "floods-info-recovery",
      stepNumber: 10,
      type: "info",
      content: {
        type: "info",
        title: "Recovery After a Flood",
        titleDa: "Genopretning efter en oversvømmelse",
        body: `### Immediate Steps
1. **Do not re-enter** until an electrician confirms it's safe
2. **Document everything** — photograph all damage before cleanup
3. **Contact your forsikringsselskab (insurance company)** — report to your fire insurer
4. **For stormflod (storm surge)**: also file at [naturskaderaadet.dk](https://naturskaderaadet.dk)

### The Danish Insurance Process
- Standard insurance does **not** automatically cover flood damage
- The **Naturskaderådet** (Danish Natural Hazards Council) must officially declare a stormflod (water levels rarer than 1-in-20 years)
- All fire insurance policyholders pay **DKK 30/year** to the national storm surge pool
- A loss adjuster visits and prepares a report — you have 14 days to respond

### Health & Safety During Cleanup
- **Floodwater = contaminated** — wear gloves, boots, and a mask
- Discard any food that touched floodwater
- Watch for mould (skimmel) in the following weeks — serious health risk
- 22% of cleanup workers became ill after the 2011 Copenhagen cloudburst

### Key Contacts
| Who | Contact |
|-----|---------|
| Emergency | **112** |
| Police non-emergency | **114** |
| Medical helpline (Capital Region) | **1813** |
| Your kommune | [borger.dk](https://www.borger.dk) |
| DEMA | [brs.dk](https://www.brs.dk) |
| Storm surge claims | [naturskaderaadet.dk](https://naturskaderaadet.dk) |
| DMI warnings | [dmi.dk/varsler](https://www.dmi.dk/varsler) |

Don't drink tap water until your kommune confirms it's safe.`,
        bodyDa: `### Umiddelbare trin
1. **Gå ikke ind igen** før en elektriker bekræfter det er sikkert
2. **Dokumenter alt** — fotografer alle skader før oprydning
3. **Kontakt dit forsikringsselskab** — anmeld til din brandforsikring
4. **Ved stormflod**: anmeld også på [naturskaderaadet.dk](https://naturskaderaadet.dk)

### Den danske forsikringsproces
- Standardforsikring dækker **ikke** automatisk oversvømmelsesskader
- **Naturskaderådet** skal officielt erklære en stormflod (vandstande sjældnere end hvert 20. år)
- Alle brandforsikringstagere betaler **30 kr./år** til den nationale stormflodspulje
- En taksator besøger og udarbejder en rapport — du har 14 dage til at svare

### Sundhed & sikkerhed under oprydning
- **Oversvømmelsesvand = forurenet** — bær handsker, støvler og maske
- Kassér al mad der har været i kontakt med oversvømmelsesvand
- Hold øje med skimmel i de følgende uger — alvorlig sundhedsrisiko
- 22% af oprydningsarbejdere blev syge efter skybruddet i København i 2011

### Vigtige kontakter
| Hvem | Kontakt |
|------|---------|
| Nødsituation | **112** |
| Politi (ikke-akut) | **114** |
| Lægevagt (Hovedstaden) | **1813** |
| Din kommune | [borger.dk](https://www.borger.dk) |
| Beredskabsstyrelsen | [brs.dk](https://www.brs.dk) |
| Stormflodskrav | [naturskaderaadet.dk](https://naturskaderaadet.dk) |
| DMI-varsler | [dmi.dk/varsler](https://www.dmi.dk/varsler) |

Drik ikke vand fra hanen før din kommune bekræfter det er sikkert.`,
        sourceUrl: "https://danishnaturalhazardscouncil.dk/flood",
        keyTakeaway:
          "Document damage, contact fire insurance, file stormflod claims at naturskaderaadet.dk, and don't drink tap water until cleared.",
        keyTakeawayDa:
          "Dokumenter skader, kontakt brandforsikring, anmeld stormflodskrav på naturskaderaadet.dk, og drik ikke vand fra hanen før det er godkendt.",
        funFact:
          "The 2011 cloudburst generated 90,644 insurance claims totalling DKK 4.88 billion — and led to Copenhagen's DKK 11 billion 'Sponge City' plan with 300 flood-mitigation projects.",
        funFactDa:
          "Skybruddet i 2011 genererede 90.644 forsikringskrav for i alt 4,88 milliarder kroner — og førte til Københavns 11 milliarder kroner 'Svampeby'-plan med 300 oversvømmelsesprojekter.",
      },
    },
  ],
  sources: [
    {
      title: "Copenhagen Climate Adaptation Plan",
      url: "https://en.klimatilpasning.dk/media/568851/copenhagen_adaption_plan.pdf",
    },
    {
      title: "DEMA — Prepared for Crises",
      url: "https://www.brs.dk/en/prepared",
    },
    {
      title: "DMI Weather Warnings",
      url: "https://www.dmi.dk/varsler/warnings",
    },
    {
      title: "S!RENEN — Public Warning System",
      url: "https://www.brs.dk/en/sirenen/",
    },
    {
      title: "Danish Natural Hazards Council — Flood",
      url: "https://danishnaturalhazardscouncil.dk/flood",
    },
    {
      title: "2011 Copenhagen Cloudburst — Wikipedia",
      url: "https://en.wikipedia.org/wiki/2011_cloudburst_in_Denmark",
    },
  ],
};
