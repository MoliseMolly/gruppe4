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
            //liste resettes
            liste.innerHTML = "";
            //her looper vi alle entriesne i sheetet igennem
            data.feed.entry.forEach(drink => {
                //her sorteres listen
                if (drink.gsx$svaerhedsgrad.$t == filter || filter == "alle") {
                    let klon = skabelon.cloneNode(true);
                    /*Herunder sættes informationen ind på hjemmesiden.*/
                    //Der tilføjes ikke en alt til billedet, da det er indsat som baggrund
                    klon.querySelector(".billede").style.backgroundImage = `url(${drink.gsx$links.$t})`;

                    klon.querySelector(".navn").textContent = drink.gsx$navn.$t;
                    klon.querySelector(".svaerhedsgrad").textContent = drink.gsx$svaerhedsgrad.$t;
                    klon.querySelector(".kort").textContent = drink.gsx$kort.$t;




                    /*
                Til sidst indsætter vi informationen i templaten så dataen hentet fra json bliver vist i listen */
                    liste.appendChild(klon);


                    /*Herunder gøres elementer klikbart, hvilket fører til undersiden for elementet  */
                    liste.lastElementChild.addEventListener("click", () => {
                        location.href = `underside_detalje.html?navn=${drink.gsx$navn.$t}`;
                    });
                }
            })
        }
