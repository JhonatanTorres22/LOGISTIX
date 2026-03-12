import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfOrdenCompra } from './pdf-orden-compra';

describe('PdfOrdenCompra', () => {
  let component: PdfOrdenCompra;
  let fixture: ComponentFixture<PdfOrdenCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfOrdenCompra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfOrdenCompra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
