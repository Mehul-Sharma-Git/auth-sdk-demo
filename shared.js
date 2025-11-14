// shared.js
const COMMON_OPTIONS = {
  apiKey: "f5ec4119-c8e9-4192-81e7-f817784a0b80",
  sott: "psYMUlDF76ev0jZ6BBSd2EK++5OXNd8JivaDjHvsZSKbuePUl3BjI5I1zXRpC415PlE5eWblNOInXWpJijk1j5VYpTSKOvWt4BT/xh7uEU0=*4ce58442d309cc73566e6d5495fee834",
  verificationUrl: "https://dev-mehul-demo.devhub.lrinternal.com/auth.aspx",
  callbackUrl: window.location.origin,
  brand: "default",
  OtpLength: 6
};

function initFlow(LR, flow, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.classList.add("skeleton-loading");
  el.innerHTML = `<div class="skeleton-input"></div><div class="skeleton-input"></div><div class="skeleton-button"></div>`;

  const opts = {
    container: containerId,
    onSuccess: (res) => {
      console.log(flow, "success", res);
      el.classList.remove("skeleton-loading");
      confetti({
        particleCount: 100,
        spread: 70,
        colors: ["#4361ee", "#10b981"]
      });
    },
    onError: (err) => {
      console.error(flow, "error", err);
    }
  };

  try {
    LR.init(flow, opts);
  } catch (e) {
    console.error("SDK init error", e);
  }

  setTimeout(() => el.classList.remove("skeleton-loading"), 1500);
}

function checkAndTriggerFlow(LR, defaultFlow, containerId) {
  const p = new URLSearchParams(location.search);
  const v = p.get("vtype");
  let flow = defaultFlow;
  if (
    v === "emailverification" ||
    v === "oneclicksignin" ||
    v === "resetpassword"
  )
    flow = "verifyToken";
  if (v === "orginvite") flow = "orgInvite";
  initFlow(LR, flow, containerId);
}
