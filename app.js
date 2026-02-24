const WORKER_URL = "https://YOUR_WORKER_SUBDOMAIN.workers.dev/api/snapshot"; // 나중에 교체

document.getElementById("btn").addEventListener("click", async () => {
  const vixTh = Number(document.getElementById("vixTh").value || 20);
  const res = await fetch(`${WORKER_URL}?vixTh=${encodeURIComponent(vixTh)}`);
  const data = await res.json();
  document.getElementById("out").textContent = JSON.stringify(data, null, 2);
});
