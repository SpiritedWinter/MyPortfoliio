import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  template: `
    <div class="menu-button" [class.active]="isSidebarOpen" (click)="toggleSidebar()">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <div class="layout-container">
      <nav class="navigation" [class.open]="isSidebarOpen">
        <div class="nav-content">
          <div class="nav-links">
            <a routerLink="/home" routerLinkActive="active" (click)="closeSidebar()">Home</a>
            <a routerLink="/about" routerLinkActive="active" (click)="closeSidebar()">About</a>
            <a routerLink="/skills" routerLinkActive="active" (click)="closeSidebar()">My Skills</a>
            <a routerLink="/work" routerLinkActive="active" (click)="closeSidebar()">Work</a>
            <a routerLink="/contact" routerLinkActive="active" (click)="closeSidebar()">Contact</a>
            <a routerLink="/blog" routerLinkActive="active" (click)="closeSidebar()" class="highlight">Blog</a>
          </div>

          <div class="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </nav>

      <div class="overlay" [class.active]="isSidebarOpen" (click)="closeSidebar()"></div>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .menu-button {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1100;
      width: 24px;
      height: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s ease;
    }

    .menu-button .bar {
      width: 100%;
      height: 2px;
      background-color: #ffffff;
      transition: all 0.3s ease;
    }

    .menu-button.active {
      transform: translateX(180px);
    }

    .menu-button.active .bar:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }

    .menu-button.active .bar:nth-child(2) {
      opacity: 0;
    }

    .menu-button.active .bar:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    .layout-container {
      display: flex;
      min-height: 100vh;
    }

    .navigation {
      width: 180px;
      height: 100vh;
      background: #000000;
      position: fixed;
      left: -180px;
      top: 0;
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      transition: transform 0.3s ease;
      z-index: 1000;
    }

    .navigation.open {
      transform: translateX(180px);
    }

    .main-content {
      flex: 1;
      min-height: 100vh;
      margin-left: 0;
      transition: margin-left 0.3s ease;
    }

    .nav-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 4rem;
      justify-content: space-between;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .navigation a {
      color: #ffffff;
      text-decoration: none;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      font-weight: 400;
      padding: 0.6rem 1.5rem;
      transition: all 0.3s ease;
      opacity: 0.7;
      letter-spacing: 0.5px;
    }

    .navigation a:hover,
    .navigation a.active {
      opacity: 1;
      background: rgba(255, 255, 255, 0.05);
    }

    .navigation a.highlight {
      color: #00f2ea;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      padding: 2rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: auto;
    }

    .social-links a {
      color: #ffffff;
      font-size: 1.1rem;
      padding: 0.5rem;
      opacity: 0.7;
      transition: all 0.3s ease;
    }

    .social-links a:hover {
      opacity: 1;
      color: #00f2ea;
      background: none;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .overlay.active {
      opacity: 1;
      visibility: visible;
    }

    :host {
      display: block;
      min-height: 100vh;
      background: #000000;
      margin: 0;
      padding: 0;
    }

    @media (max-width: 768px) {
      .navigation {
        width: 150px;
        left: -150px;
      }

      .navigation.open {
        transform: translateX(150px);
      }

      .menu-button.active {
        transform: translateX(150px);
      }

      .navigation a {
        font-size: 0.8rem;
        padding: 0.5rem 1.2rem;
      }

      .social-links {
        padding: 1.5rem 0;
        gap: 1rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'JaskaranSohalPortfolio';
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
