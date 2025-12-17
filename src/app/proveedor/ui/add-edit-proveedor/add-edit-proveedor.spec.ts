import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProveedor } from './add-edit-proveedor';

describe('AddEditProveedor', () => {
  let component: AddEditProveedor;
  let fixture: ComponentFixture<AddEditProveedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProveedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProveedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
