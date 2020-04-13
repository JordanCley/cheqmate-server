"use strict";

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("Products", [
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03500/ccapp-03500-2x.png",
        product_name: "Bloomin' Onion",
        description:
          "An Outback original! Our special onion is hand-carved, cooked until golden and ready to dip into our spicy signature bloom sauce.",
        price: 8.99,

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03501/ccapp-03501-2x.png",
        product_name: "Cheese Fries",
        description:
          "Topped with melted Monterey Jack, Cheddar and chopped bacon with house-made ranch dressing.",
        price: 6.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03502/ccapp-03502-2x.png",
        product_name: "Kookaburra Wings",
        description:
          "Chicken wings tossed in our secret spices served with our Blue Cheese dressing and celery. Choose mild, medium or hot.",
        price: 11.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03832/ccapp-03832-2x.png",
        product_name: "Alice Springs Chicken Quesadilla",
        description:
          "Stuffed with fresh grilled chicken breast, sautéed mushrooms, bacon, melted cheeses and honey mustard sauce.",
        price: 12.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03503/ccapp-03503-2x.png",
        product_name: "Wood-Fire Grilled Shrimp On The Barbie",
        description:
          "Sprinkled with a special blend of seasonings and wood-fire grilled. Served with grilled artisan bread, garlic herb butter and fresh tomato basil.",
        price: 14.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03505/ccapp-03505-2x.png",
        product_name: "Gold Coast Coconut Shrimp",
        description:
          "Hand-dipped in batter, rolled in coconut and fried golden. Paired with Creole marmalade.",
        price: 14.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        image_url:
          "https://bbimenus.blob.core.windows.net/items/03539/ccapp-03539-2x.png",
        product_name: "Seared Peppered Ahi",
        description:
          "Sashimi-style Tuna seared rare and placed atop an Asian slaw. Served with a creamy ginger-soy sauce.",
        price: 12.99,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
