import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1 class="greeting">Hello there</h1>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
      margin: 0;
      padding: 0;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .greeting {
      font-family: 'Inter', sans-serif;
      font-size: 4rem;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
      animation: fadeIn 1.5s ease-out;
      letter-spacing: -0.02em;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class AppComponent {
  title = 'portfolio';
}
