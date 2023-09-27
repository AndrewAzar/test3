const formDialog = document.querySelector("#formDialog");

const inputPrompt = formDialog.querySelector("[name=prompt]");
//const inputPrompt = formDialog.querySelector('input');
//const inputPrompt = formDialog.querySelector('#prompt');
//const inputPrompt = document.getElementById('#prompt')

const results = document.querySelector("#results");

formDialog.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  if (!inputPrompt.value.trim()) return;

  results.innerHTML +=
    '<div class="message message-user">' + inputPrompt.value + "</div>";
  results.innerHTML += '<div class="message message-wait">...</div>';

  const divWait = document.querySelector(".message-wait");
  const timer = setInterval(() => {
    divWait.innerHTML += ".";
    if (divWait.innerHTML.length == 4) {
      divWait.innerHTML = "";
    }
  }, 200);

  const response = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: inputPrompt.value,
    }),
  });

  if (response.ok) {
    clearInterval(timer);
    document.querySelector(".message-wait").remove();
    inputPrompt.value = "";
    const data = await response.json();
    results.innerHTML +=
      '<div class="message message-bot">' + data.bot + "</div>";
  }
});