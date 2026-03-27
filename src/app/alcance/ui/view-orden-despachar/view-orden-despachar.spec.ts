import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdenDespachar } from './view-orden-despachar';

describe('ViewOrdenDespachar', () => {
  let component: ViewOrdenDespachar;
  let fixture: ComponentFixture<ViewOrdenDespachar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrdenDespachar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrdenDespachar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
