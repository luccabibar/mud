import { TestBed } from '@angular/core/testing';
import { BancoService } from './banco.service';
describe('BancoService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BancoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=banco.service.spec.js.map