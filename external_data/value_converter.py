import json

STATS_TYPE_ORDER = [
    "HEALTH",
    "STAMINA",
    "TORPIDITY",
    "OXYGEN",
    "FOOD",
    "",
    "",
    "WEIGHT",
    "MELEE_DMG",
    "MOVEMENT_SPEED",
    "",
    "CRAFTING_SKILL"
]
STATS_VALUE_ORDER = ["B", "Iw", "Id", "Ta", "Tm"]

IMPORTED_DINOS = ["Achatina", "Allosaurus", "Anglerfish", "Ankylosaurus", "Araneo", "Archaeopteryx", "Argentavis", "Arthropluera", "Astrocetus", "Baryonyx", "Basilisk", "Basilosaurus", "Beelzebufo", "Blood Crystal Wyvern", "Bloodstalker", "Brontosaurus", "Bulbdog", "Carbonemys", "Carnotaurus", "Castoroides", "Chalicotherium", "Compy", "Daeodon", "Deinonychus", "Desert Titan", "Dilophosaur", "Dimetrodon", "Dimorphodon", "Diplocaulus", "Diplodocus", "Dire Bear", "Direwolf", "Dodo", "Doedicurus", "Dung Beetle", "Dunkleosteus", "Electrophorus", "Ember Crystal Wyvern", "Equus", "Featherlight", "Fire Wyvern", "Forest Titan", "Forest Wyvern", "Gacha", "Gallimimus", "Gasbags", "Giant Queen Bee", "Giganotosaurus", "Gigantopithecus", "Glowtail", "Griffin", "Hesperornis", "Hyaenodon", "Ice Titan", "Ice Wyvern", "Ichthyornis", "Ichthyosaurus", "Iguanodon", "Jerboa", "Kairuku", "Kaprosuchus", "Karkinos", "Kentrosaurus", "Lightning Wyvern", "Liopleurodon", "Lymantria", "Lystrosaurus", "Magmasaur", "Mammoth", "Managarmr", "Manta", "Mantis", "Megachelon", "Megalania", "Megaloceros", "Megalodon", "Megalosaurus", "Megatherium", "Mesopithecus", "Microraptor", "Morellatops", "Mosasaurus", "Moschops", "Onyc", "Otter", "Oviraptor", "Ovis", "Pachy", "Pachyrhinosaurus", "Paraceratherium", "Parasaur", "Pegomastax", "Pelagornis", "Phiomia", "Phoenix", "Plesiosaur", "Poison Wyvern", "Procoptodon", "Pteranodon", "Pulmonoscorpius", "Purlovia", "Quetzal", "Raptor", "Ravager", "Reaper King", "Rex", "Rock Drake", "Rock Elemental", "Roll Rat", "Sabertooth", "Sarco", "Shinehorn", "Snow Owl", "Spino", "Stegosaurus", "Tapejara", "Terror Bird", "Therizinosaur", "Thorny Dragon", "Thylacoleo", "Titanoboa", "Titanosaur", "Triceratops", "Troodon", "Tropeognathus", "Tropical Crystal Wyvern", "Tusoteuthis", "Unicorn", "Velonasaur", "Vulture", "Woolly Rhino", "Yutyrannus"]

dinos = {}

with open("values.json") as imported_values:
    data = json.load(imported_values)

    for dino in data['species']:
        name = dino["name"]
        if name not in IMPORTED_DINOS:
            continue
        if "variants" in dino:
            if name in dinos:
                continue
        raw_stats = dino["fullStatsRaw"]

        dino_stats = {}
        for type_id, type_key in enumerate(STATS_TYPE_ORDER):
            if raw_stats[type_id]:
                values = {}
                for value_id, value_key in enumerate(STATS_VALUE_ORDER):
                    values[value_key] = raw_stats[type_id][value_id]
                dino_stats[type_key] = values
        dino_stats["TBHM"] = dino["TamedBaseHealthMultiplier"]
        dino_stats["useOxygen"] = not dino["doesNotUseOxygen"]

        dinos[name] = dino_stats

with open("dino_stats.json", 'w') as dino_file:
    json.dump(dinos, dino_file, indent=4, sort_keys=True)

for d in IMPORTED_DINOS:
    if d not in dinos:
        print("NOT IMPORTED:", d)
