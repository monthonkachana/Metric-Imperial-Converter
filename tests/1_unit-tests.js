const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

describe('Unit Tests', function () {
    it('should correctly read a whole number input', function () {
        assert.strictEqual(convertHandler.getNum('2kg'), 2, 'Correctly read valid whole number input');
    });

    it('should correctly read a decimal number input', function () {
        assert.strictEqual(convertHandler.getNum('2.5lbs'), 2.5, 'Correctly read valid decimal input');
    });

    it('should correctly read a fractional input', function () {
        assert.strictEqual(convertHandler.getNum('1/5kg'), 0.2, 'Correctly read valid fractional input');
    });

    it('should correctly read a fractional input with a decimal', function () {
        assert.strictEqual(convertHandler.getNum('0.2/0.5kg'), 0.4, 'Correctly read valid fractional input with decimal');
    });

    it('should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number', 'Return error for invalid double fraction input');
    });

    it('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.strictEqual(convertHandler.getNum('kg'), 1, 'Correctly default to 1 when no numeric input is provided');
    });

    it('should correctly read each valid input unit', function () {
        assert.strictEqual(convertHandler.getUnit('2gal'), 'gal', 'Correctly read gal');
        assert.strictEqual(convertHandler.getUnit('2L'), 'L', 'Correctly read L');
        assert.strictEqual(convertHandler.getUnit('2mi'), 'mi', 'Correctly read mi');
        assert.strictEqual(convertHandler.getUnit('2km'), 'km', 'Correctly read km');
        assert.strictEqual(convertHandler.getUnit('2lbs'), 'lbs', 'Correctly read lbs');
        assert.strictEqual(convertHandler.getUnit('2kg'), 'kg', 'Correctly read kg');
    });

    it('should correctly return an error for an invalid input unit', function () {
        assert.strictEqual(convertHandler.getUnit('2invalidUnit'), 'invalid unit', 'Correctly return error message for invalid input unit');
    });

    it('should return the correct return unit for each valid input unit', function () {
        assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'Correctly return L as output unit for gal input unit');
        assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', 'Correctly return gal as output unit for L input unit');
        assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'Correctly return km as output unit for mi input unit');
        assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'Correctly return mi as output unit for km input unit');
        assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'Correctly return kg as output unit for lbs input unit');
        assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'Correctly return lbs as output unit for kg input unit');
    });

    it('should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.strictEqual(convertHandler.spellOutUnit('GAL'), 'gal', 'Correctly return gal as output unit for GAL input unit');
        assert.strictEqual(convertHandler.spellOutUnit('l'), 'L', 'Correctly return L as output unit for l input unit');
        assert.strictEqual(convertHandler.spellOutUnit('MI'), 'mi', 'Correctly return mi as output unit for MI input unit');
        assert.strictEqual(convertHandler.spellOutUnit('KM'), 'km', 'Correctly return km as output unit for KM input unit');
        assert.strictEqual(convertHandler.spellOutUnit('LBS'), 'lbs', 'Correctly return lbs as output unit for LBS input unit');
        assert.strictEqual(convertHandler.spellOutUnit('KG'), 'kg', 'Correctly return kg as output unit for KG input unit');
    });

    it('should correctly convert gal to L', function () {
        assert.approximately(convertHandler.convert(2, 'gal'), 7.57082, 0.001, 'Correctly convert 2gal to 7.57082L');
    });

    it('should correctly convert L to gal', function () {
        assert.approximately(convertHandler.convert(2, 'L'), 0.52834, 0.001, 'Correctly convert 2L to 0.52834gal');
    });

    it('should correctly convert mi to km', function () {
        assert.approximately(convertHandler.convert(2, 'mi'), 3.21868, 0.001, 'Correctly convert 2mi to 3.21868km');
    });

    it('should correctly convert km to mi', function () {
        assert.approximately(convertHandler.convert(2, 'km'), 1.24275, 0.001, 'Correctly convert 2km to 1.24275mi');
    });

    it('should correctly convert lbs to kg', function () {
        assert.approximately(convertHandler.convert(2, 'lbs'), 0.90718, 0.001, 'Correctly convert 2lbs to 0.90718kg');
    });

    it('should correctly convert kg to lbs', function () {
        assert.approximately(convertHandler.convert(2, 'kg'), 4.40925, 0.001, 'Correctly convert 2kg to 4.40925lbs');
    });
});
