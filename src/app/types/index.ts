import { CartItem } from "@prisma/client";

export type MainNav = {
    title: string;
    href: string;
    description?: string;
    items?: NavItem[];
}
export type NavItem = {
    title: string;
    href: string;
    description?: string;
    items?: NavItem[];
}

export type AdminNav = {
    title: string;
    href: string;
    icon: string;
}

export type UserCart = {
    id: string;
    items: CartItem[];
};