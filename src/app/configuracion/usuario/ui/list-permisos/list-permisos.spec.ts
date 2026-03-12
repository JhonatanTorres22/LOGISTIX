import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermisos } from './list-permisos';

describe('ListPermisos', () => {
  let component: ListPermisos;
  let fixture: ComponentFixture<ListPermisos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPermisos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPermisos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
