/* Copyright 2016 Novartis Institutes for BioMedical Research Inc. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. */

import { actionTypes } from './constants';

export function movePiece(pieceId, toX, toY) {
    return {
        type: actionTypes.MOVE_PIECE,
        pieceId,
        toX,
        toY,
    };
}

export function capturePiece(pieceId) {
    return {
        type: actionTypes.CAPTURE_PIECE,
        pieceId,
    };
}

export function startNewGame() {
    return {
        type: actionTypes.NEW_GAME,
    };
}

export function changePieceType(pieceId, newPieceType) {
    return {
        type: actionTypes.CHANGE_PIECE_TYPE,
        pieceId,
        newPieceType,
    };
}
