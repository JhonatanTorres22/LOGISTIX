import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionSunat } from './evaluacion-sunat';

describe('EvaluacionSunat', () => {
  let component: EvaluacionSunat;
  let fixture: ComponentFixture<EvaluacionSunat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionSunat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionSunat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
