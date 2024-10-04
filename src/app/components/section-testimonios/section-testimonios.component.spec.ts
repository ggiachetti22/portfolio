import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTestimoniosComponent } from './section-testimonios.component';

describe('SectionTestimoniosComponent', () => {
  let component: SectionTestimoniosComponent;
  let fixture: ComponentFixture<SectionTestimoniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTestimoniosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
