import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContacto } from './add-edit-contacto';

describe('AddEditContacto', () => {
  let component: AddEditContacto;
  let fixture: ComponentFixture<AddEditContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
