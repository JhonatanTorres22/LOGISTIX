import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComprobantePorCargar } from './list-comprobante-por-cargar';

describe('ListComprobantePorCargar', () => {
  let component: ListComprobantePorCargar;
  let fixture: ComponentFixture<ListComprobantePorCargar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComprobantePorCargar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComprobantePorCargar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
