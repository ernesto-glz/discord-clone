import { styleContent } from "./res/styles";
import { DiscordTips } from "./res/tips";

function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      return parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      return parent.removeChild(child);
    }
  },
};

function useLoading() {
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  const script = document.createElement("script");
  const randomIndex = Math.floor(Math.random() * DiscordTips.length);

  script.src = "scipts/trigger-video.js";
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.innerHTML = `
    <div class="background-spinner">
      <video id="vid" class="loading-spinner" autoplay="autoplay" muted loop>
        <source src="/assets/videos/loading-spinner.webm" />
        <source src="/assets/videos/loading-spinner.mp4" type="video/mp4" />
      </video>
    <h4 class="title">Did you know</h4>
      <p class="tip">${DiscordTips[randomIndex]}</p>
    </div>
  `;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
      safeDOM.append(document.head, script);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
      safeDOM.remove(document.head, script);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
