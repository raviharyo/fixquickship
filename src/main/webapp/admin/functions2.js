var databaseRef = firebase.database().ref("resi/");
var databaseRef1 = firebase.database().ref("penjualan/");

// CREATE NEW TRANSACTION

function add_resi() {
  var pengirim = document.getElementById("input_pengirim").value;
  var penerima = document.getElementById("input_penerima").value;
  //   var tanggal1 = document.getElementById("input_tanggal1").value;
  var keterangan1 = document.getElementById("input_keterangan1").value;
  //   var kodepos = document.getElementById("input_kodepos").value;
  //   var jenis_barang = document.getElementById("input_jenis_barang").value;
  //   var berat_barang = document.getElementById("input_berat_barang").value;
  //   var paket_jasa = document.getElementById("input_jasa").value;

  function makeid() {
    var length = 8;
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "QS" + result;
  }

  var uid = firebase.database().ref().child("resi").push().key;

  var data = databaseRef.child(makeid()).set({
    pengirim: pengirim,
    penerima: penerima,
    waktu1: getDate(),
    keterangan1: keterangan1,
    waktu2: "",
    keterangan2: "",
  });

  var updates = {};
  updates["/resi/" + uid] = data;
  firebase.database().ref().update(updates);

  alert("Sukses");
  reload_page();
}

// // READ UPDATE DELETE USER

var tbData = document.getElementById("tb_data");
var rowIndex = 1;

databaseRef.once("value", function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = tbData.insertRow(rowIndex);

    var cellResi = row.insertCell(0);
    var cellPengirim = row.insertCell(1);
    var cellPenerima = row.insertCell(2);
    var cellWaktu1 = row.insertCell(3);
    var cellKeterangan1 = row.insertCell(4);
    var cellWaktu2 = row.insertCell(5);
    var cellKeterangan2 = row.insertCell(6);
    // var cellWaktu3 = row.insertCell(7);
    // var cellKeterangan3 = row.insertCell(8);
    

    cellResi.appendChild(document.createTextNode(childKey));
    cellPengirim.appendChild(document.createTextNode(childData.pengirim));
    cellPenerima.appendChild(document.createTextNode(childData.penerima));
    cellWaktu1.appendChild(document.createTextNode(childData.waktu1));
    cellKeterangan1.appendChild(document.createTextNode(childData.keterangan1));
    cellWaktu2.appendChild(document.createTextNode(childData.waktu2));
    cellKeterangan2.appendChild(document.createTextNode(childData.keterangan2));

    rowIndex = rowIndex + 1;
  });

  var table = document.getElementById("tb_data");
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

        var resi = cell1.innerHTML;
        var pengirim = cell2.innerHTML;
        var penerima = cell3.innerHTML;
        var waktu1 = cell4.innerHTML;
        var keterangan1 = cell5.innerHTML;
        var waktu2 = cell6.innerHTML;
        var keterangan2 = cell7.innerHTML;
        
        document.getElementById("no_resi").value = resi;
        document.getElementById("pengirim").value = pengirim;
        document.getElementById("penerima").value = penerima;
        document.getElementById("tanggal1").value = waktu1;
        document.getElementById("keterangan1").value = keterangan1;
        document.getElementById("waktu2").value = waktu2;
        document.getElementById("keterangan2").value = keterangan2;

        document.documentElement.scrollTop = 0;
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
});

function navigateTop(value) {
  document.body.scrollTop = value;
  document.documentElement.scrollTop = value;
}

function update_data() {
  var id = document.getElementById("no_resi").value;
  var pengirim = document.getElementById("pengirim").value;
  var penerima = document.getElementById("penerima").value;
  // var waktu1 = document.getElementById("tanggal1").value;
  var keterangan1 = document.getElementById("keterangan1").value;

  var data = {
    pengirim : pengirim,
    penerima : penerima,
    waktu1 : getDate(),
    keterangan1 : keterangan1,
    waktu2: "diisi oleh kurir",
    keterangan2: "diisi oleh kurir",
    waktu3: "diisi oleh kurir",
    keterangan3: "diisi oleh kurir",
  };

  var updates = {};
  updates["/resi/" + id] = data;
  firebase.database().ref().update(updates);
  alert("Resi berhasil diupdate!");
  reload_page();
}

function delete_data() {
  var uid = document.getElementById("no_resi").value;
  firebase
    .database()
    .ref()
    .child("/resi/" + uid)
    .remove();
  alert("Resi berhasil dihapus!");
  reload_page();
}

function reload_page() {
  window.location.reload();
}

// // SCRIPT DATA KURIR

function getDate() {
  const d = new Date();
  return (
    d.toDateString() +
    ", " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds()
  );
}
