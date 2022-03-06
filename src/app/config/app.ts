import { InjectionToken } from '@angular/core'
import { SideMenuItem } from '@shared/types'
import { EXERCISES, HOME, SETTINGS } from './routes'

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
    linkUrl: HOME,
    icon: 'house'
  },
  {
    i18nTitle: 'Menu.Exercises',
    linkUrl: EXERCISES,
    icon: 'dumbbell'
  },
  {
    i18nTitle: 'Menu.Workouts',
    linkUrl: 'workouts',
    icon: 'clipboard-list'
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
    linkUrl: SETTINGS,
    icon: 'wrench'
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
