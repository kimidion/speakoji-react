import { useState, useEffect } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import { keyGrid, Word } from './constants/keyGrid';
import { PageKey, vocab } from './vocab';

{/* <script>
    import Keyboard from '../components/Keyboard.svelte';
    import Filter from '../components/Filter.svelte';
    import Settings from '../components/Settings.svelte';
    import UpdatePrompt from '../components/UpdatePrompt.svelte';
    import RotatePrompt from '../components/RotatePrompt.svelte';
</script>

<div class="mainKeyboard">
    <Keyboard />
</div>
<Filter />
<Settings />
<UpdatePrompt />
<RotatePrompt /> */}

function App() {
    const [page, setPage] = useState<PageKey>('core');
    const handlePageChange = (page: PageKey) => {
        setPage(page);
    }
    return (
        <div className="screen">
            <h1>Speakoji - Motor Memory AAC</h1>
            <Keyboard page={page} filterArr={[]} setPage={handlePageChange} />
        </div>
    );
}

export default App;
