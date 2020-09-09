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
          <span class="text-muted">Project Leader, Frontend</span>
        </b-card>
        <b-card title="Bencee" img-src="@/assets/bencee.png" img-right class="my-2">
          <span class="text-muted">Content, Design</span>
        </b-card>
        <b-card title="Tormakris" img-src="https://placekitten.com/300/300" img-left class="my-2">
          <span class="text-muted">Backend</span>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>Köszönet</h2>
        <div class="text-center">
          <div class="my-2">
            <h4>Rlacko</h4>
            <p>Ki hitte volna, hogy ilyen nehéz footert csinálni?</p>
          </div>
          <div class="my-2">
            <h4>Matthyly</h4>
            <p>Piknik nélkül mihez kezdenénk?</p>
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
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.card-img-left, .card-img-right {
  width: 40%;
}
</style>
