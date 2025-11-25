import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private particles: any[] = [];

  // Typewriter
  titles = ["Otomasyon Mühendisi", "Fullstack Developer", "MES Uzmanı"];
  currentText = "";
  
  ngAfterViewInit() {
    this.initCanvas();
    this.startTypewriter();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  // --- CANVAS LOGIC ---
  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = 500; // Yükseklik
    
    // Parçacık oluştur
    for(let i=0; i<30; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1
      });
    }
    this.animate();
  }

  animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Grid Çizimi
    this.ctx.strokeStyle = 'rgba(228, 138, 0, 0.1)';
    const gridSize = 50;
    for(let x=0; x<canvas.width; x+=gridSize) { this.ctx.beginPath(); this.ctx.moveTo(x,0); this.ctx.lineTo(x, canvas.height); this.ctx.stroke(); }
    for(let y=0; y<canvas.height; y+=gridSize) { this.ctx.beginPath(); this.ctx.moveTo(0,y); this.ctx.lineTo(canvas.width, y); this.ctx.stroke(); }

    // Particles
    this.ctx.fillStyle = '#e48a00';
    this.particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      this.ctx.fill();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // --- TYPEWRITER LOGIC ---
  startTypewriter() {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentTitle = this.titles[titleIndex];
      if (isDeleting) {
        this.currentText = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        this.currentText = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = 100;
      if (isDeleting) speed = 50;
      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2000; isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false; titleIndex = (titleIndex + 1) % this.titles.length;
      }
      setTimeout(type, speed);
    };
    type();
  }
}