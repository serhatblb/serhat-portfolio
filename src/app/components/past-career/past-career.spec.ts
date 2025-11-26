import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastCareer } from './past-career';

describe('PastCareer', () => {
  let component: PastCareer;
  let fixture: ComponentFixture<PastCareer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastCareer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastCareer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
