import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfEvaluacion } from './view-pdf-evaluacion';

describe('ViewPdfEvaluacion', () => {
  let component: ViewPdfEvaluacion;
  let fixture: ComponentFixture<ViewPdfEvaluacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPdfEvaluacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPdfEvaluacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
