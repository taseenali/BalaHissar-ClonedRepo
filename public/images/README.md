# Local Image Assets (`.webp`) Guide

This directory has been pre-configured for your production `.webp` image assets. Next.js will serve anything inside the `public/` directory at the root URL path.

## Where to place your files:

*   **`/images/hero/`** - For main banner images (e.g., `hero-home.webp`)
*   **`/images/gallery/food/`** - For the 4 food shots on the homepage
*   **`/images/gallery/ambience/`** - For the 2 ambience shots on the homepage
*   **`/images/event-hall/`** - For the 4 images used on the Event Hall page
*   **`/images/menu/`** - Reserved for any future visual menus

## How to use them in the code:

When you drop a file named `my-image.webp` into `public/images/hero/`, you access it in the code using an absolute path (leaving out the word `/public`):

```tsx
import Image from 'next/image';

export function Example() {
  return (
    <Image 
      src="/images/hero/my-image.webp" 
      alt="Description" 
      fill 
    />
  );
}
```

Since we have already refactored the entire codebase to use Next.js `<Image>` components, as soon as you update the `src` string attributes to point to these new local folders, the framework will automatically compress, optimize, and serve your `.webp` images at lightning speed.
