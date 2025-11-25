import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
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
  
  private particles: Particle[] = [];
  private particleCount = 80; 
  private connectionDistance = 150; 
  private mouse = { x: -9999, y: -9999, radius: 150 }; // Radius biraz küçüldü mobilde daha hassas olsun diye

  titles = ["Otomasyon Mühendisi", "Fullstack Developer", "System Architect"];
  currentText = "";

  ngAfterViewInit() {
    this.initCanvas();
    this.startTypewriter();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  // --- MOUSE & TOUCH EVENTLERİ ---

  // Masaüstü Mouse Hareketi
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  // Mobil Dokunma Hareketi (Touch Move)
  @HostListener('touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    // Sayfanın kaymasını engellememek için preventDefault kullanmıyoruz
    // sadece koordinatları alıyoruz
    if(e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
    }
  }

  // Dokunma Başlangıcı
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    if(e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
    }
  }

  // Etkileşim Bitişi (Elini çekince veya mouse çıkınca)
  @HostListener('mouseleave')
  @HostListener('touchend')
  resetInteraction() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }

  // --- CANVAS & ANIMASYON ---

  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.initParticles();
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.animate();
  }

  initParticles() {
    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    // Mobil performansı için parçacık sayısını ekrana göre ayarla
    const count = window.innerWidth < 768 ? 50 : this.particleCount;

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() - 0.5) * 1.5;
      const dy = (Math.random() - 0.5) * 1.5;
      this.particles.push(new Particle(x, y, dx, dy, size));
    }
  }

  animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.particles.forEach(p => {
      p.update(canvas.width, canvas.height, this.mouse);
      p.draw(this.ctx);
    });

    this.connectParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  connectParticles() {
    // Mobilde bağlantı mesafesini düşür
    const distLimit = window.innerWidth < 768 ? 100 : this.connectionDistance;

    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = dx * dx + dy * dy;

        if (distance < (distLimit * distLimit)) {
          const opacityValue = 1 - (distance / (distLimit * distLimit)); // Daha yumuşak geçiş
          this.ctx.strokeStyle = `rgba(228, 138, 0, ${opacityValue})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  startTypewriter() {
    let titleIndex = 0, charIndex = 0, isDeleting = false;
    const type = () => {
      const currentTitle = this.titles[titleIndex];
      this.currentText = isDeleting ? currentTitle.substring(0, charIndex - 1) : currentTitle.substring(0, charIndex + 1);
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      let speed = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === currentTitle.length) { speed = 2000; isDeleting = true; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; titleIndex = (titleIndex + 1) % this.titles.length; }
      setTimeout(type, speed);
    };
    type();
  }
}

class Particle {
  x: number; y: number; dx: number; dy: number; size: number;
  baseX: number; baseY: number; density: number;

  constructor(x: number, y: number, dx: number, dy: number, size: number) {
    this.x = x; this.y = y;
    this.dx = dx; this.dy = dy;
    this.size = size;
    this.baseX = x; this.baseY = y;
    this.density = (Math.random() * 30) + 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#e48a00';
    ctx.fill();
  }

  update(width: number, height: number, mouse: any) {
    if (this.x > width || this.x < 0) this.dx = -this.dx;
    if (this.y > height || this.y < 0) this.dy = -this.dy;

    // Etkileşim
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    
    if (distance < mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        this.x -= directionX;
        this.y -= directionY;
    } else {
        this.x += this.dx;
        this.y += this.dy;
    }
  }
}