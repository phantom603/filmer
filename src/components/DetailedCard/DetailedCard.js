import React from 'react';
import style from './DetailedCard.module.scss';
import videoPlug from './assets/plug.png';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

import { EnumKeys } from "../../utils/enums";
import { focusNextItem, focusPrevItem } from "../../utils/roving-focus";
import MovieParameter from "./components/MovieParameter/MovieParameter";

class DetailedCard extends React.Component {
    playBtnRef = React.createRef();

    onKeyPressed = (e, onSubmit) => {
        switch (e.keyCode) {
            case EnumKeys.BACK:
                this.props.onClose();
                break;
            case EnumKeys.RIGHT:
                focusNextItem(e.target);
                break;
            case EnumKeys.LEFT:
                focusPrevItem(e.target);
                break;
            case EnumKeys.ENTER:
                onSubmit.call();
                break;
            default:
                break;
        }
    };

    componentDidMount() {
        setTimeout(()=>{ // hack for animation
            this.playBtnRef.current.focus();
        }, 300)
    }

    playMovie() {
        alert('Movie is playing')
    }

    playTrailer() {
        alert('Trailer is playing')
    }

    addToPlaylist() {
        alert('Added to playlist')
    }

    render() {
        const { data } = this.props;
        return (
            <div className={style.container}>
                <div className={style.title}>{data.title}</div>
                <div className={style.main}>
                    <div className={style.mainLeft}>
                        <div className={style.parametersWrapper}>
                            <MovieParameter title="Lengde" value="1 time 23 min"/>
                            <MovieParameter title="Land" value="USA"/>
                            <MovieParameter title="Sprak" value={data['original_language']}/>
                        </div>

                        <div className={style.image}>
                            <img src={videoPlug} alt="Preview"/>
                        </div>

                        <div className={style.controls}>
                            <div tabIndex={0}
                                 className={style.btn}
                                 onKeyDown={(e) => this.onKeyPressed(e, this.playMovie)}
                                 ref={this.playBtnRef}
                            >
                                <PlayArrowIcon classes={{ root: style.icon }}/>
                                Se Na
                            </div>
                            <div tabIndex={0}
                                 className={style.btn}
                                 onKeyDown={(e) => this.onKeyPressed(e, this.playTrailer)}
                            >
                                <VisibilityIcon classes={{ root: style.icon }}/>
                                Trailer
                            </div>
                            <div
                                tabIndex={0}
                                className={style.btn}
                                onKeyDown={(e) => this.onKeyPressed(e, this.addToPlaylist)}
                            >
                                <PlaylistAddIcon classes={{ root: style.icon }}/>
                                Huskeliste
                            </div>

                        </div>
                    </div>
                    <div className={style.mainRight}>
                        <div className={style.overview}>{data.overview}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailedCard;
