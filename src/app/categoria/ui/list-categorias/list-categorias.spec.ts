import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategorias } from './list-categorias';

describe('ListCategorias', () => {
  let component: ListCategorias;
  let fixture: ComponentFixture<ListCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
