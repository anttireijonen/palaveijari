import './App.css';
import Grid from './grid/Grid';

function App() {
  return (
    <>
    <div style={{height: '100vh'}}>
    <Grid/>
    <div id="modal" className="modal">
      <div className="modal-content">
        <span id="closeModalBtn" className="close">&times;</span>
        <h2>Bingo</h2>
        <p>Hyvää onnea jos ei oma riitä!</p>
      </div>
    </div>
    </div>
    </>
  );
}

export default App;
