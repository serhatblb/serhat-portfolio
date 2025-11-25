import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Form işlemleri için gerekli

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule eklendi
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  email = 'serhatblb23@gmail.com';
  
  // Form Verileri
  mailData = {
    subject: '',
    message: ''
  };

  // Akıllı Mail Gönderimi
  sendMail() {
    if (!this.mailData.subject || !this.mailData.message) {
      alert('Lütfen konu ve mesaj alanlarını doldurun.');
      return;
    }

    const subject = encodeURIComponent(this.mailData.subject);
    const body = encodeURIComponent(this.mailData.message);
    
    // Mail uygulamasını açar
    window.open(`mailto:${this.email}?subject=${subject}&body=${body}`, '_blank');
  }

  // Adres Kopyalama (Eski özellik kalsın)
  copyEmail(btn: HTMLButtonElement) {
    navigator.clipboard.writeText(this.email);
    const originalText = btn.innerText;
    btn.innerText = '✅ Kopyalandı!';
    setTimeout(() => btn.innerText = originalText, 2000);
  }
}