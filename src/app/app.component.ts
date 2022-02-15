import { Component } from '@angular/core'
import { SideMenuItem } from '@shared/types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Workout Log'
  menu: SideMenuItem[] = [
    {
      title: 'Dashboard',
      linkUrl: '/',
      icon: 'house'
    },
    {
      title: 'Workouts',
      linkUrl: 'workouts',
      icon: 'dumbbell'
    },
    {
      title: 'Log',
      linkUrl: 'log',
      icon: 'calendar-days'
    },
    {
      title: 'Statistics',
      linkUrl: 'statistics',
      icon: 'line-chart'
    },
    {
      title: 'Settings',
      linkUrl: 'settings',
      icon: 'gear'
    }
  ]
}
