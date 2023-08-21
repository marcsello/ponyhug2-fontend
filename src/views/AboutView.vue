<template>
  <div>
    <b-row class="my-3">
      <b-col class="text-center">
        <h1>Rólunk</h1>
        <p>És az alkalmazásról...</p>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col>
        <h2>PonyHug Csapat</h2>
        <b-card title="Marcsello" img-src="@/assets/marcsello.png" img-left class="my-2">
          <span class="text-muted">Project Leader, Backend, Frontend</span>
        </b-card>
        <b-card title="Bencee" img-src="@/assets/bencee.png" img-right class="my-2">
          <span class="text-muted">Content, Design</span>
        </b-card>
        <b-card title="Shiron" img-src="@/assets/shiron.png" img-left class="my-2">
          <span class="text-muted">Testing, testing, testing...</span>
        </b-card>
        <b-card title="Tormakris" img-src="@/assets/tormakris.png" img-right class="my-2">
          <span class="text-muted">DevOps, Backend</span>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>Köszönet</h2>
        <div class="text-center">
          <div class="my-2">
            <h4>rlacko</h4>
            <p>Ki hitte volna, hogy ilyen nehéz footert csinálni?</p>
          </div>
          <div class="my-2">
            <h4>Matthyly</h4>
            <p>Piknik nélkül mihez kezdenénk?</p>
          </div>
          <div class="my-2">
            <h4>Amcsi</h4>
            <p>Kellett egy jó domain</p>
          </div>
          <div class="my-2">
            <h4>Brónulás csoport</h4>
            <p>Köszönjük az inspiráló ötleteket</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-3">
      <b-col>
        <h2>Segíts te is!</h2>
        <p>
          A játék implementációja nyílt és szabadon elérhető bárkinek. Bátorítunk mindenkit, hogy szálljon be a játék
          tökéletesítésébe, hogy jövőre mégjobb élménnyel szolgálhassunk. A projektet megtaláljátok GitHubon az alábbi
          linkeken:
        </p>
        <ul>
          <li><a href="https://github.com/marcsello/ponyhug2-fontend">Frontend</a></li>
          <li><a href="https://github.com/marcsello/ponyhug-backend">Backend</a></li>
        </ul>
        <p>
          Vagy <b>bármi egyéb ötlettel, javaslattal</b> keressetek meg minket közvetlen! Vagy írjatok levelet a <a href="mailto:marcsello@derpymail.org">marcsello@derpymail.org</a> címre.
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.card-img-left, .card-img-right {
  width: 40%;
}
</style>
