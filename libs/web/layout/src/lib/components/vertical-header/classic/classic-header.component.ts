import { Component, Input } from '@angular/core'
import { User } from '@schema-driven/web/core/data-access'

@Component({
  selector: 'classic-header-layout',
  template: `
    <div id="header">
      <aside
        class="hidden w-64 text-gray-900 leading-6 bg-indigo-700 fixed inset-y-0 overflow-x-hidden overflow-y-auto sm:block ring-2 ring-black ring-opacity-5"
      >
        <div class="p-3 flex justify-center">
          <a href="/components" class="mt-3">
            <img *ngIf="logo" [attr.src]="logo" [attr.loading]="'lazy'" class="h-10" alt="App Logo" />
          </a>
        </div>
        <div class="p-4">
          <!-- Extract: menu_items -->
          <div class="mt-4">
            <ng-container *ngFor="let link of profileLinks">
              <a
                [routerLink]="link.route"
                class="text-indigo-100 hover:bg-indigo-600 hover:text-white group flex items-center w-56  px-2 py-2 text-sm font-medium rounded-md"
              >
                <ui-icon
                  [icon]="link.icon"
                  size="lg"
                  class="text-indigo-300 group-hover:text-gray-300 h-8 w-8 mr-3 pt-1"
                ></ui-icon>
                {{ link.label }}
              </a>
            </ng-container>
          </div>
        </div>
      </aside>

      <section class="sm:pl-64 bg-white dark:bg-gray-600 dark:text-gray-300">
        <header class="flex-none w-full relative text-sm leading-6 font-medium py-5">
          <div class="px-4">
            <div class="flex justify-between">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <!-- <div class="relative -mr-1.5 sm:ml-2 sm:mr-0 sm:pl-6">
              right side
          </div> -->
            </div>
          </div>
        </header>
        <hr />
        <main class="flex-1 h-full overflow-auto dark:bg-gray-900">
          <router-outlet></router-outlet>
        </main>
      </section>
    </div>
  `,
})
export class ClassicHeaderComponent {
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