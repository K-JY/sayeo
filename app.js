// 네 Worker 주소로 바꿔줘!
// 예: https://my-worker.my-subdomain.workers.dev/api/snapshot
const WORKER_ENDPOINT = "https://lively-voice-8492.herons5314.workers.dev/api/snapshot";

const $date = document.getElementById("date");
const $btn = document.getElementById("btn");
const $out = document.getElementById("out");
const $summary = document.getElementById("summary");

// 기본값: 오늘 날짜
$date.valueAsDate = new Date();

$btn.addEventListener("click", async () => {
  const date = $date.value; // YYYY-MM-DD
  if (!date) return;

  $out.textContent = "조회중...";

  try {
    const res = await fetch(`${WORKER_ENDPOINT}?date=${encodeURIComponent(date)}`);
    const data = await res.json();

    if (!res.ok) {
      $summary.textContent = "오류";
      $out.textContent = JSON.stringify(data, null, 2);
      return;
    }

    $summary.innerHTML =
      `<b>요청일</b>: ${data.requested_date} / <b>적용일</b>: ${data.effective_date} / <b>출처</b>: ${data.source}`;

    $out.textContent =
      `VIX 종가(${data.vix_date}): ${data.vix_close}\n` +
      `SPY 종가(${data.effective_date}): ${data.spy_close}\n` +
      `SPY 120MA(${data.effective_date}): ${data.spy_ma120}\n\n` +
      JSON.stringify(data, null, 2);

  } catch (e) {
    $summary.textContent = "네트워크 오류";
    $out.textContent = String(e);
  }
});
