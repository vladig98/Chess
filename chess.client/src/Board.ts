import type { Square } from '../src/Square';

export interface Board {
    rows: number;
    cols: number;
    squares: Square[];
}