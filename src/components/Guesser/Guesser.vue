<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

const words = ref<string[]>([])
const currentWord = ref('')
const allChars = [
  ['E', 'T', 'J', 'A', 'S', 'H', 'R', 'Q', 'Z'],
  ['O', 'I', 'V', 'N', 'D', 'K', 'U', 'K', 'X'],
  ['C', 'W', 'M', 'F', 'Y', 'G', 'P', 'B']
]
const currentStage = ref(allChars)

const nextStage = (prevStage: string[]) => {
  // the last letter
  if (prevStage.length === 1) {
    currentWord.value += prevStage[0]
    return allChars
  }

  // chunk
  const arr = []
  const divider = 3
  const chunk = Math.round(prevStage.length / divider)
  for (let i = 0; i < divider; i++) {
    arr.push(prevStage.slice(i * chunk, (i + 1) * chunk))
  }
  return arr.filter((c) => c.length > 0)
}
const addWord = () => {
  words.value.push(currentWord.value)
  currentWord.value = ''
}
</script>

<template>
  <h1>Guesser</h1>
  <div class="circle-container flex flex-wrap">
    <div
      v-for="(item, index) in currentStage"
      :key="index"
      class="circle bg-fuchsia-800 hover:bg-fuchsia-900"
      @click="currentStage = nextStage(currentStage[index])"
    >
      <span class="circle-letter">{{ item.join(' ') }}</span>
    </div>
  </div>
  <button
    id="next-word"
    type="button"
    :disabled="currentWord.length === 0"
    class="rounded bg-purple-700 px-4 py-2 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-purple-800"
    @click="addWord"
  >
    Next word
  </button>
  <section class="m1 p2 container">
    <div id="current-word">Current word: {{ currentWord }}</div>
    <div class="words-container">
      Words:
      <ul v-for="(item, index) in words" :key="index" v-text="item"></ul>
    </div>
  </section>
</template>

<style scoped>
[class*='hover:']:not([disabled]) {
  transition: background 0.4s ease;
  &:hover {
    cursor: pointer;
  }
}

.circle {
  height: 150px;
  width: 150px;
  text-align: center;
  border-radius: 50%;
  color: white;
  padding: 2rem;
  margin: 2rem;
}

.circle-letter {
  font-size: 3rem;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0 0.5rem 0 0.5rem;
  margin-top: -0.5rem;
  display: inline-block;
  user-select: none;
}
</style>
