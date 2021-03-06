import { Component, Input } from '@angular/core'
import { User } from '@schema-driven/web/core/data-access'

@Component({
  selector: 'ui-sidebar-thin',
  styles: [
    `
      .aside-scrollbar::-webkit-scrollbar {
        width: 8px;
      }

      .aside-scrollbar::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
      }

      .aside-scrollbar::-webkit-scrollbar-thumb {
        background: var(--theme-color-400) !important;
        border-radius: 12px;
      }

      .aside-scrollbar::-webkit-scrollbar-thumb:hover {
        background: var(--theme-color-300) !important;
      }
    `,
  ],
  template: `
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="h-screen flex bg-gray-50 overflow-hidden">
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
      <div class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true" *ngIf="mobileSideBar">
        <!--
            Off-canvas menu overlay, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

        <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
              From: "-translate-x-full"
              To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
              From: "translate-x-0"
              To: "-translate-x-full"
          -->
        <div class="relative flex-1 flex flex-col max-w-xs w-full theme-bg-600 dark:theme-bg-900 focus:outline-none">
          <!--
            Close button, show/hide based on off-canvas menu state.

            Entering: "ease-in-out duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "ease-in-out duration-300"
              From: "opacity-100"
              To: "opacity-0"
          -->
          <div class="absolute top-0 right-0 -mr-12 pt-4">
            <button
              type="button"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Close sidebar</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                (click)="mobileSideBar = false"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mt-5 flex-1 h-0 overflow-y-auto aside-scrollbar">
            <div class="flex items-center flex-shrink-0 px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <nav aria-label="Sidebar" class="mt-5">
              <div class="mt-4">
                <ng-container *ngFor="let link of profileLinks">
                  <div class="relative group">
                    <div class="p-3 my-3 font-bold theme-bg-500 rounded-md">
                      <p class="uppercase text-gray-100 text-sm">{{ link.title }}</p>
                      <p class="capitalize text-gray-200 text-xs">{{ link.subTitle }}</p>
                    </div>
                    <ng-container *ngFor="let child of link.childs">
                      <a
                        [routerLink]="child.route"
                        class="text-indigo-100 relative hover:theme-bg-400 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        (click)="child.dropDown = !child.dropDown"
                      >
                        <ui-icon
                          [icon]="child.icon"
                          size="lg"
                          class="text-indigo-300 group-hover:text-gray-300 h-8 w-8 mr-3 pt-1"
                        ></ui-icon>
                        {{ child.label }}
                        <span class="absolute right-2" *ngIf="child.children">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5l7 7-7 7"
                              *ngIf="!child.dropDown"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                              *ngIf="child.dropDown"
                            />
                          </svg>
                        </span>
                      </a>

                      <div *ngIf="child.dropDown" class="theme-bg-500 rounded-md my-1">
                        <ng-container *ngFor="let children of child.children">
                          <a
                            (click)="children.dropDown = !children.dropDown"
                            [routerLink]="children.route"
                            class="text-indigo-100 hover:theme-bg-400 pl-12 hover:text-white group flex items-center w-full py-2 text-sm font-medium rounded-md"
                          >
                            &nbsp;{{ children.label }}
                            <span class="absolute right-2" *ngIf="children.children">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 5l7 7-7 7"
                                  *ngIf="!children.dropDown"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                  *ngIf="children.dropDown"
                                />
                              </svg>
                            </span>
                          </a>
                          <div *ngIf="children.dropDown" class="theme-bg-300 rounded-md">
                            <a
                              *ngFor="let subChildren of children.children"
                              [routerLink]="subChildren.route"
                              class="text-indigo-100 hover:theme-bg-400 pl-14 hover:text-white group flex items-center w-full py-2 text-sm font-medium rounded-md"
                            >
                              &nbsp;{{ subChildren.label }}
                            </a>
                          </div>
                        </ng-container>
                      </div>
                    </ng-container>
                  </div>
                </ng-container>
              </div>
            </nav>
          </div>
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p class="text-base font-medium text-white group-hover:text-gray-900">Emily Selman</p>
                  <p class="text-sm font-medium text-white group-hover:text-gray-700">Account Settings</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <span (clickOutside)="compact.show = false; this.compact.index = null">
        <div class="hidden lg:flex lg:flex-shrink-0">
          <div class="flex flex-col w-20 h-screen">
            <div class="flex flex-col h-0 flex-1 overflow-y-auto theme-bg-600 dark:theme-bg-900">
              <div class="flex-1 flex flex-col">
                <div class="flex-shrink-0 theme-bg-600 dark:theme-bg-900 py-4 flex items-center justify-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                    alt="Workflow"
                  />
                </div>
                <nav aria-label="Sidebar" class="py-6 flex flex-col items-center space-y-3">
                  <ng-container *ngFor="let link of profileLinks; index as i">
                    <a
                      (click)="compactChildren(link.childs, i)"
                      class="flex items-center p-4 rounded-lg text-indigo-100 hover:theme-bg-300 hover:text-white cursor-pointer"
                      [ngClass]="i == compact.index && 'theme-bg-700'"
                    >
                      <ui-icon [icon]="link.icon" size="lg" class="dark:text-white h-6 w-6"></ui-icon>
                      <span class="sr-only"> {{ link.title }}</span>
                    </a>
                  </ng-container>
                </nav>
              </div>
              <div class="flex-shrink-0 flex pb-5">
                <a href="#" class="flex-shrink-0 w-full">
                  <img
                    class="block mx-auto h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixqx=CSFCItvz2d&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="sr-only">
                    <p>Emily Selman</p>
                    <p>Account settings</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <aside
          *ngIf="compact.show"
          class="hidden aside-scrollbar transition-all ease-in-out duration-500 w-64 theme-bg-500 dark:theme-bg-800 fixed inset-y-0 left-{{
            asideWidth
          }} z-50 overflow-x-hidden overflow-y-auto md:block"
        >
          <div class="p-3">
            <!-- Extract: menu_items -->
            <div class="mt-4">
              <div class="relative group">
                <div class="theme-bg-500 rounded-md my-1">
                  <ng-container *ngFor="let children of subChildren">
                    <a
                      (click)="children.dropDown = !children.dropDown"
                      [routerLink]="children.route"
                      class="text-indigo-100 hover:theme-bg-400 pl-12 hover:text-white group flex items-center w-full py-2 text-sm font-medium rounded-md"
                    >
                      <ui-icon
                        [icon]="children.icon"
                        size="lg"
                        class="text-indigo-300 group-hover:text-gray-300 h-8 w-8 mr-3 pt-1"
                      ></ui-icon>
                      &nbsp;{{ children.label }}
                      <span class="absolute right-2" *ngIf="children.children">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                            *ngIf="!children.dropDown"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                            *ngIf="children.dropDown"
                          />
                        </svg>
                      </span>
                    </a>
                    <div *ngIf="children.dropDown" class="theme-bg-300 rounded-md">
                      <ng-container *ngFor="let subChildrenLink of children.children">
                        <a
                          [routerLink]="subChildrenLink.route"
                          class="text-indigo-100 hover:theme-bg-400 pl-24 hover:text-white group flex items-center w-full py-2 text-sm font-medium rounded-md"
                          (click)="subChildrenLink.dropDown = !subChildrenLink.dropDown"
                        >
                          &nbsp;{{ subChildrenLink.label }}
                          <span class="absolute right-2" *ngIf="subChildrenLink.children">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                                *ngIf="!subChildrenLink.dropDown"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                                *ngIf="subChildrenLink.dropDown"
                              />
                            </svg>
                          </span>
                        </a>
                        <ng-container *ngIf="subChildrenLink.dropDown">
                          <a
                            *ngFor="let subChildrenLnkRoute of subChildrenLink.children"
                            [routerLink]="subChildrenLnkRoute.route"
                            class="text-indigo-100 hover:theme-bg-400 pl-32 hover:text-white group flex items-center w-full py-2 text-sm font-medium rounded-md"
                          >
                            &nbsp;{{ subChildrenLnkRoute.label }}
                          </a>
                        </ng-container>
                      </ng-container>
                    </div>
                  </ng-container>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </span>

      <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        <!-- Mobile top navigation -->
        <div class="lg:hidden">
          <div class="bg-indigo-600 py-2 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            <div>
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt="Workflow"
              />
            </div>
            <div>
              <button
                type="button"
                (click)="mobileSideBar = true"
                class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-indigo-600 rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="sr-only">Open sidebar</span>
                <!-- Heroicon name: outline/menu -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <main class="flex-1 h-full overflow-auto bg-white dark:bg-gray-900">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class WebUiSidebarThinComponent {
  public showMenu = false
  public asideWidth: number = 20
  public subChildren: any
  public compact = {
    show: false,
    index: null,
  }
  public mobileSideBar: boolean = false

  @Input() notificationsLink?: string
  @Input() user?: User
  @Input() links: { label: string; route: string }[] = []
  @Input() profileLinks: { label: string; route: string }[] = []
  @Input() logo: string

  openMenu() {
    this.showMenu = !this.showMenu
  }
  asideBarWith() {
    if (this.asideWidth == 20) {
      this.asideWidth = 0
    } else {
      this.asideWidth = 20
    }
  }

  compactChildren(subChilds, index) {
    if (this.compact.index === index) {
      this.compact.show = false
      this.compact.index = null
      this.asideWidth = 0
    } else {
      this.compact.index = index
      this.subChildren = subChilds
      this.compact.show = true
      this.asideWidth = 20
    }
  }
}
