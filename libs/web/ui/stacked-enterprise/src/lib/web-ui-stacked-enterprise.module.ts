import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ClickOutsideModule } from 'ng-click-outside'
import { WebUiStackedEnterpriseComponent } from './web-ui-stacked-enterprise.component'
import { WebUiIconModule } from '@schema-driven/web/ui/icon'
@NgModule({
  imports: [CommonModule, RouterModule, ClickOutsideModule, WebUiIconModule],
  declarations: [WebUiStackedEnterpriseComponent],
  exports: [WebUiStackedEnterpriseComponent],
})
export class WebUiStackedEnterpriseModule {}
