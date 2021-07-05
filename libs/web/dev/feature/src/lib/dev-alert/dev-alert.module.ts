import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiAlertModule } from '@schema-driven/web/ui/alert'
import { WebUiIconModule } from '@schema-driven/web/ui/icon'
import { DevAlertComponent } from './dev-alert.component'
import { WebUiPreviewModule } from '@schema-driven/web/ui/preview'
import { ServiceCodepreview } from '../../../../../ui/codepreview.service'

@NgModule({
  declarations: [DevAlertComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DevAlertComponent }]),
    WebUiAlertModule,
    WebUiPreviewModule,
    WebUiIconModule,
  ],
  exports: [DevAlertComponent],
  providers: [ServiceCodepreview],
})
export class DevAlertModule {}
