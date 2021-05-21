import { Component, Input } from '@angular/core'
import { User } from '@schema-driven/web/core/data-access'

@Component({
  selector: 'dense-header-layout',
  template: `
    <div id="header">
      <aside
        class="hidden w-{{
          asideWidth
        }} transition-all ease-in-out duration-500 hover:w-64 hover:z-10 text-gray-900 leading-6 bg-indigo-700 fixed inset-y-0 overflow-x-hidden overflow-y-auto sm:block ring-2 ring-black ring-opacity-5"
      >
        <div class="p-3 flex justify-between">
          <a href="/components" class="m-3">
            <img *ngIf="logo" [attr.src]="logo" [attr.loading]="'lazy'" class="h-10" alt="App Logo" />
          </a>
        </div>
        <div class="p-3 h-auto">
          <!-- Extract: menu_items -->
          <ng-container *ngFor="let link of profileLinks">
            <a
              [routerLink]="link.route"
              class="text-indigo-100 hover:bg-indigo-600 hover:text-white group flex items-center w-56  px-2 py-2 text-sm font-medium rounded-md"
            >
              <div
                class="mr-7 p-2"
                routerLinkActive="bg-indigo-600 bg-opacity-50"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <ui-icon
                  [icon]="link.icon"
                  size="lg"
                  class="text-indigo-300 group-hover:text-gray-300 h-8 w-8 pt-1 pl-1"
                ></ui-icon>
              </div>

              {{ link.label }}
            </a>
          </ng-container>
        </div>
      </aside>
      <section
        class="sm:pl-{{
          asideWidth
        }} transition-all ease-in-out duration-500 bg-white dark:bg-gray-600 dark:text-gray-300"
      >
        <header class="flex-none w-full relative text-sm leading-6 font-medium py-5">
          <div class="px-4">
            <div class="flex justify-between">
              <div class="flex">
                <div class="dark:hover:bg-gray-900 hover:bg-gray-300 hover:bg-opacity-50 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    (click)="sideBarWith()"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>

                <div class="dark:hover:bg-gray-900 hover:bg-gray-300 hover:bg-opacity-50 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    (click)="asideBarWith()"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
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
export class DenseHeaderComponent {
  public showMenu = false
  public asideWidth: number = 24

  @Input() notificationsLink?: string
  @Input() user?: User
  @Input() links: { label: string; route: string }[] = []
  @Input() profileLinks: { label: string; route: string }[] = []
  @Input() logo: string

  openMenu() {
    this.showMenu = !this.showMenu
  }

  asideBarWith() {
    if (this.asideWidth == 24) {
      this.asideWidth = 64
    } else {
      this.asideWidth = 24
    }
  }

  sideBarWith() {
    if (this.asideWidth == 24) {
      this.asideWidth = 0
    } else {
      this.asideWidth = 24
    }
  }
}
