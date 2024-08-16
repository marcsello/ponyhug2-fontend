<template>
  <div>
    <b-overlay rounded="sm" :show="stillLoading">
      <b-card title="A játék állása">
        <p>
          Megölelt pónik
          <b-progress :max="$store.state.total_ponies">
            <b-progress-bar :value="localScore" :label="localScoreLabel"/>
          </b-progress>
        </p>
        <p>
          Hátralévő idő
          <b-progress :max="totalSeconds">
            <b-progress-bar :value="secondsLeft" :label="timeLeftLabel" variant="danger"/>
          </b-progress>
        </p>
        <p>
          Pónik, akiket még senki nem talált meg
          <b-progress :max="$store.state.total_ponies">
            <b-progress-bar
                :value="$store.state.unhugged_ponies"
                :label="unhuggedPoniesLabel" variant="success"
            />
          </b-progress>
        </p>
        <p>
          A vezető ölelései
          <b-progress :max="$store.state.total_ponies">
            <b-progress-bar
                :value="$store.state.leader_score"
                :label="leaderScoreLabel" variant="secondary"
            />
          </b-progress>
        </p>
        <p>
          Összes regisztrált ölelés: <b>{{ $store.state.total_hugs }}</b>
        </p>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>

export default {
  name: "HomeStats",
  data() {
    return {
      localScore: 0,
      remainingTimeUpdateTimer: null,
      secondsLeft: 0,
      hugsLoading: false
    }
  },
  methods: {
    updateCountdown() {

      let time_left = (this.$store.state.timeframe.end_timestamp - (new Date())) / 1000

      if (time_left > 0) {
        this.secondsLeft = Math.floor(time_left)
      } else {
        this.secondsLeft = 0
      }

    },
  },
  watch: {
    '$store.state.timeframe': function () {
      this.updateCountdown()
    }
  },
  computed: {
    unhuggedPoniesLabel() {
      return this.$store.state.unhugged_ponies + ' / ' + this.$store.state.total_ponies
    },
    leaderScoreLabel() {
      return this.$store.state.leader_score + ' / ' + this.$store.state.total_ponies
    },
    localScoreLabel() {
      return this.localScore + ' / ' + this.$store.state.total_ponies
    },
    totalSeconds() {
      return (this.$store.state.timeframe.end_timestamp - this.$store.state.timeframe.begin_timestamp) / 1000
    },
    timeLeftLabel() {

      let seconds_left = this.secondsLeft % 60
      let minutes_left = Math.floor(this.secondsLeft / 60) % 60
      let hours_left = Math.floor(this.secondsLeft / 60 / 60)

      return hours_left + ':' +
          (minutes_left < 10 ? '0' + minutes_left : minutes_left) + ':' +
          (seconds_left < 10 ? '0' + seconds_left : seconds_left)

      // I hate javascript
    },
    stillLoading() {
      return this.$store.state.leader_score === null ||
          this.$store.state.total_ponies === null ||
          this.$store.state.total_hugs === null ||
          !this.$store.state.timeframe.fetched ||
          this.hugsLoading
    }
  },
  mounted() {
    this.hugsLoading = true
    this.$api.getHugCount().then(({hug_counter}) => {
      this.localScore = hug_counter
      this.hugsLoading = false
    }).catch(({text}) => {
      this.$showToast(text)
    })

    // Countdown csík

    this.remainingTimeUpdateTimer = setInterval(() => {
      this.updateCountdown()
    }, 1000)

    this.$nextTick(() => {
      this.updateCountdown()
    })

  },
  beforeDestroy() {
    clearInterval(this.remainingTimeUpdateTimer)
  }
}
</script>

<style scoped>

</style>