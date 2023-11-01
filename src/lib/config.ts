import { MainNav } from "@/app/types";

export const navData = [
    {
      title: "Stores",
      href: "/stores",
    },
    {
      title: "Brands",
      href: "/brands",
      
    },
    {
        title: "Clothing",
        href: "/categories/clothing",
        items: [
            {
                title: "Hoodies",
                href: "/categories/clothing/hoodies",
            },
            {
                title: "T-Shirts",
                href: "/categories/clothing/t-shirts",
                description: "The most comfortable t-shirts you'll ever wear.",

            },
            {
                title: "Jackets",
                href: "/categories/clothing/jackets",
                

            },
            {
                title: "Pants",
                href: "/categories/clothing/pants",

            },
            {
                title: "Shorts",
                href: "/categories/clothing/shorts",

            },
            {
                title: "Sweaters",
                href: "/categories/clothing/sweaters",

            },
            {
                title: "Shirts",
                href: "/categories/clothing/shirts",

            },
            {
                title: "Suits",
                href: "/categories/clothing/suits",

            },
            {
                title: "Traditional",
                href: "/categories/clothing/traditional",

            },
            {
                title: "Accessories",
                href: "/categories/clothing/accessories",

            },
        ],
      },
      {
        title: "Accessories",
        href: "/categories/Accessories",
        items:[
            {
                title: "Bags",
                href: "/categories/accessories/bags",
            },
            {
                title: "Belts",
                href: "/categories/accessories/belts",
            },
            {
                title: "Glasses",
                href: "/categories/accessories/glasses",
            },
            {
                title: "Hats",
                href: "/categories/accessories/hats",
            },
            {
                title: "Jewelry",
                href: "/categories/accessories/jewelry",
            },
        ],
        
      },
    
  ] satisfies MainNav[]