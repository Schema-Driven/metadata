import { Component, Input } from '@angular/core'
import { User } from '@schema-driven/web/core/data-access'

@Component({
  selector: 'ui-stacked-simple',
  template: `
    <header
      class="flex-none relative text-sm leading-6 font-medium dark:bg-gray-600 text-gray-900 dark:text-gray-300 dark:ring-white ring-1 ring-gray-900 ring-opacity-5 shadow-sm py-5"
    >
      <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-28 flex items-center ">
        <a href="/components" class="flex-none">
          <img *ngIf="logo" [attr.src]="logo" [attr.loading]="'lazy'" class="h-12" alt="App Logo" />
        </a>
        <div class="ml-auto flex items-center">
          <ng-container *ngFor="let link of profileLinks">
            <a class="hidden sm:block hover:text-gray-900 mx-4" [routerLink]="link.route">
              {{ link.label }}
            </a>
          </ng-container>
        </div>
        <div class="relative sm:border-l -mr-1.5 sm:ml-2 sm:mr-0 sm:pl-6 border-gray-200">
          <button type="button" class="font-medium flex items-center" aria-expanded="true" (click)="openMenu()">
            <span class="hidden sm:flex items-center">
              <img *ngIf="user?.avatarUrl" class="h-8 w-8 rounded-full" [src]="user?.avatarUrl" alt="not found" />
              <svg width="8" height="6" fill="none" class="ml-2.5 text-gray-400">
                <path
                  d="M7 1.5l-3 3-3-3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
            <span class="flex sm:hidden -my-1 w-8 h-8 rounded-lg items-center justify-center">
              <svg width="20" height="20" fill="none">
                <path
                  d="M3.75 4.75h12.5M3.75 9.75h12.5M3.75 14.75h12.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div
        *ngIf="showMenu"
        class="absolute top-full right-32 w-60 -mr-0.2 sm:-mr-3.5 bg-white rounded-lg shadow-md ring-1 ring-gray-900 ring-opacity-5 font-normal text-sm text-gray-900 divide-y divide-gray-100"
      >
        <p class="py-3 px-3.5 truncate">
          <span class="block mb-0.5 text-xs text-gray-500">Signed in as</span>
          <span class="font-semibold">{{ user?.email }}</span>
        </p>
        <div class="py-1.5 px-3.5">
          <!-- Menu or icons -->
        </div>
      </div>
    </header>
    <main class="flex-1 h-full overflow-auto bg-white dark:bg-gray-900">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class WebUiStackedSimpleComponent {
  public showMenu = false
  @Input() notificationsLink?: string
  @Input() user?: User
  @Input() links: { label: string; route: string }[] = []
  @Input() profileLinks: { label: string; route: string }[] = []
  @Input() logo: string

  openMenu() {
    this.showMenu = !this.showMenu
  }
}
