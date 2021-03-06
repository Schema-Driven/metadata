import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { WebUiCodeModule } from '@schema-driven/web/ui/code'
import { WebUiPreviewComponent } from './web-ui-preview.component'
import { WebUiPageModule } from '@schema-driven/web/ui/page'
import { WebUiIconModule } from '@schema-driven/web/ui/icon'
import { WebUiButtonModule } from '@schema-driven/web/ui/button'

@NgModule({
  imports: [CommonModule, RouterModule, WebUiCodeModule, WebUiPageModule, WebUiIconModule, WebUiButtonModule],
  declarations: [WebUiPreviewComponent],
  exports: [WebUiPreviewComponent],
})
export class WebUiPreviewModule {}
