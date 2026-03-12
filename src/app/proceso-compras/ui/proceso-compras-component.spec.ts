import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoComprasComponent } from './proceso-compras-component';

describe('ProcesoComprasComponent', () => {
  let component: ProcesoComprasComponent;
  let fixture: ComponentFixture<ProcesoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
