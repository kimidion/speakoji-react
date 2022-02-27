import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { ACTIONS } from '../../constants/actions';
import { keyGrid, Word } from '../../constants/keyGrid';
import { PageKey, vocab } from '../../vocab';
import './keyboard.css';
import { ACTIONS } from '../../constants/actions';
import { COLORS } from '../../constants/colors';

interface KeyboardProps {
    page: PageKey;
    filterArr: string[];
    setPage: (page: PageKey) => void;
}

const Keyboard = ({ page, filterArr, setPage }: KeyboardProps) => {
    const [keyboard, setKeyboard] = useState<Word[][]>(keyGrid);
    const keyboardEnabled = false;

    const choose = (word: Word) => {
        // change page or say the word
        return;
    }

    useEffect(() => {
      setKeyboard((prev) => {
        const remap = [ ...prev ];
        vocab[page].words.forEach((w: Word) => {
            remap[w.y][w.x] = w;
        });
        return remap;
      });
    }, [page]);

    return (
        <div
            className={classNames('grid', { 'filtered': filterArr.length } )}
        >
            {/* <Speak /> */}
            {keyboard.map((row, rowindex) => (
                <React.Fragment key={`row${rowindex + 1}`}>
                    {row.map((word, index) => (
                        <div
                            key={`${word.word}-${rowindex + 1}-${index + 1}`}
                            className={classNames('key', word.word, {'filtered': filterArr.length && word.filtered })}
                        >
                            <button
                                className={classNames('key-button', word.word, { 'inactive': (!word.word || word.word === ''), 'hide': (filterArr.length && !word.filtered)})}
                                onClick={() => choose(word)}
                            >
                                <span className="bg" style={{ backgroundColor: word.action && word.action === ACTIONS.PAGE ? COLORS.ACTIONBG : word.bg || 'transparent'}} />
                                {word.word && word.word.indexOf('core') !== 0 &&
                                    <span className="wordSpan">{word.word}</span>
                                }
                                {word.icon && word.icon !== '' &&
                                    <span className="icon"><i className="material-icons">{word.icon}</i></span>
                                }
                                {word.emoji && word.emoji !== '' &&
                                    <span className="icon">{word.emoji}</span>
                                }
                                {word.emoji === '' && word.icon === '' &&
                                    <span className="icon"><i className="material-icons">play_for_work</i></span>
                                }
                                {word.action && (word.action === ACTIONS.KEYBOARD && keyboardEnabled) &&
                                    <i className="material-icons check">check_circle</i>
                                }
                            </button>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
  }
  
  export default Keyboard;