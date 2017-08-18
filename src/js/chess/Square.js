/* Copyright 2016 Novartis Institutes for BioMedical Research Inc. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
    static propTypes = {
        children: PropTypes.node,
        dark: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        dark: false,
    }

    render() {
        const { dark, children } = this.props;

        const squareStyle = {
            width: '30px',
            height: '30px',
            backgroundColor: dark ? '#663300' : '#cc8800',
            padding: '10px',
            textAlign: 'center',
        };

        return <div style={squareStyle}>{children}</div>;
    }
}
