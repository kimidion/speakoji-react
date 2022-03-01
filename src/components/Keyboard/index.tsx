import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { keyGrid, Word } from '../../constants/keyGrid';
import { PageKey, vocab } from '../../vocab';
import './keyboard.css';
import { ACTIONS } from '../../constants/actions';
import { COLORS } from '../../constants/colors';
import Speak from '../Speak';

interface KeyboardProps {
    filterArr: string[];
    setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Keyboard = ({ filterArr, setFilterOpen }: KeyboardProps) => {
    const [page, setPage] = useState<PageKey>('core');
    const [keyboard, setKeyboard] = useState<Word[][]>(keyGrid);
    const [lastWord, setLastWord] = useState<string>('');
    const [keyboardEnabled, setKeyboardEnabled] = useState<boolean>(false);

    const choose = (word: Word) => {
        if (!word.word || word.word === '') {
          return false;
        }
        switch (word.action) {
          case ACTIONS.PAGE:
            return setPage(word.word as PageKey);
          case ACTIONS.CLEAR:
            return setLastWord('#clear');
          case ACTIONS.BACK:
            return setPage('core');
          case ACTIONS.KEYBOARD:
            // this will enable the device keyboard
            return setKeyboardEnabled(prev => !prev);
          case ACTIONS.FILTER:
            // this will open the filter box
            return setFilterOpen((prev) => {
              if (!prev) {
                setPage('core');
              }
              return !prev;
            });
          default:
            if (word.action) {
              return false;
            }
            setLastWord(word.word);
            return setPage('core');
            // returning with the below line will allow the user to enter the same word more than once
            // stopping this for now until the option is moved into a setting
            // #preventButtonMashing
            // return setLastWord('#reset');
        }
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
        <div className={classNames('grid', { 'filtered': filterArr.length } )}>
            <Speak keyboardEnabled={keyboardEnabled} word={lastWord} />
            {keyboard.map((row, rowindex) => (
                <React.Fragment key={`row${rowindex + 1}`}>
                    {row.map((word, index) => (
                        <KeyboardButton
                            key={`${word.word}-${rowindex + 1}-${index + 1}`}
                            word={word}
                            filterArr={filterArr}
                            choose={choose}
                            keyboardEnabled={keyboardEnabled}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

interface KeyboardButtonProps {
  word: Word;
  filterArr: string[];
  choose: (word: Word) => void;
  keyboardEnabled: boolean;
};

const KeyboardButton = ({ word, filterArr, choose, keyboardEnabled }: KeyboardButtonProps) => {
  const [filtered, setFiltered] = useState(true);
  useEffect(() => {
    if (filterArr.length === 0 || word.action === ACTIONS.PAGE || word.action === ACTIONS.PLACEHOLDER) {
      return setFiltered(false);
    }
    if (word.word && word.word !== "") {
      return setFiltered(filterArr.indexOf(word.word.toUpperCase()) === -1);
    }
    return setFiltered(true);
  }, [filterArr, word.word, word.action]);
  return (
    <div className={classNames('key', word.word, {'filtered': filtered })}>
      <button
        className={classNames('key-button', word.word, { 'inactive': (!word.word || word.word === ''), 'hide': filtered})}
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
        {word.action && (word.action === ACTIONS.KEYBOARD && keyboardEnabled) &&
          <i className="material-icons check">check_circle</i>
        }
      </button>
    </div>
  )
}

export default Keyboard;
