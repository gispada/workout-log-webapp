import { InjectionToken } from '@angular/core'
import { SideMenuItem } from '@shared/types'

const languages = [
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

const menuItems: SideMenuItem[] = [
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

// Static app configuration
export const appConfig = Object.freeze({
  logoUrl: '../../assets/logo.svg',
  title: 'Workout Log Webapp',
  defaultLanguage: 'en',
  languages,
  menuItems
})

export type AppConfig = typeof appConfig

export const APP_CONFIG = new InjectionToken<AppConfig>('App config token')
