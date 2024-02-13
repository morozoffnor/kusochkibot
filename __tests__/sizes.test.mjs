
import {getRandomSize} from "../app/sizes/generator/mainSizeGenerator.mjs";

test('Base size generation', () => {
    expect(Number(getRandomSize())).toBeGreaterThan(0)
    expect(Number(getRandomSize())).toBeLessThan(41)
})