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
        icon: "cil-info",
      },
      {
        name: "Create Pet",
        url: "/pets/create",
        icon: "cil-plus",
      },
    ],
  },
  {
    name: "Adoptions Requests",
    url: "/adoption-requests/",
    icon: "cil-clipboard",
    children: [
      {
        name: "Overview",
        url: "/adoption-requests/",
        icon: "cil-info",
      },
    ],
  },
  {
    name: "Adoptions",
    url: "/adoptions-info/",
    icon: "cil-paw",
    children: [
      {
        name: "Overview",
        url: "/adoptions-info/",
        icon: "cil-info",
      },
      {
        name: "Create",
        url: "/adoptions-info/create",
        icon: "cil-plus",
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
        icon: 'cil-input'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'cil-user-plus'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'cil-warning'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'cil-warning'
      }
    ]
  },
];
