
# POWERNOVA E-Commerce - Complete Overhaul Plan

## Overview
Enhance the existing POWERNOVA electronics store with multiple product images per item, 10 named delivery agents, improved UI/UX with Zepto-like product display, and polished end-to-end workflow.

---

## 1. Multi-Image Product System

**Current state**: Each product has a single `image` string field.

**Changes**:
- Update `Product` interface in `CartContext.tsx` to add `images: string[]` field (array of 3-5 unique Unsplash images per product)
- Update all 100 products in `products.ts` with distinct, category-appropriate image URLs (different angles/perspectives per product)
- Keep backward-compatible `image` field as primary thumbnail

**ProductDetail page** (`ProductDetail.tsx`):
- Add an image gallery with thumbnail strip below main image (click to switch)
- Main image swaps on thumbnail click with smooth animation
- Zepto-style layout: large image left, thumbnails below, product info right

**ProductCard** (`ProductCard.tsx`):
- On hover, cycle through images (subtle image carousel effect)

---

## 2. Delivery Agent System (10 Named Agents)

**Update `DeliveryTracker.tsx`**:
- Add array of 10 delivery agents with the specified names:
  1. Sandeep Raja
  2. Suraj
  3. Jai Bhim
  4. Invisible Nandeesh
  5. Sachuu
  6. Pod Shivu
  7. Syed Khameni
  8. Rocky Raju
  9. Anekal Chandan
  10. Hosur Gowda
- Each agent gets a random rating (4.2-4.9) and a vehicle type
- On each order, randomly assign one of the 10 agents
- Display agent name, photo placeholder, rating, and phone call button in the tracker card

---

## 3. Map & Delivery Tracking Improvements

**Current state**: Uses Leaflet with OpenStreetMap tiles and a simple animated marker.

**Changes** (keeping Leaflet/OpenStreetMap - no Google Maps API key needed):
- Make the route more realistic with more waypoints (20+ points for smoother animation)
- Add a store marker at the origin with a warehouse icon
- Show distance remaining and speed info
- Add pulsing animation on the delivery agent marker
- Improve the map styling with a cleaner tile layer (CartoDB Voyager tiles for a modern look)
- Add order timeline steps: "Order Confirmed" -> "Packed" -> "Agent Picked Up" -> "On the Way" -> "Arriving Soon"

> Note: Google Maps API requires a paid API key. The current OpenStreetMap approach provides the same visual experience for free. If you want Google Maps specifically, you'd need to provide a Google Maps API key.

---

## 4. Header & Navigation Improvements

**Update `Header.tsx`**:
- Make "FOUNDER - CHANDAN & PREETHAM" more prominent at top-right with a badge-style design
- Make search bar functional: filter products in real-time and show dropdown results
- Add working navigation links for all categories at the top bar
- Add "Orders", "Deals", "Account" as clickable nav items
- Mobile hamburger menu with full category list

---

## 5. Product Display - Zepto Style

**Update `ProductCard.tsx`**:
- Add "Add to Cart" with quantity +/- stepper (Zepto style: green button with count)
- Show delivery time badge more prominently
- Quick-add animation (green checkmark flash on add)

**Update `ProductGrid.tsx`**:
- Add category filter from URL params (already partially works)
- Add sort options: "Price Low-High", "Price High-Low", "Rating", "Discount"
- Improve grid responsiveness for Zepto-like compact cards

---

## 6. Payment Gateway Polish

**Update `Checkout.tsx`**:
- UPI QR code already linked to 8147850160 - keep as is
- Add Razorpay-style branded payment page with logo and security badges
- Add payment method tabs (UPI / Card / COD) with smooth transitions
- Card form: add proper input masking (auto-format card number with spaces, MM/YY formatting)
- Add "Powered by POWERNOVA Secure Payments" footer on payment screen
- Add order summary sidebar that stays visible during payment

---

## 7. UI/UX & Styling Polish

**Update `index.css` and `tailwind.config.ts`**:
- Keep yellowish-grey background theme
- Improve card shadows and hover effects
- Add subtle gradient accents on section headers

**Update `HeroBanner.tsx`**:
- Keep stylish Orbitron POWERNOVA font centered
- Add animated product showcase carousel in background

---

## Technical Summary

| File | Changes |
|------|---------|
| `src/context/CartContext.tsx` | Add `images: string[]` to Product interface |
| `src/data/products.ts` | Add multiple images array per product (3-5 each) |
| `src/components/ProductCard.tsx` | Hover image cycling, Zepto-style add button |
| `src/pages/ProductDetail.tsx` | Image gallery with thumbnails |
| `src/components/DeliveryTracker.tsx` | 10 named agents, smoother route, better map tiles |
| `src/components/Header.tsx` | Prominent founder badge, working search, nav links |
| `src/components/ProductGrid.tsx` | Sort/filter options, category filtering |
| `src/pages/Checkout.tsx` | Polished payment UI, card masking, security badges |
| `src/components/HeroBanner.tsx` | Minor styling tweaks |
| `src/index.css` | UI polish adjustments |
