import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMarca } from './add-edit-marca';

describe('AddEditMarca', () => {
  let component: AddEditMarca;
  let fixture: ComponentFixture<AddEditMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMarca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMarca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
