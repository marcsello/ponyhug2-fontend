<template>
  <div>
    <b-row>
      <b-col class="my-2 text-center">
        <h1>PonyHug</h1>
        <p>A kaland itt indul...</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-2">
        <home-stats/>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-2">
        <home-faction-indicator/>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-3">
        <h2>Kedves Játékos!</h2>
        <p>Köszöntelek a 2022-es Hunbrony által szervezett Magyar Brony Pikniken! A teljes fejlesztő csapat nevében
          pedig engedd meg, hogy köszönetet mondjak amiért részt veszel a játékunkban. Sokat dolgoztunk vele és
          reméljük, hogy jól fogsz szórakozni.</p>
        <b-img src="@/assets/derpyflag.png" fluid-grow class="my-3"/>
        <h3>Na de hogyan is kell ezt játszani?</h3>
        <p>Ha 2019 óta részt vettél valamelyik Brony Pikniken már ismerős lehet a koncepció.</p>
        <p>A Margit szigeten a Piknik helyszínének közelében elrejtettünk számos kártyát rajtuk QR kóddal.</p>
        <p>Az alábbi térkép mutatja hogy mekkora területet érdemes átvizsgálni. Nincs semmi trükk, a határokon kívül
          tényleg nem rejtettünk el semmit.</p>
        <b-aspect aspect="2:3" class="my-2">
          <iframe class="fill" src="https://www.google.com/maps/d/u/0/embed?mid=1oQ0lbbUhEBsag7Nks6nHcHCLCfc_CU0">
          </iframe>
        </b-aspect>
        <p>A feladatod az lesz, hogy ezeket a kártyákat megtaláld és a telefonod segítségével a rajtuk lévő kódokat
          beolvasd.</p>
        <p>Beolvasás után a telefonod egy pónit fog neked megjeleníteni aki nagyon boldog, hogy egy ölelést oszthat meg
          veled.
          (Vagy nem. Lehet, hogy rossz napja volt)</p>
        <p>Feltűnhet a fenti sötét sávban egy kis trófea ikon mellette egy számmal. Ez a versenyben vezető játékos által
          megölelt pónik számát mutatja.</p>
        <h3>Verseny?</h3>
        <p>Bizony!</p>
        <p>A játék egy verseny amit a legtöbb pónit megölelő játékos nyer a legrövidebb időn belül. A helyezetteket a
          játékidő lejárta után fogjuk kihirdetni!</p>
        <p>A játék 2022. augusztus 27-én 10:30 órától 16:00 óráig tart.</p>
        <p>Tartsd nyitva a szemed hogy te öleld meg a legtöbb pónit mert értékes nyeremények várnak! Ennek ellenére
          nyugodtan menj keresgélni a barátaiddal. Egyedül nyerni magányos dolog.</p>
        <p>Idén, mint ahogy tavaj is, hogy felrázzuk kicsit a játékot, bevezettünk két csapatot. Az öleléseitek a
          csapatotok eredményéhez ad
          hozzá, de innentől rátok bízzuk, hogy ennek milyen jelentősséget tulajdonítotok. A te csapatod neve
          {{ $store.state.factions_fetched ? $store.getters.myFactionData.name : '...' }}.</p>
        <h3>Mire van szükséged?</h3>
        <p>Egy akármilyen okostelefonra, azon egy böngészőre és bármilyen QR kód olvasóra ami képes linkeket
          megnyitni.</p>
        <p>Ha valamilyen oknál fogva nem tudsz QR kódot beolvasni az "Ölelés" oldalon manuálisan is beírhatod a kártyán
          található "kulcsot".</p>
        <p><b>FONTOS:</b> Minden kártyát könnyen elérhető helyre rejtettünk. Egyikhez sem kell kúszni. mászni vagy magas
          épületekről szénakupacba ugrani. A játékban mindenki a saját felelősségére vesz részt! De kérünk mindenkit,
          hogy vigyázzon a saját és mások épségére!</p>
        <b-img src="@/assets/detectiveponk.png" fluid-grow/>
        <p>Most, hogy mindent tudsz amit tudni lehet, menj és ölelj meg pár pónit.</p>
        <p>Jó szórakozást kívánunk és érezd jól magad a pikniken.</p>
        <p class="blockquote-footer">A fejlesztő csapat</p>
        <nav-button-group variant="primary"/>
      </b-col>
    </b-row>
  </div>

</template>

<script>

import HomeStats from "@/components/HomeStats";
import HomeFactionIndicator from "@/components/HomeFactionIndicator";
import NavButtonGroup from "@/components/NavButtonGroup";

export default {
  name: 'HomeView',
  components: {
    HomeStats,
    HomeFactionIndicator,
    NavButtonGroup
  }
}
</script>

<style scoped>
h3 {
  font-size: 1.45rem;
}

iframe.fill {
  width: 100%;
  height: 100%;
}
</style>
