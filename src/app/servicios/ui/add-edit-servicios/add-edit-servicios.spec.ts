import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServicios } from './add-edit-servicios';

describe('AddEditServicios', () => {
  let component: AddEditServicios;
  let fixture: ComponentFixture<AddEditServicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditServicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditServicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
