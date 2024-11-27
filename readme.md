
# Gauss-Jordan Calculator

A web-based calculator to solve linear equation systems using the  **Gauss-Jordan elimination method** . This tool is useful for students, educators, and anyone interested in solving systems of equations step by step.

## Features

* Dynamically create matrices of size 2x2 to 10x10.
* Solve systems of linear equations using the Gauss-Jordan elimination method.
* Step-by-step solution display for better understanding.
* Clean and responsive design.

## Technologies Used

* **HTML5** : For the structure of the webpage.
* **CSS3** : For styling and layout.
* **JavaScript (Vanilla)** : For dynamic matrix creation and Gauss-Jordan calculations.

## How to Use

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/gauss-jordan-calculator.git
   ```
2. Open the `index.html` file in any modern browser.
3. Choose the dimension of the matrix and click  **Create Matrix** .
4. Enter the coefficients and constants of your linear equations.
5. Click **Solve** to calculate the solution step by step.
6. Reset the matrix with the **Reset** button if needed.

## Project Structure

```
gauss-jordan-calculator/
│
├── index.html        # Main HTML file
├── styles.css        # CSS for styling
├── script.js         # JavaScript for functionality
└── README.md         # Documentation
```

## Example

For the system:

```
2x + y - z = 8
-3x - y + 2z = -11
-2x + y + 2z = -3
```

Enter:

```
Matrix:
[  2   1  -1  |  8  ]
[ -3  -1   2  | -11 ]
[ -2   1   2  | -3  ]
```

The solution:

```
x = 2, y = 3, z = -1
```

## Future Improvements

* Add support for modular arithmetic (useful in cryptography).
* Allow export of results as a PDF or CSV.
* Enhance UI with additional themes.

## License

This project is open-source under the MIT License.

---

Feel free to modify the **Future Improvements** section or other parts to better fit your project's roadmap! 😊
