/* Copyright 2016 Novartis Institutes for BioMedical Research Inc. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect as reduxConnect } from 'react-redux';
import { DragSource } from 'react-dnd';


import { itemTypes, chessUnicode } from './constants';

const pieceSource = {
    beginDrag(props) {
        return {
            pieceId: props.id,
            pieceType: props.type,
        };
    },
    canDrag(props) {
        return props.dark === props.darkTurn;
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag(),
    };
}

class Piece extends Component {
    static propTypes = {
        dark: PropTypes.bool,
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['KING', 'QUEEN', 'ROOK', 'BISHOP', 'KNIGHT', 'PAWN']).isRequired,
        // from drag and drop
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        canDrag: PropTypes.bool.isRequired,
        // from state
        darkTurn: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        dark: false,
    }

    render() {
        const {
            dark,
            type,
            connectDragSource,
            isDragging,
            canDrag,
        } = this.props;
        const pieceStyle = {
            opacity: isDragging ? 0.3 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: canDrag ? 'move' : 'default',
            color: dark ? 'black' : 'white',
        };
        return connectDragSource(
            <span style={pieceStyle}>{String.fromCharCode(chessUnicode[type])}</span>
        );
    }
}

function mapStateToProps(state) {
    return {
        darkTurn: state.chess.darkTurn,
    };
}

export default reduxConnect(mapStateToProps)(DragSource(itemTypes.PIECE, pieceSource, collect)(Piece));
