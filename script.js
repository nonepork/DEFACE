document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const targets = document.querySelectorAll(
      ".center-container p, .center-container span",
    );
    targets.forEach((element) => letterByLetterDestruct(element));
  }
});

function letterByLetterDestruct(el) {
  const chars =
    "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
  const childNodes = Array.from(el.childNodes);

  el.innerHTML = ""; // clear content

  childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;

      // removes indent spaces
      if (el.classList.contains("error-message")) {
        text = text.replace(/^\s+/, "");
      }
      const charsArray = text.split("");
      charsArray.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // preserve spaces
        span.style.display = "inline-block";
        el.appendChild(span);

        animateDestruct(span, chars);
      });
    } else if (node.nodeName === "BR") {
      el.appendChild(document.createElement("br"));
    } else {
      el.appendChild(node); // fallback for other tags
    }
  });
}

function animateDestruct(span, chars) {
  const glitchRounds = 5;
  const totalDelay = Math.random() * 500 + 200;
  const glitchSpeed = 50;

  setTimeout(() => {
    let round = 0;
    const interval = setInterval(() => {
      if (round < glitchRounds) {
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        round++;
      } else {
        // make the original character disappear
        span.style.visibility = "hidden";
        span.style.display = "inline-block";
        clearInterval(interval);

        // create CRT-style afterglow (burn-in)
        const ghost = document.createElement("span");
        ghost.textContent = span.textContent;
        ghost.classList.add("burn-in");
        span.parentNode.insertBefore(ghost, span.nextSibling);

        setTimeout(() => {
          ghost.remove();
        }, 1000); // how long ghost lingers
      }
    }, glitchSpeed);
  }, totalDelay);
}
