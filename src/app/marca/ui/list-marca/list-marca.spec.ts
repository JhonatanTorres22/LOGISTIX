import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarca } from './list-marca';

describe('ListMarca', () => {
  let component: ListMarca;
  let fixture: ComponentFixture<ListMarca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMarca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMarca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
