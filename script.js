const folder = document.getElementById("openFolder");
const letterSection = document.getElementById("letterSection");
const closeLetter = document.getElementById("closeLetter");
const replayButton = document.getElementById("replayButton");
const musicButton = document.getElementById("musicButton");
const audioInput = document.getElementById("audioInput");
const audioPlayer = document.getElementById("audioPlayer");

function createSparkles(amount = 18) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${45 + Math.random() * 45}vh`;
      sparkle.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 5000);
    }, i * 80);
  }
}

function openMessage() {
  folder.classList.add("open");
  setTimeout(() => {
    letterSection.classList.add("show");
    letterSection.setAttribute("aria-hidden", "false");
    letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    createSparkles(28);
  }, 650);
}

function closeMessage() {
  letterSection.classList.remove("show");
  letterSection.setAttribute("aria-hidden", "true");
  folder.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

folder.addEventListener("click", openMessage);
closeLetter.addEventListener("click", closeMessage);

replayButton.addEventListener("click", () => {
  closeMessage();
  setTimeout(openMessage, 450);
});

musicButton.addEventListener("click", () => {
  if (!audioPlayer.src) {
    audioInput.click();
    return;
  }

  if (audioPlayer.paused) {
    audioPlayer.play().catch(() => {});
    musicButton.textContent = "❚❚ Pause Audio";
  } else {
    audioPlayer.pause();
    musicButton.textContent = "▶ Play Audio";
  }
});

audioInput.addEventListener("change", () => {
  const file = audioInput.files[0];
  if (!file) return;

  audioPlayer.src = URL.createObjectURL(file);
  audioPlayer.play().catch(() => {});
  musicButton.textContent = "❚❚ Pause Audio";
});

audioPlayer.addEventListener("ended", () => {
  musicButton.textContent = "▶ Play Audio";
});

// Gentle ambient sparkle effect
setInterval(() => {
  if (Math.random() > 0.45) createSparkles(1);
}, 1800);
