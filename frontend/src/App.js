import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './index.css';

function App() {
  return (
    <div className="app-root">
      <PipelineToolbar />
      <main className="app-main">
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
