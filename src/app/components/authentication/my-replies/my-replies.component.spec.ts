import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRepliesComponent } from './my-replies.component';

describe('MyRepliesComponent', () => {
  let component: MyRepliesComponent;
  let fixture: ComponentFixture<MyRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
