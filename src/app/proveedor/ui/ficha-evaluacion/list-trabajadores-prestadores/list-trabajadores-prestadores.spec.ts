import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrabajadoresPrestadores } from './list-trabajadores-prestadores';

describe('ListTrabajadoresPrestadores', () => {
  let component: ListTrabajadoresPrestadores;
  let fixture: ComponentFixture<ListTrabajadoresPrestadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTrabajadoresPrestadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrabajadoresPrestadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
