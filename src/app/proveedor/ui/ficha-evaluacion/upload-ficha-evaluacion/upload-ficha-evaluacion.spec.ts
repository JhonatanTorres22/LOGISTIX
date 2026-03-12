import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFichaEvaluacion } from './upload-ficha-evaluacion';

describe('UploadFichaEvaluacion', () => {
  let component: UploadFichaEvaluacion;
  let fixture: ComponentFixture<UploadFichaEvaluacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFichaEvaluacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFichaEvaluacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
