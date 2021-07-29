function save_user() {
  var kode = document.getElementById("input_kode").value;
  var simc = document.getElementById("input_simc").value;
  var namal = document.getElementById("input_namal").value;
  var namap = document.getElementById("input_namap").value;
  var phone1 = document.getElementById("input_phone1").value;
  var phone2 = document.getElementById("input_phone2").value;
  var kota = document.getElementById("input_kota").value;
  var tgl = document.getElementById("input_tgl").value;

  db.collection('kurir').add({
    kode: kode,
    simc: simc,
    namal: namal,
    namap: namap,
    phone1: phone1,
    phone2: phone2,
    kota: kota,
    tgl: tgl,
  })

  alert("data kurir berhasil ditambahkan!");

  reload_page(1500);
}

var table = document.getElementById("tb_datakurir");

function renderKurir(doc) {

  var rowIndex = 1;

  var row = table.insertRow(rowIndex);

  var cellId = row.insertCell(0);
  var cellKode = row.insertCell(1);
  var cellSimc = row.insertCell(2);
  var cellNamal = row.insertCell(3);
  var cellNamap = row.insertCell(4);
  var cellPhone1 = row.insertCell(5);
  var cellPhone2 = row.insertCell(6);
  var cellKota = row.insertCell(7);
  var cellTgl = row.insertCell(8);

  cellId.appendChild(document.createTextNode(doc.id));
  cellKode.appendChild(document.createTextNode(doc.data().kode));
  cellSimc.appendChild(document.createTextNode(doc.data().simc));
  cellNamal.appendChild(document.createTextNode(doc.data().namal));
  cellNamap.appendChild(document.createTextNode(doc.data().namap));
  cellPhone1.appendChild(document.createTextNode(doc.data().phone1));
  cellPhone2.appendChild(document.createTextNode(doc.data().phone2));
  cellKota.appendChild(document.createTextNode(doc.data().kota));
  cellTgl.appendChild(document.createTextNode(doc.data().tgl));

  rowIndex = rowIndex + 1;

  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function (row) {
      return function () {
        var cell1 = row.getElementsByTagName("td")[0];
        var cell2 = row.getElementsByTagName("td")[1];
        var cell3 = row.getElementsByTagName("td")[2];
        var cell4 = row.getElementsByTagName("td")[3];
        var cell5 = row.getElementsByTagName("td")[4];
        var cell6 = row.getElementsByTagName("td")[5];
        var cell7 = row.getElementsByTagName("td")[6];
        var cell8 = row.getElementsByTagName("td")[7];
        var cell9 = row.getElementsByTagName("td")[8];

        var id = cell1.innerHTML;
        var kode = cell2.innerHTML;
        var simc = cell3.innerHTML;
        var namal = cell4.innerHTML;
        var namap = cell5.innerHTML;
        var phone1 = cell6.innerHTML;
        var phone2 = cell7.innerHTML;
        var kota = cell8.innerHTML;
        var tgl = cell9.innerHTML;

        document.getElementById("uid").value = id;
        document.getElementById("kode").value = kode;
        document.getElementById("simc").value = simc;
        document.getElementById("namal").value = namal;
        document.getElementById("namap").value = namap;
        document.getElementById("phone1").value = phone1;
        document.getElementById("phone2").value = phone2;
        document.getElementById("kota").value = kota;
        document.getElementById("tgl").value = tgl;

        navigateTop(0);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

db.collection('kurir').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
      renderKurir(doc)
      console.log(doc.id)
  })
})

function update_user() {
  var kode = document.getElementById("kode").value;
  var simc = document.getElementById("simc").value;
  var namal = document.getElementById("namal").value;
  var uid = document.getElementById("uid").value;
  var namap = document.getElementById("namap").value;
  var phone1 = document.getElementById("phone1").value;
  var phone2 = document.getElementById("phone2").value;
  var kota = document.getElementById("kota").value;
  var tgl = document.getElementById("tgl").value;

  db.collection('kurir').doc(uid).update({
    kode: kode,
    simc: simc,
    namal: namal,
    namap: namap,
    phone1: phone1,
    phone2: phone2,
    kota: kota,
    tgl: tgl,
  })

  alert("data kurir berhasil diubah!");

  reload_page(2000);
}

function delete_user() {
  var uid = document.getElementById("uid").value;
 
  db.collection('kurir').doc(uid).delete();

  reload_page(2000);
}

function navigateTop(value) {
  document.body.scrollTop = value;
  document.documentElement.scrollTop = value;
}

function reload_page(duration) {
    setTimeout(function () { window.location.reload(); }, duration);
}
