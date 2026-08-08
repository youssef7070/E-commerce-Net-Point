import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhislistComponent } from './whislist.component';

describe('WhislistComponent', () => {
  let component: WhislistComponent;
  let fixture: ComponentFixture<WhislistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhislistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhislistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
