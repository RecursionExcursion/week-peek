import { Component, input } from '@angular/core';

@Component({
  selector: 'bubble-icon',
  standalone: true,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="bubble">
      <circle cx="50" cy="50" [attr.r]="radius()" fill="none" stroke="#b3e5fc" stroke-width="2" opacity="0.6"/>
      <circle cx="45" cy="45" r="3" fill="#b3e5fc" opacity="0.4"/>
      <circle cx="55" cy="50" r="2" fill="#b3e5fc" opacity="0.3"/>
    </svg>
  `,
})
export class BubbleIcon {
  size = input<number>(40);
  radius = input<number>(20);
}

