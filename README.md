# Behavior Driven Development (B.D.D)

On ajoute des tests orientés comportement. 
Contrairement à la première version, ces tests ne sont pas "fragiles", ils ne contraignent pas l'implémentation. 
Du moment que l'Emitter respecte le contrat d'interface, peu importe sa structure interne, ses façons de faire, 
les tests passeront. De plus, on ne vérifie plus si l'implémentation retourne des structures de type tableaux etc ... 
Bref, on vérifie uniquement des comportements, et cela nous laisse beaucoup plus de possibilités de refactoring.