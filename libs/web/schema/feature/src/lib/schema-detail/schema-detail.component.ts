import { Component, TemplateRef } from '@angular/core'
import { DialogService } from '@ngneat/dialog'
import {
  CreateSchemaEntityInput,
  CreateSchemaEnumInput,
  DataType,
  FieldType,
  KeyType,
} from '@schema-driven/web/core/data-access'
import { SchemaDetailStore } from './schema-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.errors">
        <pre class="bg-gray-300 text-red-800 rounded-md p-4">{{ vm.errors | json }}</pre>
      </ng-container>
      <ng-container *ngIf="!vm.errors">
        <ui-page-header
          [title]="'Schema Details: ' + vm?.schema?.name || ''"
          linkPath=".."
          linkTitle="Back"
        ></ui-page-header>

        <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside class="py-3 md:py-6 md:px-2 lg:py-0 lg:px-0 lg:col-span-3">
            <nav class="space-y-1 md:space-y-3">
              <div class="space-y-1 md:space-y-3">
                <div
                  class="dark:bg-gray-800 dark:text-gray-400 text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center justify-between font-medium"
                >
                  <span class="truncate"> Entities </span>
                  <button class="flex items-center space-x-1" (click)="openDialog(addEntityTmpl)">
                    <ui-icon icon="plusCircle"></ui-icon>
                    <span class="text-sm">Add</span>
                  </button>
                </div>
                <ng-container *ngFor="let entity of vm.schema?.entities">
                  <a
                    routerLinkActive="bg-gray-50 dark:bg-gray-700 text-pink-600 dark:text-pink-600 hover:bg-white"
                    [routerLink]="['entities', entity.id]"
                    class="dark:bg-gray-800 dark:text-gray-400 text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center font-medium"
                  >
                    <ui-icon icon="table"></ui-icon>
                    <span class="ml-2 truncate">
                      {{ entity.name }}
                    </span>
                  </a>
                </ng-container>
              </div>
              <div class="space-y-1 md:space-y-3">
                <div
                  class="dark:bg-gray-800 dark:text-gray-400 text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center justify-between font-medium"
                >
                  <span class="truncate"> Enums </span>
                  <button class="flex items-center space-x-1" (click)="openDialog(addEnumTmpl)">
                    <ui-icon icon="plusCircle"></ui-icon>
                    <span class="text-sm">Add</span>
                  </button>
                </div>
                <ng-container *ngFor="let item of vm.schema?.enums">
                  <a
                    routerLinkActive="bg-gray-50 dark:bg-gray-700 text-pink-600 dark:text-pink-600 hover:bg-white"
                    [routerLink]="['enums', item.id]"
                    class="dark:bg-gray-800 dark:text-gray-400 text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center font-medium"
                  >
                    <ui-icon icon="table"></ui-icon>
                    <span class="ml-2 truncate">
                      {{ item.name }}
                    </span>
                  </a>
                </ng-container>
              </div>
            </nav>
          </aside>

          <div class="md:px-2 lg:px-0 lg:col-span-9">
            <router-outlet></router-outlet>
          </div>
        </div>
      </ng-container>
    </ng-container>

    <ng-template #addEntityTmpl let-ref>
      <div class="flex-grow flex flex-col">
        <div class="text-lg font-semibold tracking-wider px-4 py-3">Add Entity</div>
        <div class="flex-grow">
          <entity-form (submitForm)="submitEntityForm($event); ref.close()">
            <ui-button (click)="ref.close()" label="Close"></ui-button>
          </entity-form>
        </div>
      </div>
    </ng-template>

    <ng-template #addEnumTmpl let-ref>
      <div class="flex-grow flex flex-col">
        <div class="text-lg font-semibold tracking-wider px-4 py-3">Add Enum</div>
        <div class="flex-grow">
          <enum-form [model]="{ values: ['Value'] }" (submitForm)="submitEnumForm($event); ref.close()">
            <ui-button (click)="ref.close()" label="Close"></ui-button>
          </enum-form>
        </div>
      </div>
    </ng-template>
  `,
  providers: [SchemaDetailStore],
})
export class SchemaDetailComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: SchemaDetailStore, private readonly dialog: DialogService) {}

  openDialog(tpl: TemplateRef<any>) {
    this.dialog.open(tpl)
  }

  submitEntityForm(input: CreateSchemaEntityInput) {
    this.store.createSchemaEntityEffect(input)
  }

  submitEnumForm(input: CreateSchemaEnumInput) {
    this.store.createSchemaEnumEffect(input)
  }

  selectType(type: string) {
    console.log(type)
  }
}
