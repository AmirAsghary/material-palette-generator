import {throwIfNotInRange} from "../src/utils";

describe('throwIfNotInRange util', () => {
    it('Number -1, max 10, min 0', () => {
        expect(() => throwIfNotInRange(-1, 10)).toThrow();
    });
    it('Number 0, max 10, min 0', () => {
        expect(() => throwIfNotInRange(0, 10)).toBeTruthy();
    });
    it('Number 100, max 10, min 0', () => {
        expect(() => throwIfNotInRange(100, 10)).toThrow();
    });
    it('Number NaN', () => {
        expect(() => throwIfNotInRange(NaN, 10)).toThrow();
    });
    it('Max -10, min 10', () => {
        expect(() => throwIfNotInRange(0, -10, '', 10)).toThrow();
    });
});