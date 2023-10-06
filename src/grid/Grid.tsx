import { useEffect, useState } from "react";
import { BingoWordProvider } from "./bingoWordProvider";
import { Bingo } from "../domain/bingoLogic";
import Modal from "./Modal";

function Grid() {

    const [bingoInstance, setBingoInstance] = useState<Bingo | null>(null);

    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        let bingoWordProvider = new BingoWordProvider();
        const fetchData = async () => {
             const wordArray = await bingoWordProvider.getWords();
             setBingoInstance(new Bingo(wordArray, false));
        }
      
        fetchData().catch(console.error);
    }, [])

    const checkWord = (word: string, e: any) => {
        e.preventDefault();

        if (bingoInstance?.hasBingo()) {
            setGameOver(true);
            return;
        }
        bingoInstance?.checkWord(word);
        if (bingoInstance?.hasBingo()) {
            setGameOver(true);
        }
        e.target.style.backgroundColor = 'green';
    }


  return (
    <>
    {bingoInstance == null ? 
    <div>Ladataan..</div> :
    <><table id="bingo-grid">
                  <tbody>
                      {bingoInstance.getRows().map((element, i) => <tr key={i}>{element.items.map(item => <td key={item.word} className={''} onClick={(e) => checkWord(item.word, e)}>{item.word}</td>)}</tr>)}
                  </tbody>
              </table>
              <Modal show={gameOver} handleClose={setGameOver}/></>}
    </>
  );
}

export default Grid;
