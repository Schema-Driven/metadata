import { Component } from '@angular/core'

@Component({
  template: `
    <ui-main-page headerTitle="Admin" [links]="links">
      <router-outlet></router-outlet>
    </ui-main-page>
  `,
})
export class WebAdminFeatureComponent {
  links = [
    { label: 'Dashboard', path: 'dashboard', icon: '' },
    { label: 'Tenants', path: 'tenants', icon: '' },
    { label: 'Users', path: 'users', icon: '' },
  ]
}
