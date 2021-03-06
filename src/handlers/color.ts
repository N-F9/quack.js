import * as col from 'color'

/**
 * A function for converting any color variation to an base 10 number.
 *
 * @param color - The color to be parsed.
 * @returns The `number` version of `color`.
 */
export const Color = (color: string): number => {
	const c = col.default(color)
	return parseInt(c.hex().substring(1), 16)
}
