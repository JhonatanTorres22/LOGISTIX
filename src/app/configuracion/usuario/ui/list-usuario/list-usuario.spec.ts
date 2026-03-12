import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuario } from './list-usuario';

describe('ListUsuario', () => {
  let component: ListUsuario;
  let fixture: ComponentFixture<ListUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
