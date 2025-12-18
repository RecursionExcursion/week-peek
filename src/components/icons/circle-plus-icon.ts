import { Component, input } from '@angular/core';

@Component({
  selector: 'circle-plus-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.height]="height()"
      [attr.width]="width()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle-plus-icon lucide-circle-plus"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  `,
})
export class CirclePlusIcon {
  height = input<number>(24);
  width = input<number>(24);
}
