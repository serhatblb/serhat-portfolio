import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-past-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-career.html',
  styleUrls: ['./past-career.scss']
})
export class PastCareer {
  
  careerSteps = [
    {
      title: "Diş Protez Teknikerliği",
      period: "2018 - 2020",
      description: "Estetik ve fonksiyonun birleştiği nokta. Porselen ve zirkonyum çalışmalarında milimetrik hassasiyetle üretim yaptım. Bu süreç bana sabrı ve detaylardaki mükemmelliği öğretti.",
      skills: ["Hassas İşçilik", "Anatomi", "3D Düşünme"],
      image: "assets/dental1.jpg" // Yoksa CSS'te gri kutu çıkacak
    },
    {
      title: "Laboratuvar Yönetimi & Staj",
      period: "2016 - 2018",
      description: "Zaman yönetimi ve iş akışı takibi. Hasta verilerine uygun protezlerin zamanında teslimi için yoğun bir tempoda çalıştım.",
      skills: ["Takım Çalışması", "Kriz Yönetimi"],
      image: "assets/dental2.jpg"
    }
  ];
}