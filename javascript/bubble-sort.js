function bubblesort( tab ){
    
    /**
     * NOTA BENE : 
     * contrairement à l'algorithme, en programmation, la première 
     * position d'une valeur dans une liste ou un tableau est située à 0 
     * ( et non pas à 1 ). 
     * 
     * En conséquence de quoi, on soustrait une unité à toutes les valeurs faisant 
     * référence à des positions et / ou à un maximum.
     * 
     * Cette version de l'algorithme est celle présentée sur l'article de moocaccino.fr, 
     * ELLE N'EST PAS OPTIMISE AU MAXIMUM !
     * 
     * Vous devez donc chercher à améliorer vous-mêmes l'algorithme ;) , courage !
     *  
     * */

    // on déclare une variable "compteur" et on lui attribue la valeur 0
    let compteur = 0;
    
    // on déclare une variable "position" et on lui attribue la valeur 0
    let position = 0;

    // on déclare une variable "max" et on lui attribue comme valeur le nombre d'élements au sein du tableau / liste de valeurs
    let max = tab.length;

    // on déclare une variable nommée "tmp" et on lui attribue la valeur 0,
    // pour échanger les élements de place, on a besoin d'une variable temporaire
    let tmp = 0; 
    
    // Tant que "compteur" ( initialisée à 0 ) est inférieure à "max - 1" 
    // répéter les opérations suivantes PUIS incrémenter "compteur" d'une unité
    for( compteur = 0; compteur < max - 1; compteur++ ){

        // Tant que "position" ( initialisée à 0 ) est inférieure à "max - 1" 
        // répéter les opérations suivantes PUIS incrémenter "position" d'une unité
        for( position = 0; position < max - 1; position++ ){

            // si l'élément situé en en position "position" est supérieur à l'élement 
            // situé en position "position + 1" ( donc le suivant ), alors ... 
            if( tab[position] > tab[position+1]){

                // On stocke dans la variable "tmp" la valeur de l'élément situé en position "position + 1"
                // On fait cela afin de conserver sa valeur pour plus tard. 
                tmp = tab[position+1]; 

                // On réécrit la valeur se trouvant à la position "position + 1" et on lui attribue la valeur 
                // de l'élement situé en position "position",ce qui efface la précédente valeur ( c'est pour cela )
                // qu'on la sauvegardé dans notre variable "tmp".
                tab[position+1] = tab[position]; 

                // On réécrit la valeur se trouvant à la position "position", et on lui attribue la valeur 
                // qui est stockée en sein de la variable "tmp"
                tab[position] = tmp;
            }
        }
    }
}