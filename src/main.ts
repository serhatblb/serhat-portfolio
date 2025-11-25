// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Doğru dosya yolu
import { appConfig } from './app/app.config'; // Varsa config dosyası

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));