<template>
  <div class="terminal" @click="firstPrint">
    <pre>{{ displayText }}</pre>
    <div class="input">
      <label v-if="inputVisible" class="input-hint" for="terminal-input">{{
        inputHint
      }}</label>
      <input
        v-if="inputVisible"
        v-model="userInput"
        name="terminal-input"
        @keyup.enter="handleCommand"
        class="terminal-input"
        autofocus
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "LineBrowserEmulator",
  data() {
    return {
      initialText: `                 WORLD WIDE WEB
    The WorldWideWeb (W3) is a wide-area hypermedia[1] information
retrieval initiative aiming to give universal access to a large
universe of documents.

    Everything there is online about W3 is linked directly or
indirectly to this document, including an executive summary[2]
of the project, Mailing lists[3], Policy[4] , November's W3  news[5]
or  Frequently Asked Questions[6].
`,
      hypermediaText: `                HYPERMEDIA
    is a term used for hypertext which is not constrained to be text:
it can include graphics, video and sound, for example.

    The World Wide Web is a classic example of hypermedia, whereas
a non-interactive cinema presentation is an example of standard
 multimedia due to the absence of hyperlinks.`,
      displayText: "",
      currentIndex: 0,
      userInput: "",
      inputVisible: false,
      inputHint: "<ref.number>, Back, <RETURN> for more, or Help:  ",
      firstPrintDone: false,
    };
  },
  mounted() {},
  methods: {
    firstPrint() {
      if (this.firstPrintDone) return;
      this.firstPrintDone = true;
      this.printText(this.initialText);
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async printText(newText) {
      this.inputVisible = false;

      while (this.currentIndex < newText.length) {
        this.displayText += newText[this.currentIndex];
        this.currentIndex++;
        await this.delay(10); // Pause for 10 milliseconds
      }
      this.inputVisible = true;
    },
    async handleCommand() {
      this.displayText += `\n> ${this.userInput}`;
      const command = this.userInput; // Store userInput in a temporary variable
      this.userInput = "";

      if (command === "Back") {
        this.displayText = "";
        this.currentIndex = 0;
        await this.printText(this.initialText);
      } else if (command === "1") {
        this.displayText = "";
        this.currentIndex = 0;
        await this.printText(this.hypermediaText);
      }
    },
  },
};
</script>

<style scoped>
.terminal {
  background-color: black;
  color: green;
  font-family: monospace;
  padding: 10px;
  border-radius: 5px;
  width: 800px;
  height: 400px;
  overflow-y: hidden;
  position: relative;
  /* font-size: small; */
}
.input {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 100%;
  display: flex;
  gap: 1rex;
}
.terminal-input {
  background-color: black;
  color: green;
  font-family: monospace;
  border: none;
  outline: none;
}

.input-hint {
  background-color: black;
  color: green;
  font-family: monospace;
  border: none;
  outline: none;
}
</style>
