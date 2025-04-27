import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { TrexGameComponent } from '../game/trex-game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TrexGameComponent],
  template: `
    <div class="home-container" (click)="onContainerClick($event)">
      <a [routerLink]="hoverCount >= 2 ? '/skills' : null" 
         class="skills-button" 
         (mouseenter)="onSkillsButtonHover()" 
         (click)="onSkillsButtonClick($event)"
         [class.position-1]="buttonPosition === 1 && hoverCount < 2" 
         [class.position-2]="buttonPosition === 2 && hoverCount < 2" 
         [class.position-3]="buttonPosition === 3 && hoverCount < 2"
         [class.catchable]="hoverCount >= 2"
         [class.hide-skills]="isGameStarted">
         Skills {{ hoverCount >= 2 ? '(Caught me!)' : '' }}
      </a>
      <div class="code-wrapper" [class.fade-out]="isGameStarted">
        <div class="intro-block">
          <ng-container *ngIf="!isMobile">
            <pre class="code-syntax"><span class="keyword">static void</span> <span class="method">Main</span>() {{ '{' }}</pre>
            <pre class="code-syntax indent"><span class="class">Console</span>.<span class="method">WriteLine</span>(<span class="string">\"Press SPACE to play T-Rex Game\"</span>);</pre>
          </ng-container>
          <div class="content-wrapper" [class.hide-content]="isGameStarted">
            <div class="intro-text">
              <h1>
                <span class="text-line line1" [class.slide-up]="isGameStarted">Hi,</span><br>
                <span class="text-line line2" [class.slide-up]="isGameStarted">I'm <span class="gradient-text">Jaskaran</span>,</span><br>
                <span class="text-line line3" [class.slide-up]="isGameStarted">Product Developer</span>
              </h1>
              <p class="subtitle text-line line4" [class.slide-up]="isGameStarted">Full Stack Developer / Software Engineer</p>
              <a routerLink="/contact" class="contact-button text-line line5" [class.slide-up]="isGameStarted">Contact me!</a>
            </div>
          </div>
        </div>
        <ng-container *ngIf="!isMobile">
          <pre class="code-syntax">{{ '}' }}</pre>
        </ng-container>
      </div>
      <div class="game-section" [class.game-visible]="isGameStarted">
        <app-trex-game (gameStarted)="onGameStart()" #gameComponent></app-trex-game>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background-color: transparent;
      padding: 2rem;
      position: relative;
      cursor: pointer;
      overflow: hidden;
    }

    .code-wrapper {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
      opacity: 1;
      visibility: visible;
      transition: all 0.3s ease-out;
    }

    .code-wrapper.fade-out {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
    }

    .code-syntax {
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: #d4d4d4;
      margin: 0;
      line-height: 1.2;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0.1rem 1rem;
    }

    .code-syntax .keyword {
      color: #569cd6;  /* Visual Studio blue for keywords */
    }

    .code-syntax .method {
      color: #dcdcaa;  /* Visual Studio yellow for methods */
    }

    .code-syntax .class {
      color: #4ec9b0;  /* Visual Studio teal for classes */
    }

    .code-syntax.indent {
      margin-left: 2rem;
    }

    .content-wrapper {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      transition: all 0.5s ease;
    }

    .content-wrapper.hide-content {
      pointer-events: none;
    }

    .intro-text {
      padding: 2rem;
    }

    .text-line {
      display: inline-block;
      transform: translateY(0);
      opacity: 1;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .text-line.slide-up {
      transform: translateY(-100vh);
      opacity: 0;
    }

    .gradient-text {
      background: linear-gradient(90deg, #00f2ea, #ff2171);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      display: inline-block;
      animation: gradient-shift 8s linear infinite;
      background-size: 200% auto;
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .line1 { transition-delay: 0s; }
    .line2 { transition-delay: 0.1s; }
    .line3 { transition-delay: 0.2s; }
    .line4 { transition-delay: 0.3s; }
    .line5 { transition-delay: 0.4s; }

    h1 {
      font-family: 'Inter', sans-serif;
      font-size: 5rem;
      font-weight: 700;
      line-height: 1.1;
      color: #ffffff;
      margin: 0;
      padding: 0;
    }

    .subtitle {
      font-family: 'Fira Code', monospace;
      font-size: 1.2rem;
      color: #666666;
      margin-top: 1.5rem;
      margin-bottom: 2.5rem;
      display: block;
    }

    .contact-button {
      display: inline-block;
      padding: 0.8rem 2rem;
      font-family: 'Fira Code', monospace;
      font-size: 1rem;
      color: #00f2ea;
      border: 2px solid #00f2ea;
      background: transparent;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .contact-button:hover {
      background: rgba(0, 242, 234, 0.1);
    }

    .game-section {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc(-50% + 100vh));
      width: 100%;
      max-width: 1300px;
      opacity: 0;
      visibility: hidden;
      transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
      transition-delay: 0.5s;
    }

    .game-section.game-visible {
      transform: translate(-50%, -50%);
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.2rem;
      }
      .subtitle {
        font-size: 0.95rem;
        margin-top: 1rem;
        margin-bottom: 1.2rem;
      }
      .intro-text {
        padding: 1rem;
      }
      .skills-button {
        display: none !important;
      }
      .code-wrapper {
        max-width: 100vw;
        padding: 0 5px;
      }
      .content-wrapper {
        max-width: 100vw;
        padding: 0 5px;
      }
      .intro-block {
        gap: 0.3rem;
        margin-bottom: 1rem;
      }
    }
    @media (max-width: 480px) {
      h1 {
        font-size: 1.3rem;
      }
      .skills-button {
        font-size: 0.95rem;
        padding: 0.7rem 0.5rem;
        left: 5px;
        right: 5px;
        bottom: 10px;
      }
      .intro-text {
        padding: 0.5rem;
      }
      .subtitle {
        font-size: 0.8rem;
      }
    }

    .code-syntax .string {
      color: #ce9178;  /* Visual Studio orange for strings */
    }

    .skills-button {
      position: fixed;
      right: 300px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      padding: 1rem 2rem;
      font-family: 'Fira Code', monospace;
      font-size: 1rem;
      color: #00f2ea;
      border: 2px solid #00f2ea;
      background: transparent;
      text-decoration: none;
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
      pointer-events: auto;
    }

    .skills-button.catchable {
      background: rgba(0, 242, 234, 0.1);
    }

    .skills-button.position-1 {
      right: 500px;
      top: 50%;
      transform: translateY(-50%);
    }

    .skills-button.position-2 {
      right: 300px;
      top: 40%;
      transform: translateY(0);
    }

    .skills-button.position-3 {
      right: 300px;
      top: 60%;
      transform: translateY(0);
    }

    .skills-button.hide-skills {
      opacity: 0;
      pointer-events: none;
      transform: translateY(-200%) !important;
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .intro-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
  `]
})
export class HomeComponent {
  @ViewChild('gameComponent') gameComponent!: TrexGameComponent;
  isGameStarted = false;
  buttonPosition = 0;
  hoverCount = 0;
  isMobile = false;

  constructor(private router: Router) {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
      if (!this.isGameStarted) {
        this.isGameStarted = true;
      }
    }
  }

  onGameStart() {
    this.isGameStarted = true;
  }

  onContainerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'canvas') {
      return;
    }

    if (this.isGameStarted) {
      this.isGameStarted = false;
    }
  }

  onSkillsButtonClick(event: MouseEvent) {
    if (this.hoverCount < 2) {
      event.preventDefault();
      return;
    }
    // Redirect to About page
    this.router.navigate(['/about']);
    // Reset the state if button was caught
    this.buttonPosition = 0;
    this.hoverCount = 0;
  }

  onSkillsButtonHover() {
    if (this.hoverCount < 2) {
      this.buttonPosition = (this.buttonPosition + 1) % 4;
      if (this.buttonPosition === 0) {
        this.hoverCount++;
      }
    }
  }
}
