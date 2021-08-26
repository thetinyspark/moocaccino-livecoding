# Liste des comportements à tester pour du TDD - BDD sur le design pattern observer

## Fonctionnalité: 
- Il existe une entité, que l'on nommera "Emitter" qui permet d'émettre des évènements spécifiques.
- Il existe des entités nommées "Observer" qui peuvent écouter les évènements émis par l'"Emitter"
- Pour écouter un évènement précis, un "Observer" doit s'abonner à l'"Emitter". 
- Pour ne plus écouter un évènement précis, un "Observer" doit se désabonner . 
- Lorsque un évènement spécifique se produit, tous les "Observers" abonnés à cet évènement sont notifiés. 

## Use cases 
    
- Lorsque je ne suis pas abonné à un évènement précis, alors je peux m'abonner à cet évènement et je reçois confirmation de mon abonnement.
- Lorsque je suis déjà abonné à un évènement précis, alors je ne peux pas m'y abonner de nouveau et je reçois confirmation du refus.

- Si je ne suis pas abonné à un évènement précis, je peux demander à l'"Emitter" si je suis abonné à cet évènement et il me répond que non.
- Si je suis abonné à un évènement précis, je peux demander à l'"Emitter" si je suis abonné à cet évènement et il me répond que oui.

- Lorsque je suis abonné à un évènement précis, alors je peux me désabonner et demander à l'Emitter si je suis abonné et il me répond que non.

- Si nous sommes plusieurs à nous abonner au même évènement, alors nous pouvons chacun demander à l'Emitter si nous sommes abonnés et il répond oui.
- S'il y a des abonnés à un évènement précis, je peux demander à l'"Emitter" s'il y a des abonnés à cet évènement et il me répond que oui.
- S'il n'y aucun abonné à un évènement précis, je peux demander à l'"Emitter" s'il y a des abonnés à cet évènement et il me répond que non.

- Lorsque je suis abonné à un évènement précis, si ce type d'évènement ne se produit pas, alors je ne suis pas notifié. 
- Lorsque je suis abonné à un évènement précis, si ce type d'évènement se produit, alors je ne suis notifié qu'une seule fois. 
- Lorsque je suis abonné à un évènement précis, si un autre type d'évènement se produit, alors je ne suis pas notifié. 
- Lorsque je suis abonné à un évènement précis, si je me désabonne et que l'évènement se produit, alors je ne suis pas notifié. 

- Lorsque je suis notifié, je reçois une information regroupant l'emitter à l'origin de l'évènement, le type d'évènement, et des informations additionnelles de forme variable, définies par l'entitié à l'origine de la diffusion de l'évènement.


