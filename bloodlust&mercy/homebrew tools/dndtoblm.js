
const damageTypeIds = [
    'damageType1',
    'damageType2',
    'damageType3',
    'damageType4',
    'damageType5'
];

const flipSwitchIds = [
    'flipSwitch1',
    'flipSwitch2', 
    'flipSwitch3',
    'flipSwitch4',
    'flipSwitch5'
];

const damageIds = [
    'damage1',
    'damage2',
    'damage3',
    'damage4',
    'damage5'
];

const damageTypeMapping = {
    false: {
        "none": "none",
        "bludgeoning": "impact",
        "piercing": "pierce", 
        "slashing": "cleave",
        "acid": "acid",
        "cold": "heat",
        "fire": "heat",
        "lightning": "spin",
        "poison": "reactive",
        "thunder": "explosion",
        "necrotic": "reactive",
        "radiant": "radiation",
        "force": "impact",
        "psychic": "radiation"
    },
    true: {
        "none": "none",
        "bludgeoning": "smash",
        "piercing": "kinetic",
        "slashing": "tensile", 
        "acid": "alkali",
        "cold": "spin",
        "fire": "radiation",
        "lightning": "reactive",
        "poison": "radiation",
        "thunder": "implosion",
        "necrotic": "spin",
        "radiant": "spin",
        "force": "smash",
        "psychic": "reactive"
    }
};




const basedamge =[
    'base damage1',
    'base damage2',
    'base damage3',
    'base damage4',
    'base damage5'
]

const dieaveragemap = {
    "d2": 1.5,
    "d4": 2.5,
    "d6": 3.5,
    "d8": 4.5,
    "d10": 5.5,
    "d12": 6.5,
    "d20": 10.5,
    "d100": 50.5
};

// Define damage type multipliers
const damageMultipliers = {
    'impact': 2,
    'pierce': 1.5,
    'cleave': 1.5,
    'acid': 1.5,
    'heat': 2,
    'spin': 1.5,
    'reactive': 1.5,
    'explosion': 2,
    'radiation': 2,
    'smash': 3,
    'kinetic': 2,
    'tensile': 2,
    'alkali': 2,
    'implosion': 3,
    'none': 0
};

function handleClick() {
    damageTypeIds.forEach((damageTypeId, index) => {
        const select = document.getElementById(damageTypeId);
        const checkbox = document.getElementById(flipSwitchIds[index]);
        const statValue = document.getElementById(damageIds[index]);

        // Check if all elements exist
        if (!select || !checkbox || !statValue) {
            console.log(`Missing elements for damage type: ${damageTypeId}`);
            return;
        }

        const selectedDamage = select.value;
        const isChecked = checkbox.checked;
        
        statValue.textContent = damageTypeMapping[isChecked][selectedDamage];
    });

    // Process dice values and calculate damage
    const damageDie = [
        'baseDamage1',
        'baseDamage2',
        'baseDamage3',
        'baseDamage4',
        'baseDamage5'
    ];

    damageDie.forEach((damagedie, index) => {
        const diceInput = document.getElementById(damagedie);
        const damageTypeSpan = document.getElementById(damageIds[index]);
        const baseDamageSpan = document.getElementById(basedamge[index]);

        if (!diceInput || !damageTypeSpan || !baseDamageSpan) return;

        const diceNotation = diceInput.value;
        let totalValue = 0;

        if (diceNotation) {
            const diceMatch = diceNotation.match(/(\d*)[dD](\d+)/);
            if (diceMatch) {
                const numDice = diceMatch[1] ? parseInt(diceMatch[1]) : 1;
                const diceFaces = parseInt(diceMatch[2]);
                totalValue = Math.floor((numDice * diceFaces) / 2);
            }
        }

        const damageType = damageTypeSpan.textContent;
        const multiplier = damageMultipliers[damageType] || 1;
        const finalDamage = Math.floor(totalValue * multiplier);

        baseDamageSpan.textContent = finalDamage;
    });

    const weaponSelect = document.getElementById('type');
    const weaponTypeSpan = document.getElementById('weaponType');
    const propertiesSpan = document.getElementById('properties');
    
    const weaponClasses = {
        'farmer': ['scythe', 'sickle', 'hoe'],
        'miner': ['pickaxe', 'shovel', 'drill'],
        'lumberjack': ['tomahawk', 'chainsaw', 'axe'],
        'lich': ['skull', 'dirk', 'wand'],
        'clerk': ['cane', 'magic_circle', 'flail'],
        'druid': ['fan', 'spear', 'staff'],
        'knight': ['pole_arm', 'short_sword', 'mace'],
        'paladin': ['hammer', 'great_sword', 'shield'],
        'rogue': ['dagger', 'lock_pick', 'throwing_knives'],
        'ranger': ['bow', 'crossbow', 'sniper'],
        'assassin': ['whip', 'dart_rope', 'razor_floss'],
        'hunter': ['knife', 'trap', 'pitch_fork'],
        'spy': ['butterfly_knife', 'umbrella', 'pistol'],
        'soldier': ['rpg', 'shot_gun', 'rifle'],
        'gunner': ['flame_thrower', 'gatling_gun', 'smg'],
        'alchemist': ['bomb', 'potion', 'orb'],
        'mech': ['side_arms_gun', 'side_arms_melee', 'side_arms_extend'],
        'brawler': ['brass_knuckles', 'gauntlets', 'claws'],
        'blood_weaver': ['blood_scythe', 'blood_bath', 'blood_gun'],
        'time_weaver': ['pocket_watch', 'revolver', 'long_sword'],
        'life_weaver': ['summon', 'living_weapon', 'spores'],
        'mechanic': ['wrench', 'turret', 'torch'],
        'mathematician': ['ruler', 'protractor', 'tome'],
        'doctor': ['drugs', 'scalpel', 'saw'],
        'jester': ['lance', 'conceal_melee_weapon', 'conceal_ranged_weapon'],
        'artist': ['paint_brush', 'pencil', 'chisel'],
        'bard': ['string_instruments', 'wind_instruments', 'precaution'],
        'tanker': ['barret', 'tank', 'explosive_hammer'],
        'aviator': ['jet', 'hover_craft', 'drone'],
        'sailor': ['boat', 'cannon', 'rail_gun'],
        'fisherman': ['net', 'fishing_pole', 'harpoon'],
        'sound_weaver': ['radio', 'speaker', 'sonic_ray'],
        'ancient_glitched': ['glitch_string', 'glitch_blade', 'glitch_fire_arm'],
        'swordsman': ['guardian_blade', 'heaven_breaker', 'dual_blade'],
        'mechanic_death': ['gear_whip', 'sanding_belt', 'ray_gun'],
        'warlock': ['magic_bubbles', 'arcane_ark', 'null_shots'],
        'arsenal': ['bayonet', 'cthulhu_pistol', 'volley_guns'],
        'dancer': ['ribbon', 'tracer_dot', 'quarter_staff'],
        'star_chaser': ['fluid_gun', 'energy_chaser', 'particle_blaster'],
        'collector': ['refining_arm', 'scooper', 'buzz_saw'],
        'bone_weaver': ['bone_blade', 'bone_gun', 'bone_whip'],
        'club_man': ['club', 'bat', 'waddy'],
        'bouncer': ['meteor_hammers', 'boomerang', 'shrunken'],
        'baller': ['bounce_ball', 'wrecking_ball', 'null_ball'],
        'magnetic_weaver': ['glue_on_whip', 'repolion_staff', 'power_shield'],
        'brute': ['cutlass', 'patuki', 'curved_axe'],
        'musketeer': ['flintlock', 'musket', 'boom_stick'],
        'zealot': ['cross', 'mace_axe', 'khopesh'],
        'mall_ninja': ['nunchucks', 'throwing_stars', 'blade_grip'],
        'tamer': ['laso', 'barb', 'shackle'],
        'monk': ['chi_orb', 'rings', 'talisman'],
        'giant_slayers': ['sling', 'sling_shot', 'bolas'],
        'witch': ['elemental', 'broomstick', 'gemstock'],
        'racer': ['car', 'truck', 'bike']
    };

    const selectedWeapon = weaponSelect.value;
    weaponTypeSpan.textContent = selectedWeapon.replace(/_/g, ' ');
    
    // Find the class that contains this weapon
    for (const [className, weapons] of Object.entries(weaponClasses)) {
        if (weapons.includes(selectedWeapon)) {
            propertiesSpan.textContent = className.replace(/_/g, ' ');
            break;
        }
    }
    // At the end of your existing function
handleProperties();
}



// Then define the handleProperties function
function handleProperties() {
    const propertiesInput = document.getElementById('properties');
    const categoryInput = document.getElementById('category');
    const propertiesSpan = document.querySelector('#properties.stat-value');
    
    propertiesInput.addEventListener('change', function() {
        const currentProperties = propertiesSpan.textContent;
        const newProperties = this.value;
        
        if (currentProperties) {
            propertiesSpan.textContent = `${currentProperties}, ${newProperties}`;
        } else {
            propertiesSpan.textContent = newProperties;
        }
    });

    categoryInput.addEventListener('change', function() {
        const currentProperties = propertiesSpan.textContent;
        const newCategory = this.value;
        
        if (currentProperties) {
            propertiesSpan.textContent = `${currentProperties}, Category: ${newCategory}`;
        } else {
            propertiesSpan.textContent = `Category: ${newCategory}`;
        }
    });
    handleRangeAndShape();
}

// handles range and shape
function handleRangeAndShape() {
    const rangeInputs = [
        'range 1',
        'range 2',
        'range 3',
        'range 4',
        'range 5'
    ];

    const rangeDisplays = [
        'range1',
        'range2',
        'range3',
        'range4',
        'range5'
    ];

    const shapeDisplays = [
        'shape1',
        'shape2',
        'shape3',
        'shape4',
        'shape5'
    ];

    rangeInputs.forEach((inputId, index) => {
        const rangeInput = document.getElementById(inputId);
        const rangeDisplay = document.getElementById(rangeDisplays[index]);
        const shapeDisplay = document.getElementById(shapeDisplays[index]);

        rangeInput.addEventListener('change', function() {
            const rangeValue = this.value;
            
            // Parse range values
            if (rangeValue.includes('/')) {
                // Handle normal/long range format (e.g., 150/600)
                const [normalRange, longRange] = rangeValue.split('/');
                rangeDisplay.textContent = `${normalRange}ft (${longRange}ft)`;
                shapeDisplay.textContent = 'Ranged Target';
            } else if (rangeValue.includes('x')) {
                // Handle area format (e.g., 15x15)
                rangeDisplay.textContent = `${rangeValue}ft`;
                shapeDisplay.textContent = 'Area';
            } else if (rangeValue.toLowerCase().includes('cone')) {
                // Handle cone format
                rangeDisplay.textContent = rangeValue;
                shapeDisplay.textContent = 'Cone';
            } else if (rangeValue.toLowerCase().includes('sphere')) {
                // Handle sphere format
                rangeDisplay.textContent = rangeValue;
                shapeDisplay.textContent = 'Sphere';
            } else {
                // Handle simple range format
                rangeDisplay.textContent = `${rangeValue}ft`;
                shapeDisplay.textContent = 'Single Target';
            }
        });
    });
    handleToHitAndRecoil();
}

function handleToHitAndRecoil() {
    const toHitInputs = [
        'toHit1',
        'toHit2',
        'toHit3',
        'toHit4',
        'toHit5'
    ];

    const recoilInputs = [
        'recoil1',
        'recoil2',
        'recoil3',
        'recoil4',
        'recoil5'
    ];

    const aimDisplays = [
        'aim1',
        'aim2',
        'aim3',
        'aim4',
        'aim5'
    ];

    const recoilDisplays = [
        'recoil 1',
        'recoil 2',
        'recoil 3',
        'recoil 4',
        'recoil 5'
    ];

    // Handle To Hit inputs
    toHitInputs.forEach((inputId, index) => {
        const toHitInput = document.getElementById(inputId);
        const aimDisplay = document.getElementById(aimDisplays[index]);

        toHitInput.addEventListener('change', function() {
            let value = this.value;
            if (!value.startsWith('+') && value !== '') {
                value = '+' + value;
            }
            aimDisplay.textContent = value || '+0';
        });
    });

    // Handle Recoil inputs
    recoilInputs.forEach((inputId, index) => {
        const recoilInput = document.getElementById(inputId);
        const recoilDisplay = document.getElementById(recoilDisplays[index]);

        recoilInput.addEventListener('change', function() {
            recoilDisplay.textContent = this.value || '0';
        });
    });
    handleSpecialEffects();
}

function handleSpecialEffects() {
    const specialEffectInputs = [
        'specialEffect1',
        'specialEffect2',
        'specialEffect3',
        'specialEffect4',
        'specialEffect5'
    ];

    const effectDisplays = [
        'effect1',
        'effect2',
        'effect3',
        'effect4',
        'effect5'
    ];

    specialEffectInputs.forEach((inputId, index) => {
        const effectInput = document.getElementById(inputId);
        const effectDisplay = document.getElementById(effectDisplays[index]);

        effectInput.addEventListener('change', function() {
            effectDisplay.textContent = this.value || 'Pierce';
        });
    });
}
