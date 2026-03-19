import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDoughnut } from './grafico-doughnut';

describe('GraficoDoughnut', () => {
  let component: GraficoDoughnut;
  let fixture: ComponentFixture<GraficoDoughnut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoDoughnut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoDoughnut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
