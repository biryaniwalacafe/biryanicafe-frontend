# Design Guidelines: Biriyani wala & Cafe

## Design Approach
**Reference-Based Approach** drawing inspiration from successful food delivery platforms (Swiggy, Zomato, UberEats) combined with modern restaurant aesthetics. The design prioritizes appetite appeal through high-quality food photography while maintaining intuitive navigation and seamless ordering flow.

## Core Design Principles
1. **Appetite-Driven Design**: Food imagery takes center stage with generous portions and authentic presentation
2. **Friction-Free Ordering**: Minimal clicks from browse to checkout
3. **Cultural Authenticity**: Design elements that honor the biriyani heritage while feeling contemporary
4. **Trust & Transparency**: Clear pricing, real-time updates, and honest food representation

---

## Typography System

**Primary Font**: Poppins (Google Fonts) - Clean, modern, excellent readability
**Accent Font**: Playfair Display (Google Fonts) - For brand moments and section headings

**Hierarchy**:
- Hero Headline: Playfair Display, 4xl-6xl, bold
- Section Headers: Poppins, 3xl-4xl, semibold
- Card Titles: Poppins, xl-2xl, medium
- Body Text: Poppins, base-lg, regular
- Labels/Meta: Poppins, sm-base, medium
- Buttons: Poppins, sm-base, semibold, uppercase tracking-wide

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Component internal padding: p-4, p-6
- Section vertical spacing: py-12 (mobile), py-20 (desktop)
- Card gaps: gap-4, gap-6
- Element margins: mb-4, mb-6, mb-8

**Container Strategy**:
- Full-width sections with inner max-w-7xl
- Content sections: max-w-6xl
- Forms/text: max-w-2xl

---

## Page-Specific Layouts

### Homepage
**Hero Section** (80vh):
- Full-width background image showcasing signature biriyani dish (high-quality, appetizing close-up)
- Centered content overlay with blurred background for text/CTA
- Headline + subheadline + primary CTA ("Order Now") + secondary CTA ("View Menu")
- Floating trust indicators (e.g., "⭐ 4.8/5 from 2,000+ orders", "🚚 30-min delivery")

**Featured Categories** (Multi-column):
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Large category cards with background images, overlay gradient, and category name
- Categories: Signature Biriyani, Starters, Main Course, Beverages

**Popular Items Section**:
- 3-column grid of featured menu items
- Each card: Large food image, item name, short description, price, "Add to Cart" button
- Quick view icon for customization modal

**Why Choose Us**:
- 3-column feature grid with icons
- Features: "Authentic Recipes", "Fresh Ingredients", "Lightning Fast Delivery"

**Testimonials**:
- 2-column grid with customer reviews
- Include customer photo, name, rating stars, review text

**Download App CTA** (if applicable):
- Split layout: mockup image + download buttons

### Menu Page
**Filter Sidebar** (Desktop) / Collapsible Top Bar (Mobile):
- Category checkboxes (Veg/Non-Veg, Biriyani, Starters, etc.)
- Price range slider
- Dietary preferences (Gluten-Free, Dairy-Free, etc.)
- Rating filter
- "Clear All" and "Apply Filters" buttons

**Menu Grid**:
- 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Cards with: Food image, vegetarian indicator, item name, description (2 lines), price, rating, "Customize & Add" button
- Hover: Slight lift shadow, scale 1.02

**Search Bar**:
- Prominent position with autocomplete dropdown
- Shows item thumbnails in suggestions

### Item Customization Modal
- Large product image at top
- Title, description, price
- Spice level selector (radio buttons with chili icons)
- Add-ons section (checkboxes with images and prices)
- Portion size selector (radio buttons)
- Quantity stepper
- Total price calculation (dynamic)
- "Add to Cart" button (full-width, prominent)

### Shopping Cart (Sidebar Drawer):
- Slides from right
- Cart items with thumbnail, name, customizations, quantity stepper, remove button
- Subtotal, delivery fee, discount (if coupon applied)
- Coupon input field with "Apply" button
- "Proceed to Checkout" button (sticky at bottom)

### Checkout Flow
**Multi-step process with progress indicator**:

1. **Address Selection**:
   - Saved addresses as cards (2-column on desktop)
   - "Add New Address" card
   - Selected address highlighted

2. **Order Summary**:
   - Items list (compact view)
   - Delivery details
   - Payment method selector

3. **Confirmation**:
   - Success animation (checkmark)
   - Order number, estimated delivery time
   - "Track Order" button

### User Dashboard
**Sidebar Navigation** (Desktop) / Top Tabs (Mobile):
- Profile, Order History, Saved Addresses, Favorites, Logout

**Order History**:
- List cards showing: Order date, items count, total, status badge, "Reorder" and "View Details" buttons
- Expandable to show full item list

**Favorites/Wishlist**:
- Same grid as menu items
- Heart icon toggle (filled when favorited)

### Footer
**Multi-column layout** (4 columns desktop, stack on mobile):
- **Column 1**: Logo, tagline, social media icons
- **Column 2**: Quick Links (Menu, About, Contact, FAQ)
- **Column 3**: Contact Info (Address with map icon, phone, email, hours)
- **Column 4**: Newsletter signup (input + button)
- **Bottom bar**: Copyright, Privacy Policy, Terms

### About Us Page
**Hero**: Full-width image of restaurant/kitchen with overlay text

**Our Story Section**:
- 2-column layout: Text block + image collage
- Rich text describing heritage and mission

**Our Team** (if applicable):
- 3-column grid with chef/team photos and short bios

### Contact Us Page
**2-column layout**:
- **Left**: Contact form (Name, Email, Phone, Message, Submit button)
- **Right**: 
  - Google Maps embed showing location
  - Contact details with icons (address, phone, email)
  - Operating hours
  - Social media links

---

## Component Library

### Cards
- Menu Item Card: Image (aspect-ratio-square), padding p-4, rounded-lg, shadow-md, hover shadow-xl
- Category Card: Image background, overlay gradient, text centered
- Review Card: Padding p-6, border, rounded-lg

### Buttons
**Primary**: Full padding px-6 py-3, rounded-lg, semibold text, transform hover:scale-105
**Secondary**: Outlined variant, same padding
**Icon Buttons**: Square p-3, rounded-full for floating actions

### Forms
- Input fields: border, rounded-md, px-4 py-3, focus ring
- Labels: Above inputs, mb-2, font-medium
- Error states: Red border + error message below

### Badges
- Status badges: Small, rounded-full px-3 py-1, uppercase text-xs
- Veg/Non-veg indicators: Small circular badges with icons

### Navigation
**Top Navigation**:
- Sticky header with logo (left), menu links (center), cart icon + login button (right)
- Mobile: Hamburger menu

**Breadcrumbs**: On menu/detail pages for easy navigation

---

## Animations (Minimal & Purposeful)

**Strategic Use Only**:
- Cart icon shake when item added (subtle)
- Skeleton loaders for menu items during load
- Page transitions: Simple fade (200ms)
- Modal/drawer slide-in animations (300ms ease-out)
- Success checkmark animation on order confirmation
- Hover states: opacity/shadow changes only (no complex animations)

**Avoid**: Auto-playing carousels, parallax effects, excessive motion

---

## Images

**Hero Image**: Full-width, high-quality photograph of signature biriyani in traditional serving vessel with steam, garnished with herbs, warm lighting - conveys authenticity and appetite appeal

**Category Images**: Close-up shots of representative dishes for each category (Biriyani, Starters, Main Course, etc.)

**Menu Item Images**: Consistent photography style - overhead or 45-degree angle, well-lit, appetizing presentation on neutral backgrounds

**About Us Images**: Candid kitchen shots, team photos, restaurant ambiance

**Placeholder Strategy**: For development, use food-specific placeholder services or Unsplash food photography

---

## Responsive Breakpoints
- Mobile: < 640px (single column, stacked layouts, bottom navigation)
- Tablet: 640px - 1024px (2-column grids, sidebar becomes top bar)
- Desktop: > 1024px (multi-column grids, sidebar navigation)

**Mobile-First Considerations**:
- Sticky "View Cart" button at bottom
- Collapsible filters
- Simplified navigation drawer
- Touch-friendly button sizes (min 44px)

This design creates a visually rich, conversion-optimized experience that makes ordering biriyani irresistible while maintaining clarity and ease of use across all features.