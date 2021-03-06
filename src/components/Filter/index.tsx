import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { PageKey, vocab } from '../../vocab';
import './filter.css';

interface FilterProps {
  filterArr: string[];
  setFilterArr: React.Dispatch<React.SetStateAction<string[]>>;
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter = ({ filterArr, setFilterArr, filterOpen, setFilterOpen }: FilterProps) => {
  const [lookup, setLookup] = useState<string>('');
  const [wordList, setWordList] = useState<string[]>([]);
  const handleReset = () => {
    setLookup('');
    setFilterArr([]);
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLookup(event.target.value);
  };

  useEffect(() => {
    const keys = Object.keys(vocab) as PageKey[];
    const list = [] as string[];
    keys.forEach((page: PageKey) => {
      vocab[page].words.forEach((word) => {
        if (word.word && word.word !== '' && !word.action) {
          list.push(word.word.toUpperCase());
        }
      });
    });
    setWordList(list.sort());
  }, []);
  return (
    <div id="filter">
      <div className={classNames("filterOverlay", { open: filterOpen })}>
        <button className="closebtn" onClick={() => setFilterOpen((prev: boolean) => !prev)}>
            <i className="material-icons">close</i>
        </button>
        <div className="filter">
          <h3>
            <button className="resetFilters" onClick={handleReset}>RESET</button>
            Quick filter
          </h3>
          <input type="text" placeholder="search" value={lookup} onChange={handleTextChange} />
          <button className="clearInput" onClick={() => setLookup('')}>CLEAR</button>
          <div className="wordList">
            {wordList && lookup && filterArr && wordList.map((word: string) => {
              if (lookup !== '' && word.indexOf(lookup.toUpperCase()) === -1){
                return null;
              }
              return (
                <WordButton key={word} filterArr={filterArr} setFilterArr={setFilterArr} word={word} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface WordButtonProps {
  filterArr: string[];
  setFilterArr: React.Dispatch<React.SetStateAction<string[]>>;
  word: string;
}

const WordButton = ({ filterArr, setFilterArr, word }: WordButtonProps) => {
  const [selected, setSelected] = useState<boolean>(false);

  const filterWord = (word: string) => {
    setFilterArr((prev: string[]) => {
      const filtered = [...prev];
      // if it's already selected, remove from the filter list
      // else add it to the filter list
      if (filterArr.indexOf(word) !== -1) {
        filtered.splice(filtered.indexOf(word), 1);
      } else {
        filtered.push(word);
      }
      return filtered;
    })
  };

  useEffect(() => {
    setSelected(filterArr.indexOf(word) !== -1);
  }, [filterArr, word]);

  return (
    <button className={classNames("option", { "selected": selected })} onClick={() => filterWord(word)}>
      {selected ? '???? ' : '??? '}
      {word}
    </button>
  )
};

export default Filter;