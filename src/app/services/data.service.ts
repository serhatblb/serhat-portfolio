import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Experience } from '../models/experience';
import { Observable, of } from 'rxjs'; // Asenkron veri akışı simülasyonu için

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // PROJE VERİLERİN (Burayı istediğin gibi doldur)
  private projects: Project[] = [
    {
      id: 1,
      title: 'Dijital Vardiya Defteri',
      description: 'Java + Angular tabanlı, kağıtsız vardiya yönetim platformu. S2 verileriyle entegre.',
      techStack: ['Java Spring', 'Angular', 'MSSQL'],
      category: 'industrial',
      imageUrl: 'assets/images/project1.jpg'
    },
    {
      id: 2,
      title: 'SDM & Üretim Yönetimi',
      description: 'Yol kapanma analizleri ve üretim takibi yapan kapsamlı MES modülü.',
      techStack: ['C# .NET', 'SQL', 'MES'],
      category: 'industrial',
      imageUrl: 'assets/images/project2.jpg'
    },
    {
      id: 3,
      title: '3D Kütük İstif Sahası',
      description: 'Three.js ile geliştirilen interaktif stok ve saha görselleştirme projesi.',
      techStack: ['Three.js', 'WebGL', 'Angular'],
      category: '3d',
      imageUrl: 'assets/images/project3.jpg'
    },
    {
      id: 4,
      title: 'UniEduNote Platformu',
      description: 'Üniversite öğrencileri için not paylaşımı ve sosyal etkileşim platformu.',
      techStack: ['Django', 'Python', 'React'],
      category: 'web',
      imageUrl: 'assets/images/project4.jpg'
    }
  ];

  // DENEYİM VERİLERİN
  private experiences: Experience[] = [
    {
      company: 'Kardemir A.Ş.',
      position: 'Seviye 2 Otomasyon Mühendisi',
      period: '2022 - Günümüz',
      description: 'Seviye 2 otomasyon sistemlerinin yönetimi, MES projelerinin geliştirilmesi ve saha verilerinin dijitalleştirilmesi.'
    }
    // Buraya eski işlerini ekleyebilirsin
  ];

  constructor() { }

  // Verileri Sanki API'den çekiyormuşuz gibi Observable olarak döndürüyoruz
  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getExperiences(): Observable<Experience[]> {
    return of(this.experiences);
  }
}