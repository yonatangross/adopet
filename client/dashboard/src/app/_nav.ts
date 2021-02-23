import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Pets',
    url: '/pets',
    icon: 'cil-dog',
    children: [
      {
        name: 'Overview',
        url: '/pets/',
        icon: 'icon-cursor'
      },
      {
        name: 'Create Pet',
        url: '/pets/create',
        icon: 'icon-cursor'
      },
      {
        name: 'Edit Pet',
        url: '/pets/edit',
        icon: 'icon-cursor'
      },
    ]
  },
  {
    name: 'Adoptions Requests',
    url: '/adoption-requests/',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Overview',
        url: '/adoption-requests/',
        icon: 'icon-cursor'
      },
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
    url: '/adoptions-info/',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Overview',
        url: '/adoptions-info/',
        icon: 'icon-cursor'

      },
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
