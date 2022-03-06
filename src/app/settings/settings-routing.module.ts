import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SETTINGS } from '@config/routes'
import { SettingsTabsComponent } from './components'

const routes: Routes = [
  {
    path: SETTINGS,
    component: SettingsTabsComponent // TODO: group settings in tabs or find another way?
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
