// Pandit Image Configuration - Easy to adjust
export const panditImageConfig = {
  // Avatar container size (w-{size} h-{size})
  size: "54", // Options: "48", "56", "64", "80" (default: "64")
  
  // Image zoom/scale (scale-{value})
  scale: "150", // Options: "100", "125", "150", "175", "200"
  
  // Avatar styling classes
  containerClasses: "w-64 h-64 mx-auto mb-6 overflow-hidden rounded-full shadow-lg",
  
  // Image styling classes
  imageClasses: "object-cover object-center w-full h-full scale-150",
  
  // Border and styling
  border: true,
  shadow: true,
  
  // Colors/effects
  effectClass: "" // Add any hover effects or filters if needed
};

/*
EASY ADJUSTMENT GUIDE:
======================

1. SIZE - Change the size of the circle:
   - "48" = Small (192px)
   - "56" = Medium (224px)
   - "64" = Large (256px) - Current
   - "80" = Extra Large (320px)

2. SCALE - Change image zoom (fill whitespace):
   - "100" = No zoom
   - "125" = 25% zoom
   - "150" = 50% zoom (Current - Fills circle)
   - "175" = 75% zoom
   - "200" = 100% zoom

3. OBJECT-CENTER - Change which part of image shows:
   - "object-center" = Center (Current)
   - "object-top" = Top of image
   - "object-bottom" = Bottom
   - "object-left" = Left side
   - "object-right" = Right side

Example changes:
- For bigger circle: Change size to "80"
- For more face visible: Change scale to "175"
- To show less whitespace: Increase scale (150, 175, 200)
- To adjust head position: Change object-center to object-top/bottom

AFTER CHANGING VALUES, the component will auto-update!
*/
