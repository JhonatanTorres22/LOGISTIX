import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeudaCoactiva } from './list-deuda-coactiva';

describe('ListDeudaCoactiva', () => {
  let component: ListDeudaCoactiva;
  let fixture: ComponentFixture<ListDeudaCoactiva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeudaCoactiva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeudaCoactiva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
