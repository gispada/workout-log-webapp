import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { WorkoutsRoutingModule } from './workouts-routing.module'
import { AppWorkoutsComponent } from './workouts.component'
import { WorkoutsListComponent } from './components'

@NgModule({
  declarations: [AppWorkoutsComponent, WorkoutsListComponent],
  imports: [CommonModule, SharedModule, WorkoutsRoutingModule, FormsModule],
  exports: []
})
export class WorkoutsModule {}
