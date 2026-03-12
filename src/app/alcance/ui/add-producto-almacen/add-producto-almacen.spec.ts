import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductoAlmacen } from './add-producto-almacen';

describe('AddProductoAlmacen', () => {
  let component: AddProductoAlmacen;
  let fixture: ComponentFixture<AddProductoAlmacen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductoAlmacen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductoAlmacen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
