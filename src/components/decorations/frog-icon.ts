import { Component } from '@angular/core';

@Component({
  selector: 'frog-icon',
  standalone: true,
  template: `
    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Frog body -->
      <ellipse cx="50" cy="60" rx="30" ry="25" fill="#81c784" stroke="#2c2c2c" stroke-width="1.5"/>
      <!-- Frog head -->
      <ellipse cx="50" cy="40" rx="28" ry="22" fill="#81c784" stroke="#2c2c2c" stroke-width="1.5"/>
      <!-- Left eye -->
      <circle cx="35" cy="35" r="8" fill="#fff" stroke="#2c2c2c" stroke-width="1.5"/>
      <circle cx="35" cy="35" r="5" fill="#2c2c2c"/>
      <circle cx="36" cy="34" r="1.5" fill="#fff"/>
      <!-- Right eye -->
      <circle cx="65" cy="35" r="8" fill="#fff" stroke="#2c2c2c" stroke-width="1.5"/>
      <circle cx="65" cy="35" r="5" fill="#2c2c2c"/>
      <circle cx="66" cy="34" r="1.5" fill="#fff"/>
      <!-- Smile -->
      <path d="M 40 50 Q 50 55 60 50" stroke="#2c2c2c" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Spots -->
      <circle cx="45" cy="65" r="3" fill="#66bb6a"/>
      <circle cx="55" cy="70" r="2.5" fill="#66bb6a"/>
      <circle cx="60" cy="60" r="2" fill="#66bb6a"/>
    </svg>
  `,
})
export class FrogIcon {}

