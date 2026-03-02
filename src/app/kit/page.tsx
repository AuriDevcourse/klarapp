"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Flashlight,
  Radio,
  Heart,
  Users,
  PawPrint,
  Check,
  Baby,
  PersonStanding,
  Minus,
  Plus,
  Pencil,
  X,
  Info,
  ChevronDown,
} from "lucide-react";
import { BottomNav } from "@/components/klar/bottom-nav";
import { ProgressRing } from "@/components/klar/progress-ring";

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Flashlight,
  Radio,
  Heart,
  PawPrint,
};

interface Household {
  adults: number;
  children: number;
  elderly: number;
  pets: number;
}

interface KitItem {
  id: string;
  label: string;
  description: string;
  baseQuantity: number;
  unit: string;
  perPerson?: boolean;
  perPet?: boolean;
  essential: boolean;
  category: string;
  showWhen?: (h: Household) => boolean;
  note?: (h: Household) => string | null;
}

const kitItems: KitItem[] = [
  // Water & Food
  { id: "water", label: "Drinking water", description: "DEMA says 3L per person per day. Water treatment plants run on electricity, so when power goes out, taps can run dry in 12 to 24 hours.", baseQuantity: 9, unit: "L", perPerson: true, essential: true, category: "Water & Food" },
  { id: "canned", label: "Canned food", description: "Pick stuff your household actually likes. Beans, tuna, soup, fruit. No fridge or cooking needed. Eat it before it expires and replace it.", baseQuantity: 6, unit: "cans", perPerson: true, essential: true, category: "Water & Food" },
  { id: "can-opener", label: "Manual can opener", description: "Your electric one won't work in a blackout. Without this, all those cans are just paperweights.", baseQuantity: 1, unit: "pc", essential: true, category: "Water & Food" },
  { id: "snacks", label: "Energy bars & dried fruit", description: "Easy calories, long shelf life, zero prep. Great for keeping your energy up between proper meals.", baseQuantity: 3, unit: "pcs", perPerson: true, essential: false, category: "Water & Food" },
  { id: "baby-food", label: "Baby food / formula", description: "Ready-to-feed bottles are best since you might not have clean water for mixing. Grab some sterile bottles too.", baseQuantity: 3, unit: "days", essential: true, category: "Water & Food", showWhen: (h) => h.children > 0, note: (h) => h.children > 1 ? `For ${h.children} children, double up on supplies` : null },
  { id: "child-snacks", label: "Snacks kids will eat", description: "Crackers, fruit pouches, cereal bars. Familiar food helps keep kids calm. Avoid anything that needs refrigeration.", baseQuantity: 6, unit: "pcs", essential: false, category: "Water & Food", showWhen: (h) => h.children > 0 },
  { id: "elderly-soft-food", label: "Easy to eat food", description: "Soups, porridge packets, soft canned fruit. Easier to chew and digest for elderly members. Also good if someone feels unwell.", baseQuantity: 4, unit: "cans", essential: true, category: "Water & Food", showWhen: (h) => h.elderly > 0 },
  // Light & Power
  { id: "flashlight", label: "Flashlight + spare batteries", description: "LED ones last way longer. Store the spare batteries separately so they don't corrode.", baseQuantity: 1, unit: "pc", essential: true, category: "Light & Power" },
  { id: "candles", label: "Candles + matches/lighter", description: "Backup light that doesn't need batteries. Put them on plates, keep them away from curtains, and don't leave them alone.", baseQuantity: 10, unit: "candles", essential: true, category: "Light & Power", note: (h) => h.children > 0 ? "Keep flames out of children's reach" : null },
  { id: "powerbank", label: "Power bank (10,000+ mAh)", description: "Keep it charged to about 80%. That's good for 2 to 3 full phone charges. Top it up every few months so it doesn't lose capacity.", baseQuantity: 1, unit: "pc", essential: true, category: "Light & Power" },
  { id: "hearing-aid-batteries", label: "Hearing aid batteries", description: "These tiny batteries run out fast and you can't just buy them anywhere. Keep a full spare set in a dry place with your kit.", baseQuantity: 1, unit: "set", essential: true, category: "Light & Power", showWhen: (h) => h.elderly > 0 },
  // Info & Communication
  { id: "radio", label: "Battery / wind-up FM radio", description: "This is your lifeline when power, internet, and mobile all go down at once. Tune to DR P1 at 90.8 MHz for official updates.", baseQuantity: 1, unit: "pc", essential: true, category: "Info & Communication" },
  { id: "cash", label: "Cash in small bills + coins", description: "Card machines and MobilePay need power to work. During the 2025 blackout across Spain and Portugal, only people with cash could buy anything.", baseQuantity: 1000, unit: "DKK", essential: true, category: "Info & Communication" },
  { id: "contacts", label: "Emergency contacts on paper", description: "If your phone dies, all your contacts go with it. Write down family, neighbours, your doctor, plus 112, 114, 1813 and your kommune.", baseQuantity: 1, unit: "list", essential: true, category: "Info & Communication" },
  { id: "documents", label: "ID & insurance copies", description: "Copies of your passport, insurance, and any prescriptions. You'll really need these for recovery and insurance claims afterwards.", baseQuantity: 1, unit: "set", essential: true, category: "Info & Communication" },
  { id: "child-id", label: "Children's ID and medical info", description: "Photo, full name, any allergies, blood type, doctor's number. If you get separated, this helps anyone who finds them.", baseQuantity: 1, unit: "per child", essential: true, category: "Info & Communication", showWhen: (h) => h.children > 0 },
  { id: "elderly-medical-card", label: "Medical summary card", description: "List of diagnoses, medications, dosages, allergies, and doctor's contact. First responders need this if the person can't explain it themselves.", baseQuantity: 1, unit: "per person", essential: true, category: "Info & Communication", showWhen: (h) => h.elderly > 0 },
  // Health & Safety
  { id: "first-aid", label: "First aid kit", description: "Bandages, disinfectant, gauze, pain relievers, tweezers. Check the expiry dates every six months or so.", baseQuantity: 1, unit: "pc", essential: true, category: "Health & Safety" },
  { id: "medicines", label: "Prescription medicines", description: "Always keep at least a 3-day buffer of any daily meds. Pharmacies might be closed or impossible to get to.", baseQuantity: 3, unit: "days supply", essential: true, category: "Health & Safety", note: (h) => h.elderly > 0 ? `Extra important when you have ${h.elderly} elderly member${h.elderly !== 1 ? "s" : ""} who may depend on daily medication` : null },
  { id: "blankets", label: "Warm blankets or sleeping bags", description: "It gets cold fast without heating. Several thin layers work better than one thick one.", baseQuantity: 1, unit: "per person", perPerson: true, essential: true, category: "Health & Safety", note: (h) => h.elderly > 0 ? "Elderly people lose body heat faster, so add an extra blanket per person over 65" : null },
  { id: "hygiene", label: "Hygiene supplies", description: "Hand sanitiser, wet wipes, toilet paper, bin bags. You might not have running water for flushing or washing.", baseQuantity: 1, unit: "bag", essential: false, category: "Health & Safety" },
  { id: "child-meds", label: "Children's medicine", description: "Paracetamol (age-appropriate), any allergy meds, thermometer. Kids get sick at the worst times and you want to be ready.", baseQuantity: 1, unit: "set", essential: true, category: "Health & Safety", showWhen: (h) => h.children > 0 },
  { id: "nappies", label: "Nappies and wipes", description: "If you have toddlers or babies, you'll go through these fast. Pack at least 3 days worth and don't forget nappy bags.", baseQuantity: 3, unit: "days", essential: true, category: "Health & Safety", showWhen: (h) => h.children > 0 },
  { id: "comfort-items", label: "Comfort items for kids", description: "A favourite toy, a book, colouring stuff. Emergencies are scary for kids and familiar things help a lot.", baseQuantity: 1, unit: "bag", essential: false, category: "Health & Safety", showWhen: (h) => h.children > 0 },
  { id: "mobility-aids", label: "Mobility aid spares", description: "Spare walking stick tip, wheelchair battery, or anything your elderly member relies on daily. If it breaks in a crisis, there's no quick replacement.", baseQuantity: 1, unit: "set", essential: true, category: "Health & Safety", showWhen: (h) => h.elderly > 0 },
  { id: "extra-warm-layers", label: "Extra warm layers for elderly", description: "Thermal underwear, thick socks, a hat. Older bodies lose heat much quicker and hypothermia can set in surprisingly fast indoors.", baseQuantity: 1, unit: "set per person", essential: true, category: "Health & Safety", showWhen: (h) => h.elderly > 0 },
  // Pets
  { id: "pet-food", label: "Pet food", description: "Keep their regular food with your kit. Stressed animals often refuse new food, so stick with what they're used to.", baseQuantity: 1, unit: "kg", perPet: true, essential: true, category: "Pets", showWhen: (h) => h.pets > 0 },
  { id: "pet-water", label: "Extra water for pets", description: "About 1 to 2L per day for dogs, 0.3L for cats. This is on top of your household water, not instead of.", baseQuantity: 4, unit: "L", perPet: true, essential: true, category: "Pets", showWhen: (h) => h.pets > 0 },
  { id: "pet-meds", label: "Pet medication", description: "If your pet takes daily medication, keep a 3-day buffer just like you would for a person. Vets might not be open.", baseQuantity: 3, unit: "days", essential: false, category: "Pets", showWhen: (h) => h.pets > 0 },
  { id: "pet-carrier", label: "Pet carrier or leash", description: "If you need to evacuate, you'll need to move your animals safely. A carrier for small pets, a sturdy leash for dogs.", baseQuantity: 1, unit: "per pet", perPet: true, essential: true, category: "Pets", showWhen: (h) => h.pets > 0 },
  { id: "pet-comfort", label: "Familiar blanket or toy", description: "Animals get stressed in emergencies too. Something that smells like home can help keep them calmer.", baseQuantity: 1, unit: "pc", essential: false, category: "Pets", showWhen: (h) => h.pets > 0 },
];

const categoryIcons: Record<string, string> = {
  "Water & Food": "Droplets",
  "Light & Power": "Flashlight",
  "Info & Communication": "Radio",
  "Health & Safety": "Heart",
  Pets: "PawPrint",
};

const categoryDescriptions: Record<string, string> = {
  "Water & Food": "Water comes first. You need 3L per person per day, so that's 9L each for 72 hours. Go for food that doesn't need a fridge or cooking.",
  "Light & Power": "When the grid goes down you need your own light and power. A good flashlight, some candles, and a charged power bank go a long way.",
  "Info & Communication": "Information can save your life in a crisis. FM radio still works when everything else is down. And cash still works when cards don't.",
  "Health & Safety": "Medical needs don't stop for emergencies. Make sure you have first aid, any prescription meds, and enough warmth for everyone.",
  Pets: "Your pets count on you. Make sure their food, water, and any meds are part of your kit.",
};

function getQuantity(item: KitItem, household: Household): string {
  const totalPeople = household.adults + household.children + household.elderly;
  if (item.perPerson && totalPeople > 0) {
    const qty = item.baseQuantity * totalPeople;
    return `${qty} ${item.unit}`;
  }
  if (item.perPet && household.pets > 0) {
    const qty = item.baseQuantity * household.pets;
    return `${qty} ${item.unit}`;
  }
  if (item.unit === "DKK") {
    return `${item.baseQuantity.toLocaleString()} ${item.unit}`;
  }
  return `${item.baseQuantity} ${item.unit}`;
}

function getVisibleItems(household: Household): KitItem[] {
  return kitItems.filter((item) => {
    if (item.showWhen) return item.showWhen(household);
    return true;
  });
}

function getReadinessLabel(pct: number): { text: string; color: string } {
  if (pct === 0) return { text: "Not started", color: "text-muted-foreground" };
  if (pct < 30) return { text: "Just getting started", color: "text-klar-danger" };
  if (pct < 60) return { text: "Making progress", color: "text-klar-warning" };
  if (pct < 90) return { text: "Almost ready", color: "text-klar-primary" };
  if (pct < 100) return { text: "Nearly there!", color: "text-klar-success" };
  return { text: "Fully prepared", color: "text-klar-success" };
}

function Stepper({
  value,
  onChange,
  min = 0,
  max = 10,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground disabled:opacity-30 active:scale-95 transition-transform"
      >
        <Minus size={14} />
      </button>
      <span className="text-sm font-semibold text-foreground w-5 text-center">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-7 h-7 rounded-lg bg-klar-primary/10 flex items-center justify-center text-klar-primary disabled:opacity-30 active:scale-95 transition-transform"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function KitPage() {
  const [household, setHousehold] = useState<Household>({
    adults: 2,
    children: 0,
    elderly: 0,
    pets: 0,
  });
  const [showConfig, setShowConfig] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(["Water & Food"]));

  const toggleCat = (cat: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const visibleItems = getVisibleItems(household);
  const essentialItems = visibleItems.filter((i) => i.essential);
  const checkedEssential = essentialItems.filter((i) =>
    checkedItems.has(i.id)
  ).length;
  const readiness =
    essentialItems.length > 0
      ? Math.round((checkedEssential / essentialItems.length) * 100)
      : 0;

  const totalPeople = household.adults + household.children + household.elderly;
  const readinessLabel = getReadinessLabel(readiness);

  const toggle = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = [...new Set(visibleItems.map((i) => i.category))];

  const summaryParts: string[] = [];
  if (household.adults > 0)
    summaryParts.push(
      `${household.adults} adult${household.adults !== 1 ? "s" : ""}`
    );
  if (household.children > 0)
    summaryParts.push(
      `${household.children} child${household.children !== 1 ? "ren" : ""}`
    );
  if (household.elderly > 0)
    summaryParts.push(`${household.elderly} elderly`);
  if (household.pets > 0)
    summaryParts.push(
      `${household.pets} pet${household.pets !== 1 ? "s" : ""}`
    );

  const householdRows: {
    label: string;
    icon: React.ElementType;
    key: keyof Household;
  }[] = [
    { label: "Adults", icon: Users, key: "adults" },
    { label: "Children", icon: Baby, key: "children" },
    { label: "Elderly (65+)", icon: PersonStanding, key: "elderly" },
    { label: "Pets", icon: PawPrint, key: "pets" },
  ];

  return (
    <div className="min-h-dvh bg-transparent pb-24">
      {/* Header */}
      <header className="px-5 pt-14 pb-2">
        <h1 className="text-xl font-bold text-foreground mb-4">
          My Emergency Kit
        </h1>

        {/* Readiness + household card */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-5">
            {/* Ring — percentage only */}
            <ProgressRing
              percentage={Math.min(readiness, 100)}
              size={90}
              strokeWidth={7}
            />
            <div className="flex-1 min-w-0">
              {/* Readiness label outside the ring */}
              <p className={`text-sm font-semibold ${readinessLabel.color}`}>
                {readinessLabel.text}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {checkedEssential} of {essentialItems.length} essential items
              </p>

              {/* Household summary */}
              <div className="flex items-center gap-1.5 mt-2">
                <Users size={12} className="text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground truncate">
                  {summaryParts.join(", ") || "No household set"}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <button
              type="button"
              onClick={() => setShowConfig((v) => !v)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                showConfig
                  ? "bg-muted text-muted-foreground"
                  : "bg-klar-primary/10 text-klar-primary"
              }`}
            >
              {showConfig ? (
                <>
                  <X size={12} />
                  Close
                </>
              ) : (
                <>
                  <Pencil size={12} />
                  Edit
                </>
              )}
            </button>
          </div>

          {/* Expandable household configurator */}
          <AnimatePresence>
            {showConfig && (
              <motion.div
                className="mt-4 pt-4 border-t border-border/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs text-muted-foreground mb-3">
                  Set your household size and kit quantities update automatically
                </p>
                <div className="flex flex-col gap-3">
                  {householdRows.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <row.icon
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span className="text-sm text-foreground">
                          {row.label}
                        </span>
                      </div>
                      <Stepper
                        value={household[row.key]}
                        onChange={(v) =>
                          setHousehold((prev) => ({ ...prev, [row.key]: v }))
                        }
                      />
                    </div>
                  ))}
                </div>
                {totalPeople > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-1.5">
                    <Info size={12} className="text-klar-primary shrink-0" />
                    <p className="text-[11px] text-klar-primary">
                      {totalPeople} people = {totalPeople * 9}L water needed for
                      72 hours
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Kit categories — list format with descriptions */}
      <section className="px-5 mt-5">
        <div className="flex flex-col gap-5">
          {categories.map((cat) => {
            const catItems = visibleItems.filter((i) => i.category === cat);
            const iconName = categoryIcons[cat] ?? "Droplets";
            const Icon = iconMap[iconName] ?? Droplets;
            const catDesc = categoryDescriptions[cat];
            const catChecked = catItems.filter((i) =>
              checkedItems.has(i.id)
            ).length;
            const isExpanded = expandedCats.has(cat);

            return (
              <motion.div
                key={cat}
                className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Category header (always visible, tap to expand) */}
                <button
                  type="button"
                  onClick={() => toggleCat(cat)}
                  className="w-full px-4 py-4 flex items-center gap-3 active:bg-muted/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-klar-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-klar-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-sm text-foreground">
                      {cat}
                    </h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0 mr-1">
                    {catChecked}/{catItems.length}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {/* Category description */}
                      {catDesc && (
                        <div className="px-4 pb-3">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {catDesc}
                          </p>
                        </div>
                      )}

                      {/* Items list */}
                      <div className="border-t border-border/30">
                        {catItems.map((item, idx) => {
                          const isChecked = checkedItems.has(item.id);
                          const qty = getQuantity(item, household);
                          const note = item.note ? item.note(household) : null;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggle(item.id)}
                              className={`w-full text-left px-4 py-3 flex gap-3 items-start transition-colors active:bg-muted/50 ${
                                idx < catItems.length - 1
                                  ? "border-b border-border/20"
                                  : ""
                              } ${isChecked ? "bg-klar-success/[0.03]" : ""}`}
                            >
                              {/* Checkbox */}
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                  isChecked
                                    ? "bg-klar-success border-klar-success"
                                    : "border-border"
                                }`}
                              >
                                {isChecked && (
                                  <Check size={12} className="text-white" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={`text-sm font-medium ${
                                      isChecked
                                        ? "text-klar-success line-through decoration-klar-success/30"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {item.label}
                                  </p>
                                  {item.essential && !isChecked && (
                                    <span className="text-[9px] font-bold text-klar-danger uppercase bg-klar-danger/10 px-1.5 py-0.5 rounded">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                                  {item.description}
                                </p>
                                {note && (
                                  <p className="text-[11px] text-klar-primary mt-0.5 font-medium">
                                    {note}
                                  </p>
                                )}
                              </div>

                              {/* Quantity badge */}
                              <span
                                className={`text-[11px] font-semibold shrink-0 mt-0.5 px-2 py-0.5 rounded-md ${
                                  isChecked
                                    ? "bg-klar-success/10 text-klar-success"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {qty}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
