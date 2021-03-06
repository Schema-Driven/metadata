import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiFormModule } from '@schema-driven/web/ui/form'
import { EntityFieldIconComponent } from './entity-field-icon.component'

@NgModule({
  declarations: [EntityFieldIconComponent],
  exports: [EntityFieldIconComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule],
})
export class EntityFieldIconModule {}
