import { TestBed } from '@angular/core/testing';

import { ItemObjectService } from './item-object.service';

describe('ItemObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemObjectService = TestBed.get(ItemObjectService);
    expect(service).toBeTruthy();
  });
});
