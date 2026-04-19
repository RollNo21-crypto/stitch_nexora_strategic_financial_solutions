# Design System Specification: Architectural Precision & Financial Authority

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Archive"**

In the world of high-end financial advisory, trust is built through **Structural Integrity** and **Editorial Clarity**. This design system balances the "Architectural" heritage with modern usability. While it avoids the hyper-rounded "bubble" aesthetic of consumer SaaS, it adopts a **Moderate Roundedness** (Level 2) to ensure the interface feels approachable and sophisticated rather than sharp or industrial.

We utilize a "High-End Editorial" approach: an intentional play between the authoritative weight of a refined serif and the surgical precision of a geometric sans-serif. The layout logic favors "asymmetric balance"—where generous white space (breathing room) acts as a functional element to guide the eye toward critical data.

---

## 2. Colors & Tonal Depth
The palette is rooted in deep institutional navies (`primary`: #002D62) and grounded slates (`secondary`: #64748B). The neutral base (#06294d) provides a deep, ink-like foundation that evokes the feeling of midnight leather or premium parchment, moving away from standard whites to create a high-contrast, immersive environment.

### The "No-Line" Rule
To achieve a bespoke, premium feel, **1px solid borders are strictly prohibited for sectioning.** 
*   **Boundary Definition:** Define areas through background color shifts. For example, a `surface-container-low` section should sit against a `surface` background to denote a change in context.
*   **Nesting & Hierarchy:** Use the `surface-container` tiers (Lowest to Highest) to create physical depth. Treat the UI like stacked layers of architectural stone. An inner card uses `surface_container_lowest` to "pop" against a `surface_container` background.

### Glass & Gradient Implementation
*   **Signature Glass:** Floating elements (like navigation bars or modals) should use `surface_container_lowest` at 80% opacity with a `backdrop-filter: blur(20px)`. This creates a "frosted glass" effect that feels modern and airy against the dark neutral foundation.
*   **The Power Gradient:** For primary CTAs or hero sections, use a subtle linear gradient from a darkened navy to the primary `seed_color` (#002D62) at a 135-degree angle. This adds "soul" and dimension that flat fills lack.

---

## 3. Typography
The typographic system is the voice of the brand. It must communicate both legacy (trust) and forward-thinking (innovation).

*   **Refined Serif (notoSerif):** Used for all `display` and `headline` scales. This provides an editorial, authoritative tone. Ensure tight tracking on larger scales to maintain a "locked-in" professional look.
*   **Clean Sans-Serif (manrope):** Used for `title`, `body`, and `label` scales. This font provides maximum readability for complex financial data.
*   **Hierarchy Note:** Use `display-lg` (3.5rem) sparingly to create high-contrast "moments" in hero sections, paired with `body-lg` for a sophisticated, magazine-style layout.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking. 
    *   Base: `surface` (#06294d)
    *   Section: `surface_container_low`
    *   Card/Content: `surface_container_lowest`
*   **Ambient Shadows:** Where a shadow is functional (e.g., a floating menu), use an extra-diffused blur (24px - 40px) at 4-6% opacity. Use the `on_surface` color as the shadow tint rather than pure black to keep the light "natural" against the deep background.
*   **The Ghost Border:** If a border is required for accessibility in input fields, use `outline_variant` at 30% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** `primary` (#002D62) background with `on_primary` text. Use moderate rounded corners (Level 2) to balance the sharp typography.
*   **Secondary:** `secondary_container` (#64748B derivative) background with `on_secondary_container` text.
*   **Interaction:** On hover, shift background to `primary_fixed_dim`. Avoid heavy "bounce" animations; use subtle 200ms ease-in-out transitions.

### Cards & Data Containers
*   **The Rule:** No dividers. Use standard spacing (Level 2) between elements to create groupings.
*   **Style:** Use `surface_container_highest` for hover states on list items to create a sophisticated "selection" feel without a border. Moderate corner rounding (Level 2) is applied to all container surfaces.

### Input Fields
*   **Style:** Use `surface_container_low` as the fill. 
*   **Focus:** A 2px "Ghost Border" using `surface_tint` at 50% opacity. The label should use `label-md` in `on_surface_variant`.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts (e.g., a headline aligned left with body text shifted 2 columns to the right).
*   **Do** use `surface_container_low` for large background areas to reduce eye strain against the deep base.
*   **Do** leverage `notoSerif` for numbers in data visualization to emphasize "Financial Heritage."
*   **Do** apply moderate corner rounding (Level 2) consistently across all primary UI components.

### Don't
*   **Don't** use 1px solid borders to separate sections; let the color tiers do the work.
*   **Don't** use default Material Design shadows. They are too heavy for this "Architectural" aesthetic and clash with the deep neutral background.
*   **Don't** use more than one `display-lg` heading per page.
*   **Don't** revert to sharp 0px corners; maintain the Level 2 "Moderate" standard to preserve the premium modern feel.

---

## 7. Spacing & Grid
This system relies on a strictly applied 8px grid aligned with a Normal Spacing (Level 2) configuration. 
*   **Internal Card Padding:** 24px (consistent with Level 2 density).
*   **Section Vertical Padding:** 80px to 120px to create an elite sense of "space."

Every pixel in this system should feel like it was placed by a Swiss watchmaker—precise, intentional, and quiet.