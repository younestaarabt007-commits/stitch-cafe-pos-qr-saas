const fs = require('fs');
const path = require('path');

// Read current index.html
const indexPath = 'swiggy-style_elite_main_menu_390x2500/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// Replace the Featured section with original design
const originalFeaturedSection = `    <!-- Featured Section -->
    <section class="px-5 md:px-8 mt-8 mb-8 relative z-10">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">star</span>
          <span data-i18n="featured">Featured</span>
        </h3>
      </div>
      
      <!-- Original Cards with Green/Purple Gradients -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Card 1: Chef's Choice -->
        <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
          <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <span class="text-xs font-bold">Chef's Choice</span>
          </div>
          <h4 class="text-xl font-bold mb-2">Signature Dish</h4>
          <p class="text-sm opacity-90 mb-4">Our most popular creation</p>
          <div class="flex justify-between items-center">
            <span class="text-2xl font-bold">$12.99</span>
            <button class="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
              Order Now
            </button>
          </div>
        </div>

        <!-- Card 2: New Arrival -->
        <div class="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
          <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <span class="text-xs font-bold">New</span>
          </div>
          <h4 class="text-xl font-bold mb-2">Fresh Creation</h4>
          <p class="text-sm opacity-90 mb-4">Just added to our menu</p>
          <div class="flex justify-between items-center">
            <span class="text-2xl font-bold">$9.99</span>
            <button class="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
              Try It
            </button>
          </div>
        </div>

        <!-- Card 3: Bestseller -->
        <div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
          <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <span class="text-xs font-bold">Bestseller</span>
          </div>
          <h4 class="text-xl font-bold mb-2">Customer Favorite</h4>
          <p class="text-sm opacity-90 mb-4">Loved by everyone</p>
          <div class="flex justify-between items-center">
            <span class="text-2xl font-bold">$14.99</span>
            <button class="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>`;

// Replace the 4 Big Category Buttons section
const originalCategoryButtons = `    <!-- 4 Big Category Buttons -->
    <section class="px-5 md:px-8 mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Brew Button -->
        <div class="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer" onclick="window.location.href='../Brew catégorie page/index.html'">
          <div class="flex flex-col items-center justify-center h-full">
            <span class="material-symbols-outlined text-4xl mb-2">coffee</span>
            <h3 class="text-xl font-bold">Brew</h3>
            <p class="text-sm opacity-90">Coffee & Tea</p>
          </div>
        </div>

        <!-- Pastries Button -->
        <div class="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer" onclick="window.location.href='../fast food sub catégorie page/index.html'">
          <div class="flex flex-col items-center justify-center h-full">
            <span class="material-symbols-outlined text-4xl mb-2">bakery_dining</span>
            <h3 class="text-xl font-bold">Pastries</h3>
            <p class="text-sm opacity-90">Sweet Treats</p>
          </div>
        </div>

        <!-- Cold Drink Button -->
        <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer" onclick="window.location.href='../cold drinks catégorie page/index.html'">
          <div class="flex flex-col items-center justify-center h-full">
            <span class="material-symbols-outlined text-4xl mb-2">local_cafe</span>
            <h3 class="text-xl font-bold">Cold Drink</h3>
            <p class="text-sm opacity-90">Refreshments</p>
          </div>
        </div>

        <!-- Brunch Button -->
        <div class="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer" onclick="window.location.href='../toast brunch sub catégorie page/index.html'">
          <div class="flex flex-col items-center justify-center h-full">
            <span class="material-symbols-outlined text-4xl mb-2">brunch_dining</span>
            <h3 class="text-xl font-bold">Brunch</h3>
            <p class="text-sm opacity-90">Morning Feast</p>
          </div>
        </div>
      </div>
    </section>`;

// Find and replace the Featured section
const featuredStart = content.indexOf('<!-- Featured Section -->');
const featuredEnd = content.indexOf('</section>', featuredStart) + 10;
if (featuredStart !== -1 && featuredEnd !== -1) {
  content = content.substring(0, featuredStart) + originalFeaturedSection + content.substring(featuredEnd);
}

// Find where to insert the 4 category buttons (after Featured section, before Explore)
const exploreStart = content.indexOf('<!-- Explore Menu -->');
if (exploreStart !== -1) {
  content = content.substring(0, exploreStart) + originalCategoryButtons + '\n    ' + content.substring(exploreStart);
}

// Remove the broken carousel completely
content = content.replace(/<!-- Infinite Auto-Scroll Carousel -->[\s\S]*?<\/section>/g, '');

// Write the updated content
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ Original design restored!');
console.log('✅ 4 big category buttons added!');
console.log('✅ Broken carousel removed!');