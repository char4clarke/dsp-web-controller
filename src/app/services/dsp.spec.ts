import { TestBed } from '@angular/core/testing';
import { Dsp } from './dsp';

describe('Dsp', () => {
  let service: Dsp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dsp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
