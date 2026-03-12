import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductoAlmacen } from './list-producto-almacen';

describe('ListProductoAlmacen', () => {
  let component: ListProductoAlmacen;
  let fixture: ComponentFixture<ListProductoAlmacen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductoAlmacen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductoAlmacen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
