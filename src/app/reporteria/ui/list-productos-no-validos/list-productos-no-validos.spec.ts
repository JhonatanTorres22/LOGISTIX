import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductosNoValidos } from './list-productos-no-validos';

describe('ListProductosNoValidos', () => {
  let component: ListProductosNoValidos;
  let fixture: ComponentFixture<ListProductosNoValidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductosNoValidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductosNoValidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
