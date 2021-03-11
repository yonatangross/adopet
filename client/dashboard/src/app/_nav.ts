import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    name: "Pets",
    url: "/pets",
    icon: "cil-dog",
    children: [
      {
        name: "Overview",
        url: "/pets/",
        icon: "icon-cursor",
      },
      {
        name: "Create Pet",
        url: "/pets/create",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Adoptions Requests",
    url: "/adoption-requests/",
    icon: "icon-cursor",
    children: [
      {
        name: "Overview",
        url: "/adoption-requests/",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Adoptions",
    url: "/adoptions-info/",
    icon: "icon-cursor",
    children: [
      {
        name: "Overview",
        url: "/adoptions-info/",
        icon: "icon-cursor",
      },
      {
        name: "Create",
        url: "/adoptions-info/create",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
];
