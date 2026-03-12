import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeudaCoactiva } from './add-edit-deuda-coactiva';

describe('AddEditDeudaCoactiva', () => {
  let component: AddEditDeudaCoactiva;
  let fixture: ComponentFixture<AddEditDeudaCoactiva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDeudaCoactiva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDeudaCoactiva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
