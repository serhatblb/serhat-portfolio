import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-past-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-career.html',
  styleUrls: ['./past-career.scss']
})
export class PastCareer implements OnInit {

  careerSteps: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPastCareer().subscribe(steps => {
      this.careerSteps = steps;
    });
  }
}
