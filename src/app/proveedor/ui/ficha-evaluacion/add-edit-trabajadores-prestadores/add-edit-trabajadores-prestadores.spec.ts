import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrabajadoresPrestadores } from './add-edit-trabajadores-prestadores';

describe('AddEditTrabajadoresPrestadores', () => {
  let component: AddEditTrabajadoresPrestadores;
  let fixture: ComponentFixture<AddEditTrabajadoresPrestadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTrabajadoresPrestadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTrabajadoresPrestadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
