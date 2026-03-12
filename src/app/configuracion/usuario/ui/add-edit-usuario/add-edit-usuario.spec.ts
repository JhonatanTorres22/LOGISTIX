import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUsuario } from './add-edit-usuario';

describe('AddEditUsuario', () => {
  let component: AddEditUsuario;
  let fixture: ComponentFixture<AddEditUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
