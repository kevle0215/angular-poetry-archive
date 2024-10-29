import { TestBed } from '@angular/core/testing';

import { FetchDataService } from './fetchdata.service';

describe('FetchdataService', () => {
  let service: FetchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
