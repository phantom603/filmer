import React from 'react';

import { EnumKeys } from "../../utils/enums";
import { focusAboveItem, focusBelowItem, focusNextItem, focusPrevItem } from "../../utils/roving-focus";

import style from './Gallery.module.scss';

const itemsInRow = 5;

class Gallery extends React.Component {
    refs;
    setRef = (ref, index) => this.refs.set(index, ref);
    focus = id => this.refs.get(id).focus()

    onKeyPressed = (e, movieId) => {
        switch (e.keyCode) {
            case EnumKeys.BACK:
                this.props.onBack();
                break;
            case EnumKeys.UP:
                e.preventDefault();
                focusAboveItem(e.target, itemsInRow);
                break;
            case EnumKeys.RIGHT:
                focusNextItem(e.target)
                break;
            case EnumKeys.DOWN:
                e.preventDefault();
                focusBelowItem(e.target, itemsInRow);
                break;
            case EnumKeys.LEFT:
                e.target.previousElementSibling === null ? this.props.onBack() : focusPrevItem(e.target)
                break;
            case EnumKeys.ENTER:
                this.props.onMovieSelect(movieId);
                break;
            default:
                break;
        }
    };

    componentDidUpdate() {
        if (this.props.focusId !== null) {
            this.focus(this.props.focusId);
        }
    }

    render() {
        const { data } = this.props;
        this.refs = new Map();
        return (
            <div className={style.container}>
                {data.map((item) =>
                    <div
                        tabIndex="1"
                        className={style.item}
                        key={item.id}
                        onKeyDown={(e) => this.onKeyPressed(e, item.id)}
                        ref={el => this.setRef(el, item.id)}
                    >
                        <img
                            src={item.poster_path}
                            alt={item.title}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default Gallery;
