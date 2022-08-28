export function getNiceNumber(number)
{
	return +(number + Number.EPSILON).toFixed(2);
}