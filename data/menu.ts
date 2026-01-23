
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  isVegetarian?: boolean;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuSection {
  title: string;
  subtitle?: string;
  specialOffer?: {
    adults: string;
    kidsUnder3: string;
    age4to8: string;
  };
  categories: MenuCategory[];
  note?: string;
}

// DINE-IN BUFFET MENU
export const dineInMenuData: MenuSection = {
  title: "Dine-In Buffet Menu",
  subtitle: "Special Offer",
  specialOffer: {
    adults: "£13.95",
    kidsUnder3: "Free",
    age4to8: "£6.95"
  },
  note: "Dishes may vary or be substituted to bring you the newest seasonal flavours",
  categories: [
    {
      category: "Main Course",
      items: [
        { name: "Kabuli Pilau", description: "", price: "" },
        { name: "Chicken Karahi", description: "", price: "" },
        { name: "Mutton Masala", description: "", price: "" },
        { name: "Nihari", description: "", price: "" },
        { name: "Daal Tarka", description: "", price: "", isVegetarian: true },
        { name: "Naan", description: "", price: "" }
      ]
    },
    {
      category: "Cold Section",
      items: [
        { name: "Gol Gappay", description: "", price: "", isVegetarian: true },
        { name: "Channa Chaat", description: "", price: "", isVegetarian: true },
        { name: "Dahi Bhalla", description: "", price: "", isVegetarian: true }
      ]
    },
    {
      category: "Salad Section",
      items: [
        { name: "Green Salad", description: "", price: "", isVegetarian: true },
        { name: "Russian Salad", description: "", price: "", isVegetarian: true }
      ]
    },
    {
      category: "Starters",
      items: [
        { name: "Soup of the Day", description: "", price: "" },
        { name: "Murgh Boti", description: "", price: "" },
        { name: "Peshawari Chapli Kebabs", description: "", price: "" },
        { name: "BBQ Chicken Wings", description: "", price: "" },
        { name: "Masala Fried Fish", description: "", price: "" },
        { name: "Vegetable Pakoras", description: "", price: "", isVegetarian: true },
        { name: "Chicken Spring Rolls", description: "", price: "" },
        { name: "Chips", description: "", price: "" }
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Gulab Jamun", description: "", price: "" },
        { name: "Shahi Halwa", description: "", price: "" },
        { name: "Ice Cream", description: "", price: "" }
      ]
    }
  ]
};

// TAKEAWAY MENU
export const takeawayMenuData: MenuSection = {
  title: "Takeaway Menu",
  categories: [
    {
      category: "BH Specials",
      items: [
        { name: "Kabuli Pilau with Chapli Kebab", description: "Aromatic rice served with spicy traditional chapli kebab", price: "8.00" },
        { name: "Kabuli Pilau with Murgh Boti", description: "Aromatic rice served with succulent chicken pieces", price: "8.00" },
        { name: "Kabuli Pilau", description: "Aromatic rice served with hari chutney", price: "7.00" },
        { name: "Peshawari Chapli Kebabs with Naan", description: "Traditional kebabs served with fresh naan & mint sauce", price: "9.00" },
        { name: "Nihari", description: "Traditional mutton stew served with garnish", price: "9.00" }
      ]
    },
    {
      category: "Curries",
      items: [
        { name: "Chicken Masala", description: "Spicy chicken dish", price: "7.00" },
        { name: "Meat Masala", description: "Spicy meat dish", price: "8.00" },
        { name: "Tarka Daal", description: "", price: "6.00", isVegetarian: true }
      ]
    },
    {
      category: "Starters",
      items: [
        { name: "BBQ Chicken Wings", description: "Marinated wings served with mint sauce", price: "4.00" },
        { name: "Murgh Boti", description: "Succulent chicken pieces served with raita & mint sauce", price: "4.50" },
        { name: "Peshawari Chapli Kebabs", description: "Traditional kebabs served with raita & mint sauce", price: "5.00" },
        { name: "Chicken Spring Rolls", description: "Crispy rolls served with raita & mint sauce", price: "2.50" },
        { name: "Masala Fried Fish", description: "Spiced fish served with raita & mint sauce", price: "4.50" },
        { name: "Vegetable Pakoras", description: "Crispy pakoras served with mint sauce", price: "2.50", isVegetarian: true },
        { name: "Channa Chaat", description: "Chickpea chaat served with garnish", price: "4.00", isVegetarian: true },
        { name: "Dahi Bhalla", description: "Lentil dumplings in yogurt served with garnish", price: "4.50", isVegetarian: true }
      ]
    },
    {
      category: "Sides & Breads",
      items: [
        { name: "Green Salad", description: "", price: "1.00", isVegetarian: true },
        { name: "Chips", description: "", price: "2.00" },
        { name: "Peri Peri Chips", description: "", price: "2.50", isVegetarian: true },
        { name: "Two Mini Chapli Kebabs", description: "", price: "2.00" },
        { name: "Naan", description: "", price: "1.50" },
        { name: "Tandoori Roti", description: "", price: "1.00" }
      ]
    },
    {
      category: "Dips",
      items: [
        { name: "Mint Sauce, Chilli Sauce, Ketchup, Garlic Mayonnaise, Hari Chutney", description: "", price: "0.50" }
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Gulab Jamun", description: "4 Pieces", price: "4.00" },
        { name: "Shahi Halwa", description: "", price: "4.00" }
      ]
    },
    {
      category: "Drinks",
      items: [
        { name: "Ice Cola, Ice Extreme, Ice Lemon, Ice Blu", description: "", price: "2.00" }
      ]
    }
  ]
};

// BREAKFAST MENU (Weekends)
export const breakfastMenuData: MenuSection = {
  title: "Breakfast Menu",
  categories: [
    {
      category: "Traditional Breakfast",
      items: [
        { name: "Halwa Puri Thali", description: "Semolina pudding served with fried bread and chickpea curry", price: "8.95" },
        { name: "Nihari", description: "Slow-cooked lamb stew served with naan", price: "9.95" },
        { name: "Paye", description: "Traditional trotters curry cooked with aromatic spices", price: "9.95" },
        { name: "Afghan Omelette", description: "Eggs cooked with tomatoes, onions, chillies and coriander", price: "7.50", isVegetarian: true }
      ]
    },
    {
      category: "Sides & Drinks",
      items: [
        { name: "Tandoori Paratha", description: "Freshly baked layered flatbread", price: "2.50", isVegetarian: true },
        { name: "Pink Tea (Kashmiri Chai)", description: "Traditional creamy tea with nuts", price: "3.50", isVegetarian: true },
        { name: "Masala Chai", description: "Spiced tea", price: "2.95", isVegetarian: true }
      ]
    }
  ]
};

// BREAKFAST BUFFET
export const breakfastBuffetData: MenuSection = {
  title: "Breakfast Buffet",
  subtitle: "Unlimited Weekend Special",
  specialOffer: {
    adults: "£14.95",
    kidsUnder3: "Free",
    age4to8: "£7.95"
  },
  categories: [
    {
      category: "Buffet Selection",
      items: [
        { name: "Unlimited Halwa Puri", description: "Freshly made on demand", price: "" },
        { name: "Nihari & Paye", description: "Traditional stews", price: "" },
        { name: "Chana Masala", description: "Spiced chickpeas", price: "", isVegetarian: true },
        { name: "Omelette Station", description: "Made to order", price: "", isVegetarian: true },
        { name: "Variety of Naans", description: "Plain, Butter, Garlic", price: "", isVegetarian: true },
        { name: "Lassi & Tea", description: "Included in buffet price", price: "", isVegetarian: true }
      ]
    }
  ]
};

// Combined menu data for backward compatibility
export const menuData: MenuCategory[] = [
  ...dineInMenuData.categories,
  ...takeawayMenuData.categories
];
