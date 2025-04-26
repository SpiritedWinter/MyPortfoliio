import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="about-container">
      <div class="content-wrapper">
        <div class="header-section">
          <h1 class="gradient-text">Contact Me</h1>
        </div>
        <div class="mission-statement">
          <p class="mission-text">
            Let's connect and explore opportunities together. I'm always excited to discuss new projects,
            share ideas, or just have a friendly conversation about technology and innovation.
          </p>
        </div>
        <div class="info-section">
          <div class="floating-container">
            <div class="hover-circle"></div>
            <h2 class="info-title">Email</h2>
          </div>
          <div class="floating-container">
            <div class="hover-circle"></div>
            <h2 class="info-title">LinkedIn</h2>
          </div>
          <div class="floating-container">
            <div class="hover-circle"></div>
            <h2 class="info-title">GitHub</h2>
          </div>
          <div class="floating-container">
            <div class="hover-circle"></div>
            <h2 class="info-title">Instagram</h2>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #000000;
      position: relative;
      padding: 2rem;
      border-radius: 25px;
      margin: 0 auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .content-wrapper {
      max-width: 1200px;
      width: 100%;
      padding: 0 20px;
      margin-top: 2rem;
    }

    .header-section {
      margin-bottom: 3rem;
    }

    .gradient-text {
      font-size: 3.5rem;
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
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .mission-statement {
      margin: 2rem 0;
      padding-bottom: 1rem;
    }

    .mission-text {
      font-size: 1.5rem;
      line-height: 1.6;
      color: #4B5563;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
    }

    .info-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-top: 2rem;
    }

    .floating-container {
      background: rgb(20, 20, 20);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.5s ease;
      position: relative;
      overflow: hidden;
      isolation: isolate;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100px;
      cursor: pointer;
    }

    .hover-circle {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      background: rgb(244, 241, 241);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.5s ease, height 0.5s ease;
      z-index: -1;
      pointer-events: none;
    }

    .floating-container:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }

    .floating-container:hover .hover-circle {
      width: 300%;
      height: 300%;
    }

    .floating-container:hover .info-title {
      color: #000000;
      transition: color 0.3s ease;
    }

    .info-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      line-height: 1.3;
      margin: 0;
      transition: all 0.3s ease;
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .floating-container:hover .info-title {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b);
      background-size: 300% 300%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: gradientText 3s ease infinite;
    }

    @keyframes gradientText {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `]
})
export class ContactComponent {} 