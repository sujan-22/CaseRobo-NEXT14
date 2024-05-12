// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-90
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "@/config/products";

export const COLOUR = [
    {
        label: "Black",
        value: "black",
        tw: "zinc-900",
    },
    {
        label: "Blue",
        value: "blue",
        tw: "blue-950",
    },
    {
        label: "Red",
        value: "rose",
        tw: "rose-950",
    },
] as const;

export const MODELS = {
    name: "models",
    options: [
        {
            label: "iPhone X",
            value: "iphonex",
        },
        {
            label: "iPhone 12",
            value: "iphone12",
        },
        {
            label: "iPhone 11",
            value: "iphone11",
        },
        {
            label: "iPhone 13",
            value: "iphone13",
        },
        {
            label: "iPhone 14",
            value: "iphone14",
        },
        {
            label: "iPhone 15",
            value: "iphone15",
        },
    ],
} as const;

export const MATERIALS = {
    name: "material",
    options: [
        {
            label: "Silicone",
            value: "silicone",
            description:
                "Flexible and durable material suitable for everyday use.",
            price: PRODUCT_PRICES.material.silicone,
        },
        {
            label: "Matte",
            value: "matte",
            description: "Smooth and non-reflective finish for a sleek look.",
            price: PRODUCT_PRICES.material.matte,
        },
        {
            label: "Glossy",
            value: "glossy",
            description:
                "Shiny and reflective finish for a polished appearance.",
            price: PRODUCT_PRICES.material.glossy,
        },
    ],
} as const;

export const FINISHES = {
    name: "finish",
    options: [
        {
            label: "Smooth",
            value: "smooth",
            description:
                "Smooth finish provides a sleek and glossy appearance, enhancing the phone's aesthetics.",
            price: PRODUCT_PRICES.finish.smooth,
        },
        {
            label: "Textured",
            value: "textured",
            description:
                "Textured finish provides a unique tactile feel and adds grip to the phone case.",
            price: PRODUCT_PRICES.finish.textured,
        },
        {
            label: "Metallic",
            value: "metallic",
            description:
                "Metallic finish adds a glossy and reflective appearance with metallic shimmer.",
            price: PRODUCT_PRICES.finish.metallic,
        },
        {
            label: "Frosted",
            value: "frosted",
            description:
                "Frosted finish offers a smooth and matte appearance, reducing fingerprints and smudges.",
            price: PRODUCT_PRICES.finish.frosted,
        },
    ],
} as const;
