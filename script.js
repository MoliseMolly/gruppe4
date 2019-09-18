        document.addEventListener("DOMContentLoaded", loadData); /*Det sikres at JavaScriptet først udføres når DOM er loaded*/

        /*Herunder hentes informationen fra Google sheets, omformes til JSON og indsættes i den første template.*/

        const sheetID = "1KoSuwJPPKYzKrQBBJKelTWXBCg_V3-kY3BJI9e0mfPs";
        const url = `https://spreadsheets.google.com/feeds/list/${sheetID}/od6/public/values?alt=json`;

        /**/

        const liste = document.querySelector("#liste");
        const skabelon = document.querySelector("template").content;
        const filterKnapper = document.querySelectorAll("button");
        let data;
        let filter = "alle";
        filterKnapper.forEach(knap => knap.addEventListener("click", filtrer));

        function filtrer() {
            console.log(filter);
            filter = this.dataset.kategori;

            document.querySelector(".overskrift_kategori").textContent = `${this.textContent} Cocktails`;
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
            liste.innerHTML = "";
            data.feed.entry.forEach(drink => {
                //console.log(drink.gsx$kort.$t)
                if (drink.gsx$sværhedsgrad.$t == filter || filter == "alle") {
                    let klon = skabelon.cloneNode(true);

                    /*HUSK AT SLETTE DET NEDENUNDER SOM KOMMENTAR NÅR BILLEDET ER KOMMET PÅ*/
                    /*const billede = drink.gsx$billede.$t;*/
                    klon.querySelector(".navn").textContent = drink.gsx$navn.$t;
                    //klon.querySelector(".kort").textContent = kort;
                    //klon.querySelector(".smag").textContent = "smag: " + drink.gsx$smag.$t;


                    klon.querySelector(".sværhedsgrad").textContent = drink.gsx$sværhedsgrad.$t;
                    klon.querySelector(".kort").textContent = drink.gsx$kort.$t;
                    let billede = `url(${drink.gsx$links.$t})`
                    klon.querySelector(".billede").style.backgroundImage = billede;

                    /*
                    //ikke alle billeder er jpg, så her sørges for undtagelsen, nemlig et jpeg billede af en mojito
                    if (drink.gsx$billeder.$t == "mojito") {
                        klon.querySelector(".billede").src = `/img/${drink.gsx$billeder.$t}.jpeg`;
                    } else {
                        klon.querySelector(".billede").src = `/img/${drink.gsx$billeder.$t}.jpg`;
                    }*/

                    /*HUSK AT TILFØJE ALT TIL BILLEDET*/
                    /*klon.querySelector(".billede").alt = "Billede af " + drink.gsx$navn.$t;*/
                    /*Herunder sættes informationen ind på hjemmesiden.

                Til sidst indsætter vi informationen i templaten så dataen hentet fra json bliver vist i listen */
                    liste.appendChild(klon);


                    /*Herunder gøres elementer klikbart, hvilket fører til undersiden for elementet  */
                    liste.lastElementChild.addEventListener("click", () => {
                        location.href = `underside_detalje.html?navn=${drink.gsx$navn.$t}`;
                    });
                }
            })
        }

        /*  function visEnkel(drink) {
            document.querySelector("#popup").style.display = "block";
            document.querySelector("#popup .luk").addEventListener("click", lukEnkel);


            document.querySelector(".enkeltDrink h1").textContent = drink.gsx$navn.$t;


            document.querySelector(".enkeltDrink .billede").src = `${drink.gsx$links.$t}`;

            document.querySelector(".enkeltDrink .billede").alt = "Billede af " + drink.gsx$navn.$t;

            document.querySelector(".enkeltDrink .kort").textContent = drink.gsx$kort.$t;
            document.querySelector(".enkeltDrink .info").textContent = drink.gsx$info.$t;
            document.querySelector(".enkeltDrink .ingredienser").textContent = drink.gsx$ingredienser.$t;
            document.querySelector(".enkeltDrink .opskrift").textContent = drink.gsx$opskrift.$t;

            document.querySelector(".enkeltDrink .smag").textContent = drink.gsx$smag.$t;
        }

        function lukEnkel() {
            document.querySelector("#popup").style.display = "none";
            console.log(data);
        }
*/
