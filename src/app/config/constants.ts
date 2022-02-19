import { SideMenuItem } from '@shared/types'

export const languages = [
  {
    full: 'English',
    short: 'EN',
    key: 'en'
  },
  {
    full: 'Italiano',
    short: 'IT',
    key: 'it'
  }
]

export const defaultLanguage = 'en'

export const menuItems: SideMenuItem[] = [
  {
    i18nTitle: 'Menu.Dashboard',
    linkUrl: '/',
    icon: 'house'
  },
  {
    i18nTitle: 'Menu.Workouts',
    linkUrl: 'workouts',
    icon: 'dumbbell'
  },
  {
    i18nTitle: 'Menu.Logs',
    linkUrl: 'log',
    icon: 'calendar-days'
  },
  {
    i18nTitle: 'Menu.Statistics',
    linkUrl: 'statistics',
    icon: 'line-chart'
  },
  {
    i18nTitle: 'Menu.Settings',
    linkUrl: 'settings',
    icon: 'gear'
  }
]
