import { Component, input } from '@angular/core';

@Component({
  selector: 'x-icon',
  standalone: true,
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    [attr.height]="height()"
    [attr.width]="width()"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-x-icon lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>`,
})
export class XIcon {
  height = input<number>(24);
  width = input<number>(24);
}
