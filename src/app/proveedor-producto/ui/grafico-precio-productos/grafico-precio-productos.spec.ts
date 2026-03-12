import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPrecioProductos } from './grafico-precio-productos';

describe('GraficoPrecioProductos', () => {
  let component: GraficoPrecioProductos;
  let fixture: ComponentFixture<GraficoPrecioProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPrecioProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPrecioProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
