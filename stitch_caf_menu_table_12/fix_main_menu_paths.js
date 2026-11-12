const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500/script.js');
let content = fs.readFileSync(scriptPath, 'utf8');

const replacements = [
    { old: 'assets/brunch-burrito.jpg', new: 'assets/brunch-garden-skillet.jpg' },
    { old: 'assets/brunch-tacos.jpg', new: 'assets/brunch-frittata.jpg' }, // Use frittata or garden skillet
    { old: 'assets/brunch-acai-bowl.jpg', new: 'assets/sweet-strawberry-tart.jpg' }, // Use tart for bowl look
    { old: 'assets/latte-matcha.jpg', new: 'assets/latte-iced-matcha.jpg' },
    { old: 'assets/coffee-ethiopian.jpg', new: 'assets/coffee-single-origin-espresso.jpg' },
    { old: 'assets/tea-dirty-chai.jpg', new: 'assets/tea-masala-chai.jpg' },
    { old: 'assets/tea-turmeric.jpg', new: 'assets/juice-ginger-turmeric-shot.jpg' },
    { old: 'assets/coffee-cold-brew.jpg', new: 'assets/coffee-kyoto-cold-brew.jpg' },
    { old: 'assets/latte-creamy-orange.jpg', new: 'assets/latte-spanish.jpg' },
    { old: 'assets/cold-drink-citrus-spark.jpg', new: 'assets/juice-lemonade.jpg' },
    { old: 'assets/cold-drink-mango-fizz.jpg', new: 'assets/juice-mango-glow.jpg' },
    { old: 'assets/cold-drink-berry-citrus.jpg', new: 'assets/juice-berry-blast.jpg' },
    { old: 'assets/latte-caramel.jpg', new: 'assets/latte-caramel-macchiato.jpg' },
    { old: 'assets/smoothie-berry-burst.jpg', new: 'assets/smoothie-berry-cream.jpg' },
    { old: 'assets/shake-chocolate-classic.jpg', new: 'assets/smoothie-choco-malt.jpg' },
    { old: 'assets/toast-shakshuka-baked.jpg', new: 'assets/toast-shakshuka.jpg' },
    { old: 'assets/brunch-vegan-bowl.jpg', new: 'assets/toast-vegan-bowl.jpg' },
    { old: 'assets/pastry-eclair-chocolate.jpg', new: 'assets/bakery-chocolate-eclair.jpg' },
    
    // Fix duplicate naming issues if any
    { old: 'name: "Ceremonial Matcha"', new: 'name: "Matcha Latte"' },
];

replacements.forEach(rep => {
    if (content.includes(rep.old)) {
        content = content.replace(new RegExp(rep.old, 'g'), rep.new);
        console.log(`Replaced ${rep.old} with ${rep.new}`);
    }
});

fs.writeFileSync(scriptPath, content, 'utf8');
console.log('Updated script.js image paths');
