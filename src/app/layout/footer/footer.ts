// src/app/layout/footer/footer.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer text-center text-white-50 small py-2">
      GymAffiliate Manager &copy; {{ year }}
    </footer>
  `,
  styles: [`
    .app-footer {
      background: #0a0a0a;
      border-top: 1px solid #2c2c2c;
    }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}