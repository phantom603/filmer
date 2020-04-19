import React from 'react';
import PropTypes from 'prop-types';

import style from "./MovieParameter.module.scss";

const MovieParameter = (props) => (
    <div className={style.container}>
        <div className={style.title}>{props.title}</div>
        <div className={style.value}>{props.value}</div>
    </div>
)

MovieParameter.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
}

export default MovieParameter;