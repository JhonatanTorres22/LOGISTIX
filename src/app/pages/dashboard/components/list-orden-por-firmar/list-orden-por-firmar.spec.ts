import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenPorFirmar } from './list-orden-por-firmar';

describe('ListOrdenPorFirmar', () => {
  let component: ListOrdenPorFirmar;
  let fixture: ComponentFixture<ListOrdenPorFirmar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrdenPorFirmar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdenPorFirmar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
