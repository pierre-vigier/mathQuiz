<template>
  <main>
    <div id="container">
      <div class="topbar">
        <div id="lives">
          <span v-for="n in lives" :key="n"> ❤️</span>
        </div>
        <div id="score">Score: {{ score }}</div>
      </div>
      <div v-if="game">
        <div id="operation">{{ one }} + {{ two }}</div>
        <div id="responses">
          <div
            class="response"
            v-for="r in responses"
            :key="r"
            @click="check(r)"
          >
            {{ r }}
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
import { ref } from "vue";
// variable
const displayMessage = ref(false);
const one = ref(1);
const two = ref(2);
const responses = ref([1, 2]);
const lives = ref(3);
const score = ref(0);
const message = ref("You lost");
const nextText = ref("Continue");
const game = ref(false);
function getRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}
function reset() {
  one.value = getRandomInteger(10);
  two.value = getRandomInteger(10);
  const response = one.value + two.value;
  //takes 4 additionnal values within +/- 3
  let allr = [response];
  let around = [-3, -2, -1, 1, 2, 3];
  while (allr.length < 5) {
    let index = getRandomInteger(around.length) - 1;
    allr.push(response + around[index]);
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
function check(val) {
  if (val == one.value + two.value) {
    score.value++;
    reset();
  } else {
    lives.value--;
    if (lives.value === 0) {
      displayMessage.value = true;
      message.value = `You lost<br>score : ${score.value}`;
      game.value = false;
    }
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
  padding: 50px;
  font-size: 50px;
  text-align: left;
}
#lives {
  float: right;
  clear: none;
  padding: 50px;
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
</style>
