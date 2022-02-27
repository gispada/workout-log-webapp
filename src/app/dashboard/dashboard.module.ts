import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@shared/shared.module'
import { DashboardComponent } from './dashboard.component'

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}
