import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './blog.html',
  styleUrls: ['./blog.scss']
})
export class Blog {
  
  posts = [
    {
      date: '26 Kas',
      year: '2025',
      title: 'Protezden Yazılıma: Bir Dönüşüm Hikayesi',
      readTime: '4 dk okuma',
      link: '#'
    },
    {
      date: '20 Kas',
      year: '2025',
      title: 'Angular 17 ile Gelen Yenilikler',
      readTime: '6 dk okuma',
      link: '#'
    }
  ];
}