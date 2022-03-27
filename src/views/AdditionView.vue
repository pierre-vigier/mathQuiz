<template>
  <main>
    <div id="container">
      <div class="topbar">
        <div id="time-container">
          <div
            id="time-gauge"
            :style="{
              width: time / maxTime + '%',
              'background-color': `rgb(${
                (255 / (maxTime * 100)) * (maxTime * 100 - time)
              } ,${(255 / (maxTime * 100)) * 100 * time}, 0)`,
            }"
          ></div>
        </div>
        <div id="lives">
          <span v-for="n in lives" :key="n"> ❤️</span>
        </div>
        <div id="score">
          High Score: {{ highScore }}<br />Score: {{ score }}
        </div>
      </div>
      <div v-if="game">
        <div id="operation">{{ one }} + {{ two }}</div>
        <div id="responses">
          <div
            :class="{ response: true, correct: r.correct, pressed: r.pressed }"
            v-for="r in responses"
            :key="r"
            @click="check(r)"
          >
            {{ r.value }}
          </div>
        </div>
      </div>
      <div v-else @click="start()">Click here to start</div>
    </div>
    <div id="overlay" v-show="displayMessage"></div>
    <div id="message" v-show="displayMessage">
      <span v-html="message" />
      <div id="continue" @click="next">{{ nextText }}</div>
    </div>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
onMounted(() => {
  let hs = localStorage.getItem("highScore");
  if (hs) {
    highScore.value = parseInt(hs);
  }
});
// variable
const highScore = ref(0);
const displayMessage = ref(false);
const one = ref(1);
const two = ref(2);
const responses = ref([{ value: 1 }, { value: 2 }]);
const lives = ref(3);
const score = ref(0);
const message = ref("You lost");
const nextText = ref("Continue");
const game = ref(false);
const maxTime = 7;
const time = ref(maxTime * 100);
let timer = null;
function countDown() {
  if (time.value > 0) {
    timer = setTimeout(() => {
      time.value -= 1;
      countDown();
    }, 10);
  } else {
    reduceLife();
    responses.value.forEach((element) => {
      element.pressed = true;
    });
    setTimeout(() => {
      reset();
    }, 2500);
  }
}
function getRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}
function stopTimer() {
  clearTimeout(timer);
}
function reset() {
  time.value = maxTime * 100;
  clearTimeout(timer);
  countDown();
  one.value = getRandomInteger(10);
  two.value = getRandomInteger(10);
  const response = {
    value: one.value + two.value,
    pressed: false,
    correct: true,
  };
  //takes 4 additionnal values within +/- 3
  let allr = [response];
  let around = [-3, -2, -1, 1, 2, 3];
  while (allr.length < 5) {
    let index = getRandomInteger(around.length) - 1;
    allr.push({
      value: response.value + around[index],
      pressed: false,
      correct: false,
    });
    around.splice(index, 1);
  }
  //shuffle resposnes
  for (let i = allr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allr[i], allr[j]] = [allr[j], allr[i]];
  }
  responses.value = allr;
}
function start() {
  reset();
  lives.value = 5;
  score.value = 0;
  game.value = true;
}
function next() {
  displayMessage.value = false;
}
function check(r) {
  if (r.pressed) return;
  r.pressed = true;
  if (r.correct) {
    stopTimer();
    if (time.value / 100 > maxTime / 2) {
      score.value += 2;
    } else {
      score.value += 1;
    }
    if (score.value > highScore.value) {
      highScore.value = score.value;
      localStorage.setItem("highScore", highScore.value);
    }
    // switched all answers to pressed to show the winning one only
    responses.value.forEach((element) => {
      element.pressed = true;
    });
    setTimeout(() => {
      reset();
    }, 2500);
  } else {
    reduceLife();
  }
}
function reduceLife() {
  lives.value--;
  if (lives.value === 0) {
    stopTimer();
    responses.value.forEach((element) => {
      element.pressed = true;
    });
    setTimeout(() => {
      displayMessage.value = true;
      message.value = `You lost<br>score : ${score.value}`;
      game.value = false;
    }, 2500);
  }
}
</script>
<style scoped>
main {
  position: static;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  font-size: 80px;
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}
#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
#container a {
  text-decoration: none;
}
#score {
  padding-left: 50px;
  font-size: 50px;
  text-align: left;
}
#lives {
  float: right;
  clear: none;
  padding-right: 50px;
  font-size: 50px;
}
.topbar {
  clear: both;
}
#operation {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 100px;
}
#responses {
  padding-top: 50px;
  font-size: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.response {
  background: #d89797;
  border: solid 1px white;
  border-radius: 20%;
  padding: 5px;
  margin: 10px;
  min-width: 200px;
}
.response.pressed {
  opacity: 10%;
  background: #630000;
}
.response.pressed.correct {
  background: #006100;
  opacity: 100%;
}
#overlay {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgb(0, 0, 0);
  opacity: 80%;
}
#message {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgb(255, 255, 255);
  padding: 50px;
  margin-left: 50px;
  margin-right: 50px;
  color: #3d3c3c;
  font-size: 80px;
}
#continue {
  padding: 10px;
  font-size: 30px;
  color: rgb(79, 167, 94);
  cursor: pointer;
}
#time-container {
  width: 100%;
  height: 40px;
}
#time-gauge {
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
