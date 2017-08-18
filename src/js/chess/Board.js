/* Copyright 2016 Novartis Institutes for BioMedical Research Inc. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';
import map from 'lodash/map';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { getPieceOnSquare } from './chessReducer';
import { changePieceType } from './chessActions';
import { chessPieceTypes } from './constants';
import BoardSquare from './BoardSquare';
import Piece from './Piece';

export class Board extends Component {
    static propTypes = {
        popupContent: PropTypes.node,
        // from state
        positions: PropTypes.object.isRequired,
        chessPieces: PropTypes.object.isRequired,
        // from actions
        switchPawn: PropTypes.func.isRequired,
    }

    static defaultProps = {
        popupContent: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            popupContent: props.popupContent,
            pawnToSwitch: null,
        };
        this.handlePawnSwitch = ::this.handlePawnSwitch;
        this.handlePieceTypeClick = ::this.handlePieceTypeClick;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.popupContent !== this.props.popupContent) {
            this.setState({ popupContent: newProps.popupContent });
        }
    }

    handlePawnSwitch(pieceId) {
        const pieceTypeButtons = map(chessPieceTypes, type => this.renderPieceTypeButton(type));
        const popupContent = (<div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>Pick a piece to promote your pawn:</h2>
            {pieceTypeButtons}
        </div>);
        this.setState({ popupContent, pawnToSwitch: pieceId });
    }

    handlePieceTypeClick({ target = {} }) {
        const { pawnToSwitch } = this.state;
        const { switchPawn } = this.props;
        switchPawn(pawnToSwitch, target.id);
        this.setState({ popupContent: null, pawnToSwitch: null });
    }

    renderPieceTypeButton(type) {
        const buttonStyle = { margin: '5px' };
        return (
            <Button
              key={type}
              id={type}
              style={buttonStyle}
              onClick={this.handlePieceTypeClick}
            >{type}</Button>
        );
    }

    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
            <div
              key={i}
              style={{ width: '12.5%', height: '12.5%' }}
            >
                <BoardSquare x={x} y={y} switchPawn={this.handlePawnSwitch}>
                    {this.renderPiece(x, y)}
                </BoardSquare>
            </div>
        );
    }

    renderPiece(x, y) {
        const { positions, chessPieces } = this.props;
        const pieceId = getPieceOnSquare(positions, x, y);
        if (pieceId) {
            return (<Piece
              id={pieceId}
              dark={chessPieces[pieceId].dark}
              type={chessPieces[pieceId].type}
            />);
        }
        return null;
    }

    render() {
        const { popupContent } = this.state;
        const squares = [...Array(64).keys()].map((i) => this.renderSquare(i));
        const styles = {
            board: {
                width: '400px',
                height: '400px',
                display: 'flex',
                flexWrap: 'wrap',
                position: 'relative',
            },
            popup: {
                display: popupContent ? 'flex' : 'none',
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '360px',
                height: '360px',
                zIndex: '2',
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center',
            },
            boardCover: {
                display: popupContent ? 'inline' : 'none',
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '400px',
                height: '400px',
                padding: '0px',
                backgroundColor: 'black',
                opacity: '0.5',
                zIndex: '1',
            },
        };
        return (
            <div style={styles.board}>
                {squares}
                <div style={styles.boardCover} />
                <div style={styles.popup}>
                    {popupContent}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        positions: state.chess.positions,
        chessPieces: state.chess.pieces,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        switchPawn: changePieceType,
    }, dispatch);
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(Board));
