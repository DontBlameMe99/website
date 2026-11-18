import { type ClassValue, clsx } from "clsx";

/** Joins class lists. Conflicting utilities are written as one branch, never
 *  layered, so the stylesheet order is not what decides a conflict. */
export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}
