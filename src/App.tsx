import { useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Keyboard from './components/Keyboard';
import RotatePrompt from './components/RotatePrompt';

function App() {
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [filterArr, setFilterArr] = useState<string[]>([]);
    return (
        <div className="screen">
            <h1>Speakoji - Motor Memory AAC</h1>
            <Keyboard
                filterArr={filterArr}
                setFilterOpen={setFilterOpen}
            />
            <Filter
                filterArr={filterArr}
                setFilterArr={setFilterArr}
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
            />
            <RotatePrompt />
        </div>
    );
}

export default App;
