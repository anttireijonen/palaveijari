// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to split words into rows
function splitWordsIntoRows(words) {
    var rows = [];
    for (var i = 0; i < words.length; i += 5) {
        rows.push(words.slice(i, i + 5));
    }
    return rows;
}

// Initialize variables
var bingoWords = []; // Array to store words
var bingoRows = []; // Array to store rows
var selectedWords = new Set(); // Set to track selected words
var isBingoAchieved = false; // Flag to track whether Bingo is achieved
var bingoConditionsMet = 0; // Number of Bingo conditions met

// Function to check for a Bingo win
function checkForBingo() {
    if (isBingoAchieved) {
        return; // Exit the function if Bingo has already been achieved
    }

    var selectedWordsArray = Array.from(selectedWords); // Convert the Set to an array

    // Check rows, columns, and diagonals
    if (
        checkRowsForBingo(selectedWordsArray) ||
        checkColumnsForBingo(selectedWordsArray) ||
        checkDiagonalsForBingo(selectedWordsArray)
    ) {
        bingoConditionsMet++; // Increment the count of Bingo conditions met
        if (bingoConditionsMet === 1) {
            openModal(); // Display Bingo overlay when the first condition is met
            isBingoAchieved = true;
        }
    }
}

// Function to check rows for Bingo
function checkRowsForBingo(selectedWordsArray) {
    for (var i = 0; i < bingoRows.length; i++) {
        var row = bingoRows[i];

        // Ensure that the row contains 5 items before checking for five-in-a-row
        if (row.length === 5) {
            var selectedWordsInRow = calculateSelectedWordsInRow(row, selectedWordsArray);

            if (selectedWordsInRow.length === 5) {
                return true;
            }
        }
    }

    return false;
}

// Function to check columns for Bingo
function checkColumnsForBingo(selectedWordsArray) {
    for (var j = 0; j < bingoRows[0].length; j++) {
        var column = bingoRows.map(row => row[j]);
        var selectedWordsInColumn = filterArray(column, word => selectedWordsArray.includes(word));

        if (selectedWordsInColumn.length === 5) {
            return true;
        }
    }

    return false;
}

// Function to check diagonals for Bingo
function checkDiagonalsForBingo(selectedWordsArray) {
    var diagonal1 = bingoRows.map((row, i) => row[i]);
    var diagonal2 = bingoRows.map((row, i) => row[bingoRows.length - i - 1]);

    var selectedWordsInDiagonal1 = filterArray(diagonal1, word => selectedWordsArray.includes(word));
    var selectedWordsInDiagonal2 = filterArray(diagonal2, word => selectedWordsArray.includes(word));

    if (selectedWordsInDiagonal1.length === 5) {
        return true;
    }

    if (selectedWordsInDiagonal2.length === 5) {
        return true;
    }

    return false;
}

// Function to display "Bingo!" text
function displayBingo() {
    var bingoText = document.createElement('p');
    bingoText.textContent = 'Bingo!';
    document.body.appendChild(bingoText);
}

// Utility function to filter an array based on a condition
function filterArray(arr, condition) {
    var filtered = [];
    for (var i = 0; i < arr.length; i++) {
        if (condition(arr[i])) {
            filtered.push(arr[i]);
        }
    }
    return filtered;
}

// Function to calculate selected words in a row
function calculateSelectedWordsInRow(row, selectedWordsArray) {
    var selectedWordsInRow = [];
    for (var j = 0; j < row.length; j++) {
        if (selectedWordsArray.includes(row[j])) {
            selectedWordsInRow.push(row[j]);
        }
    }
    return selectedWordsInRow;
}

// Function to read words from the text file using AJAX
function readWordsFromFile() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'words.txt', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var lines = xhr.responseText.split('\n');
            bingoWords = lines.map(line => line.trim()).filter(line => line !== ''); // Filter out empty lines

            // Shuffle the array of words
            shuffleArray(bingoWords);

            bingoRows = splitWordsIntoRows(bingoWords); // Split words into rows
            populateBingoGrid();
        }
    };

    xhr.send();
}

// Function to populate the Bingo grid with words and add click event listeners
function populateBingoGrid() {
    var table = document.getElementById('bingo-grid');
    var wordsToUse = bingoWords.slice(0, 25); // Take the first 25 words

    for (var i = 0; i < 5; i++) { // Always create 5 rows
        var tableRow = document.createElement('tr');

        for (var j = 0; j < 5; j++) { // Always create 5 cells in each row
            var cell = document.createElement('td');
            cell.textContent = wordsToUse[i * 5 + j];

            // Add a click event listener to mark/unmark the cell when clicked
            cell.addEventListener('click', function () {
                if (!this.classList.contains('bg-success') && !isBingoAchieved) {
                    this.classList.add('bg-success');
                    selectedWords.add(this.textContent); // Add the selected word to the set
                    checkForBingo(); // Check for a Bingo win after each click

                    // Debug log for the clicked word
                    console.log('Clicked word:', this.textContent);
                }
            });

            tableRow.appendChild(cell);
        }

        table.appendChild(tableRow);
    }

    // Check if there are more words than 25
    if (bingoWords.length > 25) {
        console.log('Warning: There are more than 25 words. The grid cannot be fully populated.');
    }
}

const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);

// Close modal if user clicks outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
// Call the function to read words from the text file
readWordsFromFile();
