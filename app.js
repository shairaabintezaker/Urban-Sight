async function loadIssues(){
  const res = await fetch("issue_list.php");
  const data = await res.json();
  const box = document.getElementById("issueList");
  box.innerHTML = data.map(x => `
    <div class="row">
      <div>
        <b>${x.title}</b>
        <div class="muted">${x.category} • ${x.location} • by ${x.full_name}</div>
        <div class="muted"> ${Number(x.avg_rating).toFixed(1)} (${x.rating_count}) • Points: ${x.points}</div>
      </div>
      <div>
        <select onchange="rateIssue(${x.id}, this.value)">
          <option value="">Rate</option>
          <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
        </select>
      </div>
    </div>
  `).join("");
}
async function submitIssue(){
  const fd = new FormData();
  fd.append("title", document.getElementById("t").value);
  fd.append("category", document.getElementById("c").value);
  fd.append("location", document.getElementById("l").value);
  fd.append("description", document.getElementById("d").value);
  const res = await fetch("issue_create.php", { method:"POST", body:fd });
  const txt = await res.text();
  if(txt !== "OK") return alert(txt);
  alert("Submitted!");
  loadIssues();
}
async function rateIssue(issueId, rating){
  if(!rating) return;
  const fd = new FormData();
  fd.append("issueId", issueId);
  fd.append("rating", rating);
  const res = await fetch("issue_rate.php", { method:"POST", body:fd });
  const txt = await res.text();
  if(txt !== "OK") return alert(txt);
  alert("Thanks!");
  loadIssues();
}  