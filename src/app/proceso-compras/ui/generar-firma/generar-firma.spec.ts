import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarFirma } from './generar-firma';

describe('GenerarFirma', () => {
  let component: GenerarFirma;
  let fixture: ComponentFixture<GenerarFirma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarFirma]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarFirma);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
