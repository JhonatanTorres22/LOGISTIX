import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClonadorProductos } from './list-clonador-productos';

describe('ListClonadorProductos', () => {
  let component: ListClonadorProductos;
  let fixture: ComponentFixture<ListClonadorProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClonadorProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClonadorProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
