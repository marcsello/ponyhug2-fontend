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
      <b-col class="my-3">
        <h2>Kedves Játékos!</h2>
        <p>Köszöntelek a 2020-as Hunbrony által szervezett Magyar Brony Pikniken! A teljes fejlesztő csapat nevében pedig engedd meg, hogy köszönetet mondjak amiért részt veszel a játékunkban. Sokat dolgoztunk vele és reméljük, hogy jól fogsz szórakozni.</p>
        <b-img src="@/assets/derpyflag.png" fluid-grow class="my-3"/>
        <h3>Na de hogyan is kell ezt játszani?</h3>
        <p>Ha részt vettél a 2019-es Brony Pikniken már ismerős lehet a koncepció.</p>
        <p>A Margit szigeten a Piknik helyszínének közelében elrejtettünk számos kártyát rajtuk egy QR kóddal.</p>
        <b-img src="@/assets/qrsample.png" fluid-grow />
        <p>A feladatod az lesz, hogy ezeket a kártyákat megtaláld és a telefonod segítségével a rajtuk lévő kódokat beolvasd.</p>
        <p>Ekkor a telefonod egy pónit fog neked megjeleníteni aki nagyon boldog, hogy egy ölelést oszthat meg veled. (Vagy nem. Lehet, hogy rossz napja volt)</p>
        <p>Feltűnhet a fenti sötét sávban egy kis trófea ikon mellette egy számmal. Ez a versenyben vezető játékos által megölelt pónik számát mutatja.</p>
        <h3>Verseny?</h3>
        <p>Bizony!</p>
        <p>A játék egy verseny amit a legtöbb pónit megölelő játékos nyer a legrövidebb időn belül. A helyezetteket a játékidő lejárta után fogjuk kihirdetni!</p>
        <p>A játék 2020. Szeptember 12-én 10:00 órától 17:00 óráig tart.</p>
        <p>Tartsd nyitva a szemed hogy te öleld meg a legtöbb pónit mert értékes nyeremények várnak! Ennek ellenére nyugodtan menj keresgélni a barátaiddal. Egyedül nyerni magányos dolog.</p>
        <h3>Mire van szükséged?</h3>
        <p>Egy akármilyen okostelefonra, azon egy böngészőre és bármilyen QR kód olvasóra ami képes linkeket megnyitni.</p>
        <p>Ha valamilyen oknál fogva nem tudsz QR kódot beolvasni az "Ölelés" oldalon manuálisan is beírhatod a kártyán található "kulcsot".</p>
        <p><b>FONTOS:</b> Minden kártyát könnyen elérhető helyre rejtettünk. Egyikhez sem kell kúszni. mászni vagy magas épületekről szénakupacba ugrani. A játékban mindenki a saját felelősségére vesz részt! De kérünk mindenkit, hogy vigyázzon a saját és mások épségére!</p>
        <b-img src="@/assets/detectiveponk.png" fluid-grow />
        <p>Most, hogy mindent tudsz amit tudni lehet, menj és ölelj meg pár pónit.</p>
        <p>Jó szórakozást kívánunk és érezd jól magad a pikniken.</p>
        <p class="blockquote-footer">A fejlesztő csapat</p>
        <b-button block variant="primary" to="/hug">Ölelj meg egy pónit!</b-button>
        <b-button block variant="primary" to="/herd">Istálló</b-button>
      </b-col>
    </b-row>
  </div>

</template>

<script>

import HomeStats from "@/components/HomeStats";

export default {
  name: 'Home',
  components: {HomeStats}
}
</script>

<style scoped>
  h3 {
    font-size: 1.45rem;
  }
</style>
