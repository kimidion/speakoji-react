import Speech from 'speak-tts';
import { useEffect, useState } from "react";
import './speak.css';

// changing this file to a regular jsx bc the speak-tts pkg is not typed and causes some issues with tsx
// interface SpeakProps {
//   word: string;
//   keyboardEnabled: boolean;
// }

const Speak = ({ word, keyboardEnabled }) => {
  const [phrase, setPhrase] = useState('');
  const [speaker, setSpeaker] = useState(new Speech());
  const deleteLastWord = () => {
    const words = phrase.split(' ');
    words.pop();
    setPhrase(words.join(' '));
  };
  const playSpeech = (say) => {
    const sayThis = say && say !== '' ? say : phrase;
    speaker.speak({
      text: sayThis.toLowerCase(),
      queue: false,
      listeners: {
        onstart: () => {
          // console.log("Start utterance");
        },
        onend: () => {
          // console.log("End utterance");
        },
        onresume: () => {
          // console.log("Resume utterance");
        },
        onboundary: event => {
          // console.log(
          //   event.name +
          //     " boundary reached after " +
          //     event.elapsedTime +
          //     " milliseconds."
          // );
        }
      }
    })
    .then(data => {
      // console.log("Success !", data);
    })
    .catch(e => {
      alert(e);
      console.error("An error occurred :", e);
    });
  };

  const handleTextChange = (event) => {
    setPhrase(event.target.value);
  };

  useEffect(() => {
    const tts = new Speech(); // will throw an exception if not browser supported
    tts.init({
      'volume': 1,
          'lang': 'en-US',
          'rate': 1,
          'pitch': 2,
          'splitSentences': true,
    }).then(() => {
      // The "data" object contains the list of available voices and the voice synthesis params
      // console.log("Speech is ready, voices are available", data);
      setSpeaker(tts);
    }).catch((e) => {
      alert(e);
      console.error("An error occured while initializing : ", e);
    });
  }, []);

  useEffect(() => {
    if (word && word !== '#reset' && word !== '#clear') {
      playSpeech(word);
      setPhrase(prev => {
        return `${prev} ${word}`;
      })
    } else if (word && word === '#clear') {
      setPhrase('');
    }
  }, [word]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyboardEnabled) {
      document.getElementById("textBox").focus();
    }
  }, [keyboardEnabled])

  return (
    <>
      <div className="textBox">
        <textarea id="textBox" readOnly={!keyboardEnabled} value={phrase} onChange={handleTextChange}>{phrase}</textarea>
      </div>
      <div className="key">
        <button className="delete speak-key-button key-button" onClick={deleteLastWord}>
          <i className="material-icons">backspace</i>
        </button>
      </div>
      <div className="key">
        <button className="speak speak-key-button key-button" onClick={() => playSpeech(phrase)}>
          <i className="material-icons">play_circle_filled</i>
        </button>
      </div>
    </>
  );
}

export default Speak;