function fibonacci(n) {
    // Si "n" vaut 2, retourner la valeur 1 et stopper l'algorithme.
    if (n == 2)
        return 1;

    // Si "n" vaut 1, retourner la valeur 0 et stopper l'algorithme.
    if (n == 1)
    return 0;
    
    // Si "n" est inférieur à 1, retourner la valeur 0 et stopper l'algorithme.
    if (n < 1)
        return 0;

    // Créer une valeur nommée "result" et initialiser sa valeur à 0.
    let result = 0;
    // Créer une valeur nommée "a" et initialiser sa valeur à Fibo(n - 1)
    let a = fibonacci(n - 1);
    // Créer une valeur nommée "b" et initialiser sa valeur à Fibo(n - 2)
    let b = fibonacci(n - 2);
    // Stocker dans "result"la valeur correspondant à "a + b"
    result = a + b;
    return result;
}

for( let i = 0; i < 20; i++ ){
    console.log(fibonacci(i));
}