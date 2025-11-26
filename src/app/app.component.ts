import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// DİKKAT: Senin dosya isimlerin kısa olduğu için (navbar.ts),
// import ederken sonuna .component EKLENMEMELİ.
// Doğrusu bu şekilde:
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { Contact} from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { PastCareer } from "./components/past-career/past-career";
import { Blog } from "./components/blog/blog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Hero,
    About,
    Experience,
    Projects,
    Contact,
    Footer,
    PastCareer,
    Blog
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'serhat-portfolio';
}