const products = {

    categories: [
        {
            name: "top_menu_items",
            label: "Top Menu Items"
        },
        {
            name: "bites",
            label: "Bites"
        },
        {
            name: "starters",
            label: "Starters"
        },
        {
            name: "drinks",
            label: "Drinks"
        }
    ],

    products: [
        {
            id: 1,
            name: "Signature Pork Ramen",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "14.95",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "top_menu_items",
            options: {
                name: "Choose Spice Level",
                sub: "Required (must select)",
                items: [
                    { id: 1, name: "Level 1" },
                    { id: 2, name: "Level 2" },
                    { id: 3, name: "Level 3" },
                    { id: 4, name: "Level 4" }
                ]
            },
            extra: {
                name: "Extra toppings",
                sub: "Optional",
                items: [
                    { id: 1, name: "Pork Chashu", price: "4.00" },
                    { id: 2, name: "Sauteed Mushrooms", price: "3.00" },
                    { id: 3, name: "Extra Noodles", price: "3.00" }                            
                ]
            }
        },
        {
            id: 2,
            name: "Chicken Paitan Ramen",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "13.45",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "top_menu_items",
            options: {
                name: "Choose Spice Level",
                sub: "Required (must select)",
                items: [
                    { id: 1, name: "Level 1" },
                    { id: 2, name: "Level 2" },
                    { id: 3, name: "Level 3" },
                    { id: 4, name: "Level 4" }
                ]
            },
            extra: {
                name: "Extra toppings",
                sub: "Optional",
                items: [
                    { id: 1, name: "Pork Chashu", price: "4.00" },
                    { id: 2, name: "Sauteed Mushrooms", price: "3.00" },
                    { id: 3, name: "Extra Noodles", price: "3.00" }                         
                ]
            }
        },
        {
            id: 3,
            name: "Mushroom Lover Ramen",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "12.95",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "top_menu_items",
            options: {
                name: "Choose Spice Level",
                sub: "Required (must select)",
                items: [
                    { id: 1, name: "Level 1" },
                    { id: 2, name: "Level 2" },
                    { id: 3, name: "Level 3" },
                    { id: 4, name: "Level 4" }
                ]
            },
            extra: {
                name: "Extra toppings",
                sub: "Optional",
                items: [
                    { id: 1, name: "Pork Chashu", price: "4.00" },
                    { id: 2, name: "Sauteed Mushrooms", price: "3.00" },
                    { id: 3, name: "Extra Noodles", price: "3.00" }                                
                ]
            }
        },
        {
            id: 4,
            name: "Takoyaki",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "bites",
            options: {
            },
            extra: {
            }
        },
        {
            id: 5,
            name: "Tuna Crispy Rice",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "bites",
            options: {
            },
            extra: {
            }
        },
        {
            id: 6,
            name: "Kuro Edamame",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "bites",
            options: {
            },
            extra: {
            }
        },
        {
            id: 7,
            name: "Dumplings",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "bites",
            options: {
            },
            extra: {
            }
        },
        {
            id: 8,
            name: "Pork Bao Bun",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "starters",
            options: {
            },
            extra: {
            }
        },
        {
            id: 9,
            name: "Bao Chicken Bao Bao",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "starters",
            options: {
            },
            extra: {
            }
        },
        {
            id: 10,
            name: "Daikon Salad",
            description: "Shoyu mushroom broth, enoki, king trumpet, beech and oyster mushrooms, bamboo shoots, scallion, slow poached egg, seared tofu and aonori sesame.",
            price: "2.29",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "starters",
            options: {
            },
            extra: {
            }
        },
        {
            id: 11,
            name: "Asashi Dry",
            description: "Beer Beverage",
            price: "9.99",
            images: [
                { small: "images/products/small_pic.png", large: "images/products/large_pic.png" }
            ],
            category: "drinks",
            options: {
            },
            extra: {
            }
        }
    ]
}

export default products