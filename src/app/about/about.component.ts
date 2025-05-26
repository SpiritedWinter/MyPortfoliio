import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PopupComponent } from '../shared/popup/popup.component';

interface WorkExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, PopupComponent],
  template: `
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <div class="about-container" [class.blur-background]="showPopup">
      <div class="content-wrapper">
        <div class="header-section">
          <h1 class="about-title">About Me</h1>
        </div>
        <div class="mission-statement">
          <p class="mission-text">
            I build modern software systems that automate tasks, integrate data, and streamline operations, 
            tailored to how businesses work in today's digital landscape.
          </p>
        </div>
        <div class="info-section">
          <div class="floating-container" (mouseenter)="setBoxHover(0, true)" (mouseleave)="setBoxHover(0, false)" (click)="openPopup('professional')">
            <div class="hover-circle"></div>
            <h2 class="info-title">Professional Journey</h2>
            <ng-container *ngIf="!boxHover[0]">
              <pre class="cs-code"><span class="cs-keyword">public class</span> <span class="cs-type">ProfessionalJourney</span>
{{ '{' }}
    <span class="cs-comment">// Product Developer at Epicor</span>
    <span class="cs-keyword">public string</span> <span class="cs-variable">Role</span> = <span class="cs-string">"Product Developer"</span>;
    <span class="cs-keyword">public string</span> <span class="cs-variable">Company</span> = <span class="cs-string">"Epicor"</span>;
    <span class="cs-keyword">public int</span> <span class="cs-variable">Years</span> = <span class="cs-number">2</span>;
{{ '}' }}</pre>
            </ng-container>
            <ng-container *ngIf="boxHover[0]">
              <p class="info-description">As a Product Developer at Epicor, I've spent the past 2 years working on cutting-edge software solutions. My focus is on developing robust, scalable applications that solve real-world business challenges.</p>
            </ng-container>
          </div>
          <div class="floating-container" (mouseenter)="setBoxHover(1, true)" (mouseleave)="setBoxHover(1, false)" (click)="openPopup('technical')">
            <div class="hover-circle"></div>
          <h2 class="info-title">Technical Expertise</h2>
            <ng-container *ngIf="!boxHover[1]">
              <pre class="cs-code"><span class="cs-keyword">public class</span> <span class="cs-type">TechnicalExpertise</span>
{{ '{' }}
    <span class="cs-comment">// Areas of expertise</span>
    <span class="cs-keyword">public string[]</span> <span class="cs-variable">Skills</span> = <span class="cs-string">{{ '{' }}"Full-stack web development", "Cloud-native applications", "User experience design", "Agile development practices"{{ '}' }}</span>;
{{ '}' }}</pre>
            </ng-container>
            <ng-container *ngIf="boxHover[1]">
              <p class="info-description">Specializing in modern web technologies, I bring expertise in:</p>
              <ul class="expertise-list">
                <li>Full-stack web development</li>
                <li>Cloud-native applications</li>
                <li>User experience design</li>
                <li>Agile development practices</li>
              </ul>
            </ng-container>
          </div>
          <div class="floating-container" (mouseenter)="setBoxHover(2, true)" (mouseleave)="setBoxHover(2, false)">
            <div class="hover-circle"></div>
            <h2 class="info-title">Vision & Values</h2>
            <ng-container *ngIf="!boxHover[2]">
              <pre class="cs-code"><span class="cs-keyword">public class</span> <span class="cs-type">VisionAndValues</span>
{{ '{' }}
    <span class="cs-comment">// Guiding principles</span>
    <span class="cs-keyword">public string</span> <span class="cs-variable">Principles</span> = <span class="cs-string">"Innovation, Quality, User-centric Design"</span>;
{{ '}' }}</pre>
            </ng-container>
            <ng-container *ngIf="boxHover[2]">
              <p class="info-description">At any workplace, my primary aim is to minimize manual effort involved in repetitive or complex tasks by leveraging automation, robust coding practices, and the power of Artificial Intelligence. I focus on building scalable, efficient solutions that not only streamline operations but also enhance overall productivity.</p>
            </ng-container>
          </div>
          <div class="floating-container" (mouseenter)="setBoxHover(3, true)" (mouseleave)="setBoxHover(3, false)" (click)="goToContact()">
            <div class="hover-circle"></div>
            <h2 class="info-title">Get in Touch</h2>
            <ng-container *ngIf="!boxHover[3]">
              <pre class="cs-code"><span class="cs-keyword">public class</span> <span class="cs-type">Contact</span>
{{ '{' }}
    <span class="cs-comment">// Open for collaboration</span>
    <span class="cs-keyword">public string</span> <span class="cs-variable">Message</span> = <span class="cs-string">"Let's work together!"</span>;
{{ '}' }}</pre>,
            </ng-container>
            <ng-container *ngIf="boxHover[3]">
              <p class="info-description">Interested in collaboration or opportunities? I'm always open to discussing new projects and ideas.</p>
            </ng-container>
          </div>
        </div>
      </div>
    </div>

    <app-popup 
      [isOpen]="showPopup" 
      [title]="popupTitle"
      (closePopup)="closePopup()">
      <ng-container [ngSwitch]="activePopup">
        <div *ngSwitchCase="'professional'" class="popup-section">
          <div class="journey-timeline">
            <div class="timeline-item" *ngFor="let experience of workExperiences; let idx = index">
              <div class="timeline-header">
                <h3 class="job-title">{{ experience.title }}</h3>
                <div class="company-info">
                  <div class="company-name">{{ experience.company }}</div>
                  <div class="location">📍 {{ experience.location }}</div>
                  <div class="period">{{ experience.period }}</div>
                </div>
              </div>
              <div class="timeline-content">
                <div class="tech-stack">
                  <span class="tech-tag" *ngFor="let tech of experience.technologies">{{ tech }}</span>
                </div>
                <div class="achievements-list">
                  <h4>Key Achievements</h4>
                  <ul *ngIf="experience.title === 'Product Developer'">
                    <li>
                      <span class="achievement-icon">🛠️</span>
                      <span>
                        Migrated a legacy Advanced MES application from MFC C++ to a modern full-stack solution using Next.js and NestJS.
                      </span>
                    </li>
                    <li>
                      <span class="achievement-icon">🚀</span>
                      <span>
                        Successfully transformed the entire application architecture, improving performance and maintainability.
                      </span>
                    </li>
                    <li>
                      <span class="achievement-icon">🗄️</span>
                      <span>
                        Built internal reusable modules and RESTful APIs using NestJS, implementing core design patterns such as Singleton, Factory, and Chain of Responsibility to enhance scalability and maintainability.
                      </span>
                    </li>
                    <li>
                      <span class="achievement-icon">🧪</span>
                      <span>
                        Designed and implemented an intelligent caching mechanism in NestJS to preload and serve data, significantly reducing API response times and improving performance for high latency user interfaces.
                      </span>
                    </li>
                    <li>
                      <span class="achievement-icon">🤖</span>
                      <span>
                        Developed comprehensive automated tests for NestJS services involved in the migration process, leveraging Playwright and GitHub Copilot to achieve over 80% code coverage across the codebase.
                      </span>
                    </li>
                    <li>
                      <span class="achievement-icon">🏆</span>
                      <span>
                        Refactored complex hierarchical datatypes into flat structures (nvarchar(25)) across SQL Server databases; optimized dependent procedures, views, and data models led to 80% reduction in memory consumption and 70% faster query execution time.
                      </span>
                    </li>
                  </ul>
                  <ul *ngIf="experience.title !== 'Product Developer'">
                    <li *ngFor="let achievement of experience.achievements; let i = index">
                      <span class="achievement-icon">🏅</span>
                      <span>{{ achievement }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div *ngSwitchCase="'technical'" class="popup-section">
          <div class="expertise-cards">
            <div class="expertise-card">
              <span class="expertise-icon">🛠️</span>
              <span>
                <b>Frameworks:</b>
                <span class="badge">Nest.js</span>
                <span class="badge">Next.js</span>
                <span class="badge">React.js</span>
                <span class="badge">DotNet</span>
                <span class="badge">MFC C++</span>
                <span class="badge">Playwright</span>
                <span class="badge">Angular</span>
                <span class="badge">MSTest</span>
                <span class="badge">MVC Razor Pages</span>
              </span>
            </div>
            <div class="expertise-card">
              <span class="expertise-icon">🗄️</span>
              <span>
                <b>Databases:</b>
                <span class="badge">SQL Server</span>
              </span>
            </div>
            <div class="expertise-card">
              <span class="expertise-icon">💻</span>
              <span>
                <b>Coding Languages:</b>
                <span class="badge">TypeScript</span>
                <span class="badge">JavaScript</span>
                <span class="badge">C#</span>
                <span class="badge">Python</span>
                <span class="badge">Java</span>
                <span class="badge">C++</span>
                <span class="badge">SQL</span>
              </span>
            </div>
            <div class="expertise-card">
              <span class="expertise-icon">📦</span>
              <span>
                <b>Version Control:</b>
                <span class="badge">Git</span>
                <span class="badge">Azure Git</span>
                <span class="badge">GitHub</span>
                <span class="badge">TFS</span>
              </span>
            </div>
          </div>
        </div>
        <div *ngSwitchDefault>
          <h2>Welcome to My Portfolio!</h2>
          <p>Thank you for visiting. Feel free to explore my projects and get in touch if you'd like to collaborate.</p>
        </div>
      </ng-container>
    </app-popup>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  showPopup = false;
  activePopup: 'professional' | 'technical' | 'projects' | null = null;
  popupTitle = '';
  boxHover = [false, false, false, false];
  
  workExperiences: WorkExperience[] = [
    {
      title: 'Product Developer',
      company: 'Epicor Software',
      location: 'Bangalore, India',
      period: 'Sep 2023 – Present',
      technologies: ['Next.js', 'NestJS', 'SQL Server', 'RESTful APIs'],
      achievements: [
        'Migrated a legacy Advanced MES application from MFC C++ to a modern full-stack solution using Next.js and NestJS.',
        'Successfully transformed the entire application architecture, improving performance and maintainability.',
        'Built internal reusable modules and RESTful APIs using NestJS, implementing core design patterns such as Singleton, Factory, and Chain of Responsibility to enhance scalability and maintainability.',
        'Designed and implemented an intelligent caching mechanism in NestJS to preload and serve data, significantly reducing API response times and improving performance for high latency user interfaces.',
        'Developed comprehensive automated tests for NestJS services involved in the migration process, leveraging Playwright and GitHub Copilot to achieve over 80% code coverage across the codebase.',
        'Refactored complex hierarchical datatypes into flat structures (nvarchar(25)) across SQL Server databases; optimized dependent procedures, views, and data models led to 80% reduction in memory consumption and 70% faster query execution time.'
      ]
    },
    {
      title: 'Intern',
      company: 'Epicor Software',
      location: 'Bangalore, India',
      period: 'Feb 2023 – Sep 2023',
      technologies: ['ASP.NET MVC', 'SSRS', 'AI'],
      achievements: [
        'Built an AI-powered infrastructure for automated multilingual support in the MES web application, reducing the manual work by 90% for language translation.',
        'Implemented dynamic report filters in an ASP.NET MVC application for SSRS reports.',
        'Successfully delivered 40 out of 150 SSRS reports, over 25% of the total in a single release for the classic Advanced MES system, significantly reducing backlog and preventing work overflow in subsequent releases.'
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openPopup(type: 'professional' | 'technical' | 'projects') {
    this.activePopup = type;
    this.showPopup = true;
    
    switch(type) {
      case 'professional':
        this.popupTitle = 'Professional Journey';
        break;
      case 'technical':
        this.popupTitle = 'Technical Expertise';
        break;
      case 'projects':
        this.popupTitle = 'Projects & Achievements';
        break;
    }
  }

  closePopup() {
    this.showPopup = false;
    this.activePopup = null;
  }

  setBoxHover(idx: number, val: boolean): void {
    this.boxHover[idx] = val;
  }

  highlightAchievement(index: number) {
    // This method can be used to add additional effects when hovering over achievements
    console.log('Highlighting achievement:', index);
  }

  unhighlightAchievement(index: number) {
    // This method can be used to remove effects when hovering out of achievements
    console.log('Unhighlighting achievement:', index);
  }

  getAchievementIcon(index: number): string {
    const icons = ['💡', '🛠️', '🚀', '🗄️', '🧪', '🤖', '🏆'];
    return icons[index % icons.length];
  }

  highlightKeywords(text: string): string {
    return text.replace(/C#|\\.NET Core|SQL Server|RESTful APIs|GitHub Copilot|80%\\+|Singleton|Factory|Chain of Responsibility/gi, 
      match => `<span class='highlight'>${match}</span>`);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }
}