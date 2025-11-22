import type { Color } from '../src/Color';
import type { PieceType } from '../src/PieceType';

export interface Piece {
    color: Color;
    type: PieceType;
}