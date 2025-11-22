import type { Color } from '../src/Color';
import type { Piece } from "../src/Piece";

export interface Square {
    x: number;
    y: number;
    color: Color;
    piece: Piece | null;
}