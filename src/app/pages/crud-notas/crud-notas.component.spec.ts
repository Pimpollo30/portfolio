import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNotasComponent } from './crud-notas.component';

describe('CrudNotasComponent', () => {
  let component: CrudNotasComponent;
  let fixture: ComponentFixture<CrudNotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudNotasComponent]
    });
    fixture = TestBed.createComponent(CrudNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
