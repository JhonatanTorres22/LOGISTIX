import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProveedor } from './list-proveedor';

describe('ListProveedor', () => {
  let component: ListProveedor;
  let fixture: ComponentFixture<ListProveedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProveedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProveedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
