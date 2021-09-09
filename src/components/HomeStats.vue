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
      <p>
        Csapatok ölelései
        <b-progress :max="$store.getters.sumHugs">
          <b-progress-bar
              v-for="faction in $store.state.factions"
              :key="faction.id"
              :value="$store.state.faction_stats[faction.id] || 0"
              :label="$store.state.faction_stats[faction.id] + ''"
              :variant="faction.variant"
              />
        </b-progress>
      </p>
    </b-card>
  </div>
</template>

<script>

import {factionsStatsUpdaterMixin} from "@/mixins";

export default {
  name: "HomeStats",
  mixins: [
    factionsStatsUpdaterMixin
  ],
  data() {
    return {
      localScore: 0,
      remainingTimeUpdateTimer: null,
      factionsStatsUpdateTimer: null,
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
  watch: {
    '$store.state.timeframe': function() {
      this.updateCountdown()
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
    this.$api.getHugCount().then(({hug_counter}) => {
      this.localScore = hug_counter
    })

    // Countdown csík

    this.remainingTimeUpdateTimer = setInterval(() => {
      this.updateCountdown()
    }, 1000)

    // Faction stats

    this.factionsStatsUpdateTimer = setInterval(() => {
      this.updateFactionsStats()
    }, 15000)

    this.$nextTick(() => {
      this.updateCountdown()
      this.updateFactionsStats()
    })

  },
  beforeDestroy() {
    clearInterval(this.remainingTimeUpdateTimer)
    clearInterval(this.factionsStatsUpdateTimer)
  }
}
</script>

<style scoped>

</style>