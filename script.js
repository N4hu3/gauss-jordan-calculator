function createMatrix() {
    const dimension = parseInt(document.getElementById('dimension').value);
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension + 1; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('form-control');
            input.step = 'any';
            input.value = '0';
            input.dataset.row = i;
            input.dataset.col = j;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
}

function getMatrix() {
    const dimension = parseInt(document.getElementById('dimension').value);
    const matrix = [];

    for (let i = 0; i < dimension; i++) {
        matrix[i] = [];
        for (let j = 0; j < dimension + 1; j++) {
            const input = document.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
            if (!input || isNaN(parseFloat(input.value))) {
                alert('Please fill all matrix cells correctly.');
                return null;
            }
            matrix[i][j] = parseFloat(input.value);
        }
    }

    return matrix;
}

function displayStep(step, matrix) {
    const stepsDiv = document.getElementById('steps');
    const stepDiv = document.createElement('div');
    stepDiv.innerHTML = `<p>${step}</p>`;

    const table = document.createElement('table');
    table.classList.add('table', 'table-sm', 'table-striped');
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = matrix[i][j].toFixed(4);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    stepDiv.appendChild(table);
    stepsDiv.appendChild(stepDiv);
}

function solveGaussJordan() {
    const matrix = getMatrix();
    if (!matrix) return;

    const n = matrix.length;
    const steps = document.getElementById('steps');
    steps.innerHTML = '<h3>Solution Steps:</h3>';

    const tolerance = 1e-10;

    for (let i = 0; i < n; i++) {
        // Check if pivot is too small
        if (Math.abs(matrix[i][i]) < tolerance) {
            alert(`Pivot too small (close to zero) at row ${i + 1}. Cannot proceed.`);
            return;
        }

        // Divide row by the pivot
        const pivot = matrix[i][i];
        for (let j = i; j < n + 1; j++) {
            matrix[i][j] /= pivot;
        }
        displayStep(`Dividing row ${i + 1} by ${pivot.toFixed(4)}`, JSON.parse(JSON.stringify(matrix)));

        // Subtract multiples of the row to make other column elements zero
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = matrix[k][i];
                for (let j = i; j < n + 1; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                }
                displayStep(`Subtracting ${factor.toFixed(4)} times row ${i + 1} from row ${k + 1}`, JSON.parse(JSON.stringify(matrix)));
            }
        }
    }

    // Display final results
    displayStep("Final Solution", matrix);

    let solution = '<h4>Solution:</h4>';
    for (let i = 0; i < n; i++) {
        solution += `x${i + 1} = ${matrix[i][n].toFixed(4)}<br>`;
    }
    steps.innerHTML += solution;
}

function resetMatrix() {
    document.getElementById('steps').innerHTML = '';
    createMatrix();
}

window.onload = createMatrix;
