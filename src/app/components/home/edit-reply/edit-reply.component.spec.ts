import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReplyComponent } from './edit-reply.component';

describe('EditReplyComponent', () => {
  let component: EditReplyComponent;
  let fixture: ComponentFixture<EditReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
