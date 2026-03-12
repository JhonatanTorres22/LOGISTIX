import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBancos } from './list-bancos';

describe('ListBancos', () => {
  let component: ListBancos;
  let fixture: ComponentFixture<ListBancos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBancos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBancos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
