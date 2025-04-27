import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactLinks = {
    email: 'https://mail.google.com/mail/?view=cm&fs=1&to=jaskarans2812@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jaskaran-singh-b390761a7/',
    github: 'https://github.com/SpiritedWinter',
    instagram: 'https://www.instagram.com/jaskaransohal',
    leetcode: 'https://leetcode.com/u/jaskarans2812/'
  };

  openLink(url: string): void {
    window.open(url, '_blank');
  }
} 