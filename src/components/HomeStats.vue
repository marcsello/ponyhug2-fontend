<template>
  <div>
    <b-card title="A játék állása">
      <p>
        Megölelt pónik
        <b-progress :max="$store.state.total_ponies">
          <b-progress-bar :value="localScore" :label="localScoreLabel"/>
        </b-progress>
      </p>
      <p>
        A vezető ölelései
        <b-progress :max="$store.state.total_ponies">
          <b-progress-bar :value="$store.state.leader_score" :label="leaderScoreLabel" variant="warning"
                          class="text-dark"/>
        </b-progress>
      </p>
      <p>
        Hátralévő idő
        <b-progress :max="totalSeconds">
          <b-progress-bar :value="secondsLeft" :label="timeLeftLabel" variant="danger"/>
        </b-progress>
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "HomeStats",
  data() {
    return {
      localScore: 0,
      timer: null,
      secondsLeft: 0
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

    }
  },
  computed: {
    leaderScoreLabel() {
      return this.$store.state.leader_score + '/' + this.$store.state.total_ponies
    },
    localScoreLabel() {
      return this.localScore + '/' + this.$store.state.total_ponies
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
    }
  },
  mounted() {
    this.$api.getHugs().then((hugs) => {
      this.localScore = hugs.length
    })

    this.timer = setInterval(function () {
      this.updateCountdown()
    }.bind(this), 1000)

    this.updateCountdown()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>