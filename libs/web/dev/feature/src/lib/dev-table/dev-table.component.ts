import { Component } from '@angular/core'
import { DevTableStore } from './dev-table.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="flex flex-col space-y-6">
        <ng-container *ngFor="let demo of vm.demos">
          <div class="shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div class="bg-gray-200 dark:bg-gray-700 px-4 py-2 text-lg font-semibold flex justify-between">
              <div>{{ demo.label }}</div>
            </div>
            <div class="p-2">
              <div class="bg-gray-900 p-2 rounded-b-md">
                <ui-preview [code]="codePreview[0]">
                  <ui-table [cols]="demo.cols" [data]="demo.data"></ui-table>
                </ui-preview>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
  providers: [DevTableStore],
})
export class DevTableComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: DevTableStore) {}
  public codePreview = [`<ui-table [cols]="demo.cols" [data]="demo.data"></ui-table>`]
}
