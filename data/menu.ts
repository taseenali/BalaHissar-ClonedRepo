
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

// DINE-IN BUFFET MENU (Starters, Main, Cold, Salad, Desserts)
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
      category: "Starters",
      items: [
        { name: "Soup of the day", description: "", price: "" },
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
    }
  ]
};



// BREAKFAST BUFFET
export const breakfastBuffetData: MenuSection = {
  title: "Breakfast Buffet",
  subtitle: "Unlimited Weekend Special",
  specialOffer: {
    adults: "£11.95",
    kidsUnder3: "Free",
    age4to8: "£6.95"
  },
  categories: [
    {
      category: "Buffet Selection",
      items: [
        { name: "Paya & Nihari", description: "Slow-cooked traditional stews", price: "" },
        { name: "Keema Fry", description: "Spiced minced meat", price: "" },
        { name: "Lahori Channa Anda", description: "Chickpeas with egg", price: "" },
        { name: "Aloo Bhujia", description: "Spiced potato dish", price: "", isVegetarian: true },
        { name: "Chicken Wings", description: "Spiced and grilled", price: "" },
        { name: "Halwa & Sheer Khurma", description: "Traditional desserts", price: "", isVegetarian: true },
        { name: "Salad Section", description: "Pickle Onion, Kachumar, and Pickles", price: "", isVegetarian: true },
        { name: "Fresh Puri & Naan", description: "Included in buffet selection", price: "", isVegetarian: true },
        { name: "Sauces & Condiments", description: "", price: "", isVegetarian: true }
      ]
    }
  ]
};

// DRINKS MENU
export const drinksMenuData: MenuSection = {
  title: "Drinks Menu",
  categories: [
    {
      category: "Lassi & Juice",
      items: [
        { name: "Fresh Orange Juice", description: "", price: "" },
        { name: "Mango Lassi", description: "", price: "" },
        { name: "Sweet Lassi", description: "", price: "" },
        { name: "Salty Lassi", description: "", price: "" }
      ]
    },
    {
      category: "Mocktails",
      items: [
        { name: "Virgin Mojito", description: "Lemon, lime, fresh mint over crushed ice", price: "" },
        { name: "Strawberry Mojito", description: "Bright, tangy, and delightfully sweet", price: "" },
        { name: "Blue Lagoon", description: "Blue curaçao, mint, and lime soda", price: "" },
        { name: "Passion Fruit Chilli", description: "Passion fruit, wild mint, lime & Thai chilli", price: "" },
        { name: "Nimbo Paani", description: "Lemon drink with cane sugar and mint", price: "" }
      ]
    },
    {
      category: "Jug Selection",
      items: [
        { name: "Nimbo Paani Jug", description: "", price: "" },
        { name: "Soft Drink Jugs", description: "Ice Cola, Extreme, Lemon, or Blu", price: "" },
        { name: "Fresh Orange Juice Jug", description: "", price: "" },
        { name: "Mango Lassi Jug", description: "", price: "" },
        { name: "Lassi Jugs", description: "Sweet or Salty", price: "" }
      ]
    },
    {
      category: "Glass Bottles & Cans",
      items: [
        { name: "Soft Drink Bottles", description: "Ice Cola, Lemon, Xtreme, Blu, Irn Bru", price: "" },
        { name: "J2O", description: "Raspberry, Apple & Mango, or Orange", price: "" },
        { name: "Fruit Shoot", description: "Blackcurrant or Orange", price: "" },
        { name: "Water", description: "Still or Sparkling", price: "" },
        { name: "Soft Drink Cans", description: "Ice Cola, Extreme, Lemon, or Blu", price: "" }
      ]
    },
    {
      category: "Hot Drinks & Desserts",
      items: [
        { name: "Desi Chai", description: "", price: "" },
        { name: "Pot of Desi Chai / Kava", description: "", price: "" },
        { name: "Peshawari Kava", description: "", price: "" },
        { name: "English Tea", description: "", price: "" },
        { name: "Falooda", description: "Signature traditional dessert", price: "" }
      ]
    }
  ]
};

// Combined menu data for backward compatibility
export const menuData: MenuCategory[] = [
  ...dineInMenuData.categories,
  ...takeawayMenuData.categories
];
