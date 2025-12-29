window.onload = function () {
  loadFund();
};

function loadFund(){
  fetch("fund_list.php")
    .then(r => r.json())
    .then(d => {
      document.getElementById("totalBox").innerText = "Total: ৳" + d.total;
      setGoalBar(d.total);
      var pbox = document.getElementById("purposeList");
      var phtml = "";
      for(var i=0;i<d.purpose.length;i++){
        phtml += `<div class="row"><span>${d.purpose[i].purpose}</span><b>৳${d.purpose[i].sum}</b></div>`;
      }
      pbox.innerHTML = phtml || `<div class="row"><span class="muted">No data</span></div>`;

      var box = document.getElementById("donationList");
      var html = "";
      for(var j=0;j<d.recent.length;j++){
        var x = d.recent[j];
        html += `
          <div class="row">
            <div>
              <b>৳${x.amount}</b>
              <div class="muted">${x.purpose} • by ${x.full_name}</div>
            </div>
            <span class="pill p-info">${x.created_at}</span>
          </div>
        `;
      }
      box.innerHTML = html || `<div class="row"><span class="muted">No donations yet</span></div>`;
    });
}

function donate(){
  var amt = document.getElementById("amt").value;
  var purpose = document.getElementById("purpose").value;
  var note = document.getElementById("note").value;

  var fd = new FormData();
  fd.append("amount", amt);
  fd.append("purpose", purpose);
  fd.append("note", note);

  fetch("fund_donate.php", { method:"POST", body:fd })
    .then(r => r.text())
    .then(txt => {
      if(txt !== "OK") return alert(txt);
      alert("Donation successful!");
      document.getElementById("amt").value = "";
      document.getElementById("purpose").value = "";
      document.getElementById("note").value = "";
      loadFund();
    });
}