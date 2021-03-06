import { Component, Input } from '@angular/core'
import { Tenant } from '@schema-driven/web/core/data-access'

@Component({
  selector: 'admin-tenant-table',
  template: `
    <div class="shadow overflow-hidden sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Name
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-50 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
          <ng-container *ngFor="let tenant of tenants">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" [attr.src]="'assets/images/logo.png'" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-gray-200">
                      <a [routerLink]="tenant.id">
                        {{ tenant.name }}
                      </a>
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ tenant.id }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a [routerLink]="[tenant.id, 'edit']" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
})
export class TenantTableComponent {
  @Input() tenants: Tenant[]
}
