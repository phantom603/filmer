import React from 'react';

import { EnumKeys } from "../../utils/enums";
import { focusNextItem, focusPrevItem } from "../../utils/roving-focus";

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import style from './GenresNav.module.scss';

class GenresNav extends React.Component {
    refs;
    setRef = (ref, index) => this.refs.set(index, ref);
    focus = id => this.refs.get(id).focus();

    onKeyPressed = (e, genreId) => {
        switch (e.keyCode) {
            case EnumKeys.UP:
                e.preventDefault();
                focusPrevItem(e.target);
                break;
            case EnumKeys.DOWN:
                e.preventDefault();
                focusNextItem(e.target);
                break;
            case EnumKeys.RIGHT:
            case EnumKeys.ENTER:
                this.props.onGenreSelect(genreId);
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.focus(this.props.selectedGenreId);
    }

    componentDidUpdate() {
        this.props.focus && this.focus(this.props.selectedGenreId);
    }

    render() {
        const { data } = this.props;
        this.refs = new Map();

        return (
            <div className={style.nav}>
                {Object.keys(data).map(key =>
                    <div className={`${style.item} ${data[key].selected && style.selected}`}
                         onKeyDown={(e) => this.onKeyPressed(e, data[key].id)}
                         tabIndex="1"
                         key={data[key].id}
                         ref={el => this.setRef(el, data[key].id)}
                    >
                        {data[key].name}
                        {data[key].selected && <ArrowForwardIosIcon fontSize="small" color="secondary"/>}
                    </div>
                )}
            </div>
        )
    }
}

export default GenresNav;