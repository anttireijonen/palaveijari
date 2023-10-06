import { Bingo } from "./bingoLogic";

const phrases: string[] = [
    "Askelmerkit", // 1
    "Edistää",
    "Edistely",
    "Kuuntelupotilas",
    "Palaveijari",
    "Kursoriteetti", // 2
    "Vähiten huono",
    "Nauruversio",
    "Huutonauruversio",
    "Itkunauruversio",
    "Nosto", // 3
    "Hyvä nosto",
    "Mahtava porukka",
    "Lähteä vähän aikaisemmin",
    "Mitäs sitte?",
    "Kela skeleton", // 4
    "Parasta AssisDentia",
    "Ugh",
    "Otetaas pienet",
    "Apina tipahti selästä",
    "Mennä oikeisiin töihin", // 5
    "Amerikantemppu",
    "Hyvin lyhyesti",
    "Kaista",
    "Kevätjuhlaliikket", 
    "Kovaa ajoa", // END
    "Risuja, ruusuja, turhia toiveita",
    "Vierihoito"
  ];

it('parses the words on initalization', () => {
    var bingo = new Bingo(phrases, false);
})

it('manages to handle horizontal bingo', () => {
    var bingo = new Bingo(phrases, false);
    
    bingo.checkWord("Askelmerkit");
    bingo.checkWord("Edistää");
    bingo.checkWord("Edistely");
    bingo.checkWord("Kuuntelupotilas");
    bingo.checkWord("Palaveijari");

    expect(bingo.hasBingo()).toBeTruthy();
})

it('manages to handle vertical bingo', () => {
    var bingo = new Bingo(phrases, false);
    
    bingo.checkWord("Askelmerkit");
    bingo.checkWord("Kursoriteetti");
    bingo.checkWord("Nosto");
    bingo.checkWord("Kela skeleton");
    bingo.checkWord("Mennä oikeisiin töihin");

    expect(bingo.hasBingo()).toBeTruthy();
})

it('manages to handle diagonal bingo', () => {
    var bingo = new Bingo(phrases, false);
    
    bingo.checkWord("Askelmerkit");
    bingo.checkWord("Vähiten huono");
    bingo.checkWord("Mahtava porukka");
    bingo.checkWord("Otetaas pienet");
    bingo.checkWord("Kevätjuhlaliikket");

    expect(bingo.hasBingo()).toBeTruthy();
})

it('manages to handle diagonal bingo other way', () => {
    var bingo = new Bingo(phrases, false);

    bingo.checkWord("Palaveijari");
    bingo.checkWord("Huutonauruversio");
    bingo.checkWord("Mahtava porukka");
    bingo.checkWord("Parasta AssisDentia");
    bingo.checkWord("Mennä oikeisiin töihin");

    expect(bingo.hasBingo()).toBeTruthy();
})