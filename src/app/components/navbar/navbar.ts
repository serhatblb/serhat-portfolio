import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  isDark = false;
  isMenuOpen = false; // Menü açık mı kapalı mı?

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Linke tıklayınca menüyü kapat (Mobilde gezinince menü açık kalmasın)
  closeMenu() {
    this.isMenuOpen = false;
  }
}