import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenCompraDetalle } from './list-orden-compra-detalle';

describe('ListOrdenCompraDetalle', () => {
  let component: ListOrdenCompraDetalle;
  let fixture: ComponentFixture<ListOrdenCompraDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrdenCompraDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdenCompraDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
