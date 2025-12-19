import { Component, input } from '@angular/core';

@Component({
  selector: 'check-icon',
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
    class="lucide lucide-check-icon lucide-check"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg> `,
})
export class CheckIcon {
  height = input<number>(24);
  width = input<number>(24);
}
