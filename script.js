        /*Herunder sikres at JavaScriptet først udføres når DOM er loaded*/
        document.addEventListener("DOMContentLoaded", loadData);

        /*Herunder hentes informationen fra Google sheets, omformes til JSON og indsættes i den første template.*/

        const sheetID = "1KoSuwJPPKYzKrQBBJKelTWXBCg_V3-kY3BJI9e0mfPs";
        const url = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;

        /**/

        const liste = document.querySelector("#liste");
        const skabelon = document.querySelector("template").content;
        const h1 = document.querySelector("h1");
        const filterKnapper = document.querySelectorAll("button");
        let data;
        let filter = "alle";
        filterKnapper.forEach(knap => knap.addEventListener("click", filtrer));

        function filtrer() {
            console.log(filter);
            filter = this.dataset.kategori;
            h1.textContent = this.textContent;
            filterKnapper.forEach(knap => knap.classList.remove("valgt"));
            this.classList.add("valgt");
            vis(data);
        }


        async function loadData() {
            const response = await fetch(url);
            data = await response.json();
            vis(data);
        }

        function vis(data) {
            liste.textContent = "";
            data.feed.entry.forEach(drink => {
                //console.log(drink.gsx$kort.$t)
                if (drink.gsx$sværhedsgrad.$t == filter || filter == "alle") {
                    const klon = skabelon.cloneNode(true);
                    const navn = drink.gsx$navn.$t;
                    const kort = drink.gsx$kort.$t;
                    const smag = drink.gsx$smag.$t;
                    /*HUSK AT SLETTE DET NEDENUNDER SOM KOMMENTAR NÅR BILLEDET ER KOMMET PÅ*/
                    /*const billede = drink.gsx$billede.$t;*/
                    klon.querySelector(".navn").textContent = navn;
                    klon.querySelector(".kort").textContent += kort;
                    klon.querySelector(".smag").textContent += "smag: " + drink.gsx$smag.$t;
                    klon.querySelector(".billede").src = "img/pic.svg";
                    /*HUSK AT TILFØJE ALT TIL BILLEDET*/
                    /*klon.querySelector(".billede").alt = "Billede af " + drink.gsx$navn.$t;*/
                    /*Herunder sættes informationen ind på hjemmesiden.

                Til sidst indsætter vi informationen i templaten så dataen hentet fra json bliver vist i listen */
                    liste.appendChild(klon);


                    /*Herunder gøres visEnkel til en klikbar i templaten */
                    liste.lastElementChild.addEventListener("click", () => {
                        visEnkel(drink)
                    });
                }
            })
        }

        function visEnkel(drink) {
            document.querySelector("#popup").style.display = "block";
            document.querySelector("#popup .luk").addEventListener("click", lukEnkel);


            document.querySelector(".enkeltDrink h2").textContent = drink.gsx$navn.$t;

            document.querySelector(".enkeltDrink .billede").src = "img/pic.svg";

            document.querySelector(".enkeltDrink .billede").alt = "Billede af " + drink.gsx$navn.$t;


            document.querySelector(".enkeltDrink .lang").textContent = drink.gsx$lang.$t;

            document.querySelector(".enkeltDrink .smag").textContent = drink.gsx$smag.$t;

        }

        function lukEnkel() {
            document.querySelector("#popup").style.display = "none";
        }
