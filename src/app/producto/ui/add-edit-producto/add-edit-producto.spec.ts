import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProducto } from './add-edit-producto';

describe('AddEditProducto', () => {
  let component: AddEditProducto;
  let fixture: ComponentFixture<AddEditProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
