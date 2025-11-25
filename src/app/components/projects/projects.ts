import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service'; // Yolu kontrol et
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class Projects implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  openModal(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
  }
}