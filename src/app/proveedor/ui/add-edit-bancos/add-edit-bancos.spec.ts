import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBancos } from './add-edit-bancos';

describe('AddEditBancos', () => {
  let component: AddEditBancos;
  let fixture: ComponentFixture<AddEditBancos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBancos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBancos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
