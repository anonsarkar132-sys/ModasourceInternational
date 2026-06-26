export interface INavbarItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

export interface INavbar {
  items: INavbarItem[];
}