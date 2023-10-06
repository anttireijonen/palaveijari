class BingoWordProvider {
    async getWords(): Promise<string[]>
    {
        const response = await fetch('words.txt');
        
        if (!response.ok) {
            throw new Error("Words couldn't be loaded");
        }
        const text = await response.text();
        const words = text.split('\n').map(line => line.trim()).filter(line => line !== ''); // Filter out empty lines
        return words;
    };
}

export { BingoWordProvider };
   