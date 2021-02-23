import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Pets',
    url: '/pets',
    icon: 'cil-dog',
    children: [
      {
        name: 'Create Pet',
        url: '/pets/create',
        icon: 'icon-cursor'
      },
      {
        name: 'Edit Pet',
        url: '/pets/update',
        icon: 'icon-cursor'
      },
    ]
  },
  {
    name: 'Adoptions Requests',
    url: '/adoption-requests',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Create',
        url: '/adoption-requests/create',
        icon: 'icon-cursor'
      },
      {
        name: 'Update',
        url: '/adoption-requests/edit',
        icon: 'icon-cursor'
      },
    ]
  },
  {
    name: 'Adoptions',
    url: '/adoptions-info',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Create',
        url: '/adoptions-info/create',
        icon: 'icon-cursor'
      },
      {
        name: 'Edit',
        url: '/adoptions-info/edit',
        icon: 'icon-cursor'
      },
    ]
  },
];
