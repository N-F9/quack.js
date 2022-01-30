import * as col from 'color';
/**
 * A function for converting any color variation to an base 10 number.
 *
 * @param {string} color
 * @return {*} {number}
 */
const Color = (color) => {
    const c = col.default(color);
    return parseInt(c.hex().substring(1), 16);
};
export default Color;
