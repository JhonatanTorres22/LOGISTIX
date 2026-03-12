import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGipeo } from './auth-gipeo';

describe('AuthGipeo', () => {
  let component: AuthGipeo;
  let fixture: ComponentFixture<AuthGipeo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGipeo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGipeo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
