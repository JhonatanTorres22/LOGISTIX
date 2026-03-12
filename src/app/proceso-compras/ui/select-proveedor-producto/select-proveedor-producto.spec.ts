import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProveedorProducto } from './select-proveedor-producto';

describe('SelectProveedorProducto', () => {
  let component: SelectProveedorProducto;
  let fixture: ComponentFixture<SelectProveedorProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProveedorProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProveedorProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
