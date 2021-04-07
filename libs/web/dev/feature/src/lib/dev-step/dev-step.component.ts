import { Component } from '@angular/core'
import { DevStepStore } from './dev-step.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="p-4 shadow rounded-lg bg-gray-100 dark:bg-gray-800">
        <pre class="text-xs dark:text-gray-500">{{ vm.items | json }}</pre>
      </div>
      <code class="text-xs px-2 py-1 dark:bg-gray-800 rounded-md opacity-70">
        Component: libs/web/dev/feature/src/lib/dev-step/dev-step.component.ts
      </code>
    </ng-container>
  `,
  providers: [DevStepStore],
})
export class DevStepComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: DevStepStore) {}
}
