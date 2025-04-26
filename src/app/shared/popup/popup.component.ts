import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-overlay" [class.active]="isOpen" (click)="onOverlayClick($event)">
      <div class="popup-content" [class.active]="isOpen">
        <button class="close-button" (click)="close()">×</button>
        <div class="popup-header">
          <h2 class="gradient-text">{{ title }}</h2>
        </div>
        <div class="popup-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .popup-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .popup-content {
      background: #000000;
      border: 2px solid #444;
      border-radius: 20px;
      padding: 2rem;
      max-width: 1000px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      transform: translateY(-20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .popup-content.active {
      transform: translateY(0);
      opacity: 1;
    }

    .popup-header {
      margin-bottom: 1.5rem;
      text-align: left;
      padding-left: 1.5rem;
    }

    .gradient-text {
      font-size: 2rem;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
      line-height: 1.2;
      background: linear-gradient(
        90deg,
        #8B5CF6,
        #EC4899,
        #3B82F6,
        #8B5CF6
      );
      background-size: 300% 300%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: gradient 8s linear infinite;
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #ffffff;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
      transition: all 0.3s ease;
      opacity: 0.7;
    }

    .close-button:hover {
      opacity: 1;
      transform: rotate(90deg);
    }

    .popup-body {
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .popup-content {
        width: 95%;
        padding: 1.5rem;
      }

      .gradient-text {
        font-size: 1.5rem;
      }
    }
  `]
})
export class PopupComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() closePopup = new EventEmitter<void>();

  close() {
    this.closePopup.emit();
  }

  onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('popup-overlay')) {
      this.close();
    }
  }
} 