# 📘 Key JavaScript Concepts (Explained Simply)

### 1️⃣ Difference between `var`, `let`, and `const`

In JavaScript, we use `var`, `let`, and `const` to create variables. Each behaves differently.

- **`var`** → Old-school way  
  It has **function scope** (visible anywhere inside the function).  
  You can redeclare and reassign it.  
  ```js
  var score = 100;
  score = 150;       // Works
  var score = 200;   // Also works (no error)
  ```

- **`let`** → Modern & safer  
  It has **block scope** (only works inside `{}`).  
  You can reassign, but you **cannot redeclare** in the same block.  
  ```js
  let age = 22;
  age = 23;          // Works
  // let age = 25;   // Error! Cannot redeclare
  ```

- **`const`** → For values that shouldn’t change  
  Also has **block scope**.  
  You **cannot reassign** after the first value.  
  ```js
  const country = "Bangladesh";
  // country = "India";   // Error! Assignment to constant variable
  ```

---

### 2️⃣ Spread Operator (`...`)

Three dots `...` — used to **spread** or **copy** elements from arrays or objects.

Super useful for:
- Copying an array
- Merging arrays
- Adding new items easily

```js
const oldFriends = ["Ratul", "Mim", "Sohan"];
const newFriends = [...oldFriends, "Tisha", "Nabil"];

console.log(newFriends);
// Output: ["Ratul", "Mim", "Sohan", "Tisha", "Nabil"]
```

---

### 3️⃣ `map()`, `filter()`, and `forEach()` — What’s the difference?

These are very common array methods.

- **`map()`** → Changes every item and returns a **new array**  
  ```js
  const marks = [40, 55, 70];
  const doubled = marks.map(num => num * 2);
  // doubled = [80, 110, 140]
  ```

- **`filter()`** → Keeps only items that match a condition → returns a **new array**  
  ```js
  const ages = [15, 18, 21, 14, 25];
  const adults = ages.filter(age => age >= 18);
  // adults = [18, 21, 25]
  ```

- **`forEach()`** → Just runs a function for each item → **doesn’t return anything**  
  ```js
  const names = ["Tisha", "Riya", "Anika"];
  names.forEach(name => console.log("Hi " + name + "!"));
  ```

---

### 4️⃣ Arrow Functions

A shorter, cleaner way to write functions using `=>` instead of the `function` keyword.

```js
// Old style
function multiply(a, b) {
  return a * b;
}

// Arrow function
const multiply = (a, b) => a * b;

// Even shorter (one line = implicit return)
const add = (x, y) => x + y;
```

Great for short functions, especially in `.map()`, `.filter()`, etc.

---

### 5️⃣ Template Literals (Backticks `` ` ``)

Forget `+` for string concatenation. Use backticks and `${}` to insert variables — much cleaner!

```js
const student = "Tirtho";
const age = 24;

const intro = `My name is ${student}, I am ${age} years old.`;
console.log(intro);
// Output: My name is Tirtho, I am 24 years old.
```

Looks way more readable, especially with multiple variables.