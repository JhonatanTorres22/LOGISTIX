import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProveedorProducto } from './list-proveedor-producto';

describe('ListProveedorProducto', () => {
  let component: ListProveedorProducto;
  let fixture: ComponentFixture<ListProveedorProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProveedorProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProveedorProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
