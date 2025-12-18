import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductos } from './list-productos';

describe('ListProductos', () => {
  let component: ListProductos;
  let fixture: ComponentFixture<ListProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
