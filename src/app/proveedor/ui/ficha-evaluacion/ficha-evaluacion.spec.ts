import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEvaluacion } from './ficha-evaluacion';

describe('FichaEvaluacion', () => {
  let component: FichaEvaluacion;
  let fixture: ComponentFixture<FichaEvaluacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaEvaluacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEvaluacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
