var databaseRef = firebase.database().ref("penjualan/");
var databaseRef1 = firebase.database().ref("resi/");

// CREATE NEW TRANSACTION

function add_trans() {
  var pengirim = document.getElementById("input_pengirim").value;
  var penerima = document.getElementById("input_penerima").value;
  var alamat_penerima = document.getElementById("input_alamat_penerima").value;
  var nohp = document.getElementById("input_nohp_penerima").value;
  var kodepos = document.getElementById("input_kodepos").value;
  var jenis_barang = document.getElementById("input_jenis_barang").value;
  var berat_barang = document.getElementById("input_berat_barang").value;
  var paket_jasa = document.getElementById("input_jasa").value;

  function makeid() {
      var length = 8;
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return 'QS'+result;
  }

  var uid = firebase.database().ref().child("penjualan").push().key;
  var uid1 = firebase.database().ref().child("resi").push().key;

  // PENJUALAN

  var data = {
    pengirim: pengirim,
    penerima: penerima,
    alamat_penerima: alamat_penerima,
    nohp: nohp,
    kodepos: kodepos,
    jenis_barang: jenis_barang,
    berat_barang: berat_barang + " KG",
    paket_jasa: paket_jasa,
    harga_total: "Rp " + 9000,
  };

  var updates = {};
  updates["/penjualan/" + uid] = data;
  firebase.database().ref().update(updates);

  // RESI

  var data = databaseRef1.child(makeid()).set({
    pengirim: pengirim,
    penerima: penerima,
    waktu1: "kosong",
    keterangan1: "kosong",
    waktu2: "diisi oleh kurir",
    keterangan2: "diisi oleh kurir",
    waktu3: "diisi oleh kurir",
    keterangan3: "diisi oleh kurir",
  });

  var updates_resi = {};
  updates["/resi/" + uid1] = data;
  firebase.database().ref().update(updates_resi);


  alert("Sukses");
  reload_page();
}

// READ UPDATE DELETE USER

var tbData = document.getElementById("tb_data");
var rowIndex = 1;

databaseRef.once("value", function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = tbData.insertRow(rowIndex);

    var cellId = row.insertCell(0);
    var cellPengirim = row.insertCell(1);
    var cellPenerima = row.insertCell(2);
    var cellNoHp = row.insertCell(3);
    var cellAlamat = row.insertCell(4);
    var cellKodePos = row.insertCell(5);
    var cellJenis = row.insertCell(6);
    var cellBerat = row.insertCell(7);
    var cellPaket = row.insertCell(8);
    var cellTotal = row.insertCell(9);

    cellId.appendChild(document.createTextNode(childKey));
    cellPengirim.appendChild(document.createTextNode(childData.pengirim));
    cellPenerima.appendChild(document.createTextNode(childData.penerima));
    cellNoHp.appendChild(document.createTextNode(childData.nohp));
    cellAlamat.appendChild(document.createTextNode(childData.alamat_penerima));
    cellKodePos.appendChild(document.createTextNode(childData.kodepos));
    cellJenis.appendChild(document.createTextNode(childData.jenis_barang));
    cellBerat.appendChild(document.createTextNode(childData.berat_barang));
    cellPaket.appendChild(document.createTextNode(childData.paket_jasa));
    cellTotal.appendChild(document.createTextNode(childData.harga_total));

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
        var cell8 = row.getElementsByTagName("td")[7];
        var cell9 = row.getElementsByTagName("td")[8];
        var cell10 = row.getElementsByTagName("td")[9];

        var id = cell1.innerHTML;
        var pengirim = cell2.innerHTML;
        var penerima = cell3.innerHTML;
        var nohp = cell4.innerHTML;
        var alamat = cell5.innerHTML;
        var kodepos = cell6.innerHTML;
        var jenis_barang = cell7.innerHTML;
        var berat_barang = cell8.innerHTML;
        var paket_jasa = cell9.innerHTML;
        var harga_total = cell10.innerHTML;

        document.getElementById("id").value = id;
        document.getElementById("pengirim").value = pengirim;
        document.getElementById("penerima").value = penerima;
        document.getElementById("nohp").value = nohp;
        document.getElementById("alamat").value = alamat;
        document.getElementById("kodepos").value = kodepos;
        document.getElementById("jenis_barang").value = jenis_barang;
        document.getElementById("berat_barang").value = berat_barang;
        document.getElementById("paket_jasa").value = paket_jasa;
        document.getElementById("harga_total").value = harga_total;

        navigateTop(0);
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
  var id = document.getElementById("id").value;
  var pengirim = document.getElementById("pengirim").value;
  var penerima = document.getElementById("penerima").value;
  var alamat_penerima = document.getElementById("alamat").value;
  var nohp = document.getElementById("nohp").value;
  var kodepos = document.getElementById("kodepos").value;
  var jenis_barang = document.getElementById("jenis_barang").value;
  var berat_barang = document.getElementById("berat_barang").value;
  var paket_jasa = document.getElementById("paket_jasa").value;

  var data = {
    pengirim: pengirim,
    penerima: penerima,
    alamat_penerima: alamat_penerima,
    nohp: nohp,
    kodepos: kodepos,
    jenis_barang: jenis_barang,
    berat_barang: berat_barang + " KG",
    paket_jasa: paket_jasa,
    harga_total: "Rp " + 9000,
  };

  var updates = {};
  updates["/penjualan/" + id] = data;
  firebase.database().ref().update(updates);
  alert("Users updated successfully!");
  reload_page();
}

function delete_data() {
  var uid = document.getElementById("id").value;
  firebase
    .database()
    .ref()
    .child("/penjualan/" + uid)
    .remove();
  alert("Users deleted successfully!");
  reload_page();
}

function reload_page() {
  window.location.reload();
}

// SCRIPT DATA KURIR

