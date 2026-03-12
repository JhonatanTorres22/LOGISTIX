import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContacto } from './list-contacto';

describe('ListContacto', () => {
  let component: ListContacto;
  let fixture: ComponentFixture<ListContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
