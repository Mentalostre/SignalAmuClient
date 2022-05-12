export const map = String.raw `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
        <style type="text/css">
            #map{ /* la carte DOIT avoir une hauteur sinon elle n'apparaît pas */
                height:400px;
            }
        </style>
        <title>Carte</title>
    </head>
    <body>
        <div id="map">
        <!-- Ici s'affichera la carte -->
    </div>

        <!-- Fichiers Javascript -->
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
    <script type="text/javascript">
            // On initialise la latitude et la longitude de Paris (centre de la carte)
            var lat = 43.23205;
            var lon = 5.43915;
            var macarte = null;
            // Fonction d'initialisation de la carte
            var villes = {
                "Paris": { "lat": 43.23205, "lon": 5.439 },
                "Brest": { "lat": 43.23205, "lon": 5.43915 },
                "Quimper": { "lat": 43.23205, "lon": 5.43 },
                "Bayonne": { "lat": 43.23205, "lon": 5.43916 }
            };
            // Fonction d'initialisation de la carte
            function initMap() {
            // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                macarte = L.map('map').setView([lat, lon], 15);
            // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
                L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
                attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
                minZoom: 1,
                maxZoom: 20
            }).addTo(macarte);
    // Nous parcourons la liste des villes
            for (ville in villes) {
                var marker = L.marker([villes[ville].lat, villes[ville].lon]).addTo(macarte);
            }                   
            }
            window.onload = function(){
        // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
        initMap(); 
            };
        </script>
    </body>
</html>`