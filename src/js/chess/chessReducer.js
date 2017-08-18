/* Copyright 2016 Novartis Institutes for BioMedical Research Inc. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. */

import findKey from 'lodash/findKey';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import { actionTypes, chessPieceTypes } from './constants';

const initialState = {
    positions: {
        DARK_ROOK1: [0, 0],
        DARK_KNIGHT1: [1, 0],
        DARK_BISHOP1: [2, 0],
        DARK_QUEEN: [3, 0],
        DARK_KING: [4, 0],
        DARK_BISHOP2: [5, 0],
        DARK_KNIGHT2: [6, 0],
        DARK_ROOK2: [7, 0],

        DARK_PAWN1: [0, 1],
        DARK_PAWN2: [1, 1],
        DARK_PAWN3: [2, 1],
        DARK_PAWN4: [3, 1],
        DARK_PAWN5: [4, 1],
        DARK_PAWN6: [5, 1],
        DARK_PAWN7: [6, 1],
        DARK_PAWN8: [7, 1],

        LIGHT_ROOK1: [0, 7],
        LIGHT_KNIGHT1: [1, 7],
        LIGHT_BISHOP1: [2, 7],
        LIGHT_QUEEN: [3, 7],
        LIGHT_KING: [4, 7],
        LIGHT_BISHOP2: [5, 7],
        LIGHT_KNIGHT2: [6, 7],
        LIGHT_ROOK2: [7, 7],

        LIGHT_PAWN1: [0, 6],
        LIGHT_PAWN2: [1, 6],
        LIGHT_PAWN3: [2, 6],
        LIGHT_PAWN4: [3, 6],
        LIGHT_PAWN5: [4, 6],
        LIGHT_PAWN6: [5, 6],
        LIGHT_PAWN7: [6, 6],
        LIGHT_PAWN8: [7, 6],
    },
    pieces: {
        DARK_KING: { dark: true, type: chessPieceTypes.KING },
        DARK_QUEEN: { dark: true, type: chessPieceTypes.QUEEN },
        DARK_ROOK1: { dark: true, type: chessPieceTypes.ROOK },
        DARK_ROOK2: { dark: true, type: chessPieceTypes.ROOK },
        DARK_BISHOP1: { dark: true, type: chessPieceTypes.BISHOP },
        DARK_BISHOP2: { dark: true, type: chessPieceTypes.BISHOP },
        DARK_KNIGHT1: { dark: true, type: chessPieceTypes.KNIGHT },
        DARK_KNIGHT2: { dark: true, type: chessPieceTypes.KNIGHT },
        DARK_PAWN1: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN2: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN3: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN4: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN5: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN6: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN7: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },
        DARK_PAWN8: { dark: true, type: chessPieceTypes.PAWN, firstMove: true },

        LIGHT_KING: { dark: false, type: chessPieceTypes.KING },
        LIGHT_QUEEN: { dark: false, type: chessPieceTypes.QUEEN },
        LIGHT_ROOK1: { dark: false, type: chessPieceTypes.ROOK },
        LIGHT_ROOK2: { dark: false, type: chessPieceTypes.ROOK },
        LIGHT_BISHOP1: { dark: false, type: chessPieceTypes.BISHOP },
        LIGHT_BISHOP2: { dark: false, type: chessPieceTypes.BISHOP },
        LIGHT_KNIGHT1: { dark: false, type: chessPieceTypes.KNIGHT },
        LIGHT_KNIGHT2: { dark: false, type: chessPieceTypes.KNIGHT },
        LIGHT_PAWN1: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN2: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN3: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN4: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN5: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN6: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN7: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
        LIGHT_PAWN8: { dark: false, type: chessPieceTypes.PAWN, firstMove: true },
    },
    darkTurn: false,
    gameWinner: false,
};

export function getPieceOnSquare(positions, x, y) {
    return findKey(positions, (pos) => isEqual(pos, [x, y]));
}

export function chess(state = initialState, action) {
    switch (action.type) {
        case actionTypes.MOVE_PIECE:
            return {
                ...state,
                positions: {
                    ...state.positions,
                    [action.pieceId]: [action.toX, action.toY],
                },
                pieces: {
                    ...state.pieces,
                    [action.pieceId]: {
                        ...state.pieces[action.pieceId],
                        firstMove: false,
                    },
                },
                darkTurn: !state.darkTurn,
            };

        case actionTypes.CAPTURE_PIECE:
            const newPositions = omit(state.positions, action.pieceId);

            const { type, dark } = state.pieces[action.pieceId];
            let gameWinner = false;
            if (type === chessPieceTypes.KING) {
                gameWinner = dark ? 'light' : 'dark';
            }

            return {
                ...state,
                positions: newPositions,
                gameWinner,
            };

        case actionTypes.NEW_GAME:
            return initialState;

        case actionTypes.CHANGE_PIECE_TYPE:
            return {
                ...state,
                pieces: {
                    ...state.pieces,
                    [action.pieceId]: {
                        ...state.pieces[action.pieceId],
                        type: action.newPieceType,
                    },
                },
            };
        default:
            return state;
    }
}
