interface BingoWordItem {
    word: string;
    isChecked: boolean;
}

interface BingoRow {
    items: BingoWordItem[];
}

class Bingo {
    private words: string[] = [];
    private bingoRows: BingoRow[] = []; // Array to store rows
    private isBingoAchieved = false; // Flag to track whether Bingo is achieved
    
    constructor(words: string[], shuffle: boolean = true) {
        this.words = words;
        if (shuffle) {
            this.shuffleWords();
        }
        this.splitWordsIntoRows();
    }

    public checkWord(word: string): void{
        this.bingoRows.forEach(x => {
            let rowItem: BingoWordItem | undefined = x.items.find(i => i.word === word);
            
            if (rowItem) {
                rowItem.isChecked = true;
            };
        })
    }

    public hasBingo(): boolean
    {
        if (!this.isBingoAchieved) {
            let hasBingo = this.checkRowsForBingo() || this.checkColumnsForBingo() || this.checkDiagonalBingo();
            this.isBingoAchieved = hasBingo;
            return this.isBingoAchieved;
        }
        
        return false;
    }

    public getRows(): BingoRow[] {
        return this.bingoRows;
    } 

    private checkRowsForBingo(): boolean {
        let hasBingo: boolean = false;

        this.bingoRows.forEach(row => {
            if (row.items.filter(r => r.isChecked).length === row.items.length) {
                hasBingo = true;
            }
        })

        return hasBingo;
    }

    private checkRowForBingo(row: BingoRow): boolean {
        return row.items.filter(r => r.isChecked).length === row.items.length;
    }

    private checkDiagonalBingo(): boolean {
        let hasBingo: boolean = false;
        let row: BingoRow = {items: []};

        for (let i = 0; i < 5; i++) { 
            row.items.push(this.bingoRows[i].items[i]);
        }

        if (this.checkRowForBingo(row)) {
            hasBingo = true;
        }

        row = {items: []};

        let rowNumber = 0;
        for (let i = 4; i >= 0; i--) {
            let columnIdx = i;
            row.items.push(this.bingoRows[rowNumber].items[columnIdx]);
            rowNumber++;
        }

        if (this.checkRowForBingo(row)) {
            hasBingo = true;
        }
        return hasBingo;
    }

    private checkColumnsForBingo(): boolean {
        let hasBingo: boolean = false;
        for (let i = 0; i < 5; i++) {
            let row: BingoRow = {items: []};
            this.bingoRows.forEach(x => row.items.push(x.items[i]));
            if (row.items.filter(r => r.isChecked).length === row.items.length) {
                hasBingo = true;
            }
        }
       
        return hasBingo;
    }

    private shuffleWords(): void {
        for (let i = this.words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
    }

    private splitWordsIntoRows() {
        if (this.words.length < 25) {
            throw new Error("Too few word elements");
        }

        if (this.words.length > 25) {
            this.words = this.words.slice(0, 25);
        }

        for (let i = 0; i < this.words.length; i += 5) {
            let words: string[] = this.words.slice(i, i + 5);
            let typedWords: BingoWordItem[] = words.map((x: string) => ({isChecked: false, word: x} as BingoWordItem));
            this.bingoRows.push({ items: typedWords})
        }
    }
}

export {Bingo};
