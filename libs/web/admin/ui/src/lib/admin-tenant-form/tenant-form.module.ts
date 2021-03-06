import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@schema-driven/web/ui/button'
import { WebUiFormModule } from '@schema-driven/web/ui/form'
import { TenantFormComponent } from './tenant-form.component'

@NgModule({
  declarations: [TenantFormComponent],
  exports: [TenantFormComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule, WebUiButtonModule],
})
export class TenantFormModule {}
