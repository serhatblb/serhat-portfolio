import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss']
})
export class Experience implements OnInit {
  experiences: any[] = [];
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.getExperiences().subscribe(res => this.experiences = res);
  }
}