import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer implements OnInit {
  year = new Date().getFullYear();
  
  // Sayaç Değişkenleri
  totalViews = 4987; // Başlangıç "fake" sayısı
  dailyViews = 1;

  ngOnInit() {
    this.updateVisitorCount();
  }

  updateVisitorCount() {
    // 1. LocalStorage'dan verileri çek
    const storageData = localStorage.getItem('visitorData');
    const today = new Date().toDateString(); // "Tue Nov 25 2025" gibi

    if (storageData) {
      const data = JSON.parse(storageData);

      // Toplam sayıyı güncelle (Eski verinin üstüne ekle)
      this.totalViews = data.totalViews + 1;

      // Tarih kontrolü: Eğer kayıtlı tarih bugüne eşitse
      if (data.lastDate === today) {
        this.dailyViews = data.dailyViews + 1; // Bugünün sayacını artır
      } else {
        // Tarih değişmişse (yeni gün), bugünün sayacını 1 yap
        this.dailyViews = 1; // Bugünün ilk ziyaretçisi (simülasyon için 8-10 arası rastgele de başlatabilirsin)
        // İstersen daha havalı durması için: 
        // this.dailyViews = Math.floor(Math.random() * 10) + 1;
      }
    } else {
      // İlk kez giriyorsa (Storage boşsa)
      this.totalViews++;
    }

    // 2. Yeni verileri kaydet
    const newData = {
      totalViews: this.totalViews,
      dailyViews: this.dailyViews,
      lastDate: today
    };
    localStorage.setItem('visitorData', JSON.stringify(newData));
  }
}