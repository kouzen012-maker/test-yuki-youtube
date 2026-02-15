async function loadVideos() {
  const res = await fetch("/api/videos");
  const videos = await res.json();

  const list = document.getElementById("video-list");
  list.innerHTML = "";

  videos.forEach(v => {
    const div = document.createElement("div");
    div.className = "video-item";
    div.textContent = v.title;
    div.onclick = () => {
      window.location.href = `/watch?v=${v.id}`;
    };
    list.appendChild(div);
  });
}

document.getElementById("add-btn").onclick = () => {
  document.getElementById("add-dialog").classList.remove("hidden");
};

document.getElementById("add-cancel").onclick = () => {
  document.getElementById("add-dialog").classList.add("hidden");
};

document.getElementById("add-submit").onclick = async () => {
  const url = document.getElementById("video-url").value;

  await fetch("/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  document.getElementById("add-dialog").classList.add("hidden");
  loadVideos();
};

loadVideos();
