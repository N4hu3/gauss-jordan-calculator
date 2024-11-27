function createMatrix() {
    const dimension = parseInt(document.getElementById('dimension').value);
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';

    const table = document.createElement('table');
    
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension + 1; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
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
            matrix[i][j] = parseFloat(input.value) || 0;
        }
    }
    
    return matrix;
}

function displayStep(step, matrix) {
    const stepsDiv = document.getElementById('steps');
    const stepDiv = document.createElement('div');
    stepDiv.innerHTML = `<p>${step}</p>`;
    
    const table = document.createElement('table');
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
    const n = matrix.length;
    const steps = document.getElementById('steps');
    steps.innerHTML = '<h3>Pasos de la solución:</h3>';

    // Gauss-Jordan elimination
    for (let i = 0; i < n; i++) {
        // Make the diagonal element 1
        const pivot = matrix[i][i];
        displayStep(`Dividiendo fila ${i + 1} por ${pivot}`, matrix);
        
        for (let j = i; j < n + 1; j++) {
            matrix[i][j] /= pivot;
        }
        
        // Make other elements in column i equal to 0
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const factor = matrix[k][i];
                displayStep(`Restando ${factor} veces la fila ${i + 1} de la fila ${k + 1}`, matrix);
                
                for (let j = i; j < n + 1; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                }
            }
        }
    }

    // Display final results
    displayStep("Solución final:", matrix);
    
    // Display solution in readable format
    let solution = "<h3>Solución del sistema:</h3>";
    for (let i = 0; i < n; i++) {
        solution += `x${i + 1} = ${matrix[i][n].toFixed(4)}<br>`;
    }
    steps.innerHTML += solution;
}

function resetMatrix() {
    document.getElementById('steps').innerHTML = '';
    createMatrix();
}

// Inicializar la matriz al cargar la página
window.onload = createMatrix;
