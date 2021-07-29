var tbData = document.getElementById("tb_data");

function renderTrans(doc) {
    var rowIndex = 1;

    var row = tbData.insertRow(rowIndex);

    var cellId = row.insertCell(0);
    var cellResi = row.insertCell(1)
    var cellPengirim = row.insertCell(2);
    var cellPenerima = row.insertCell(3);
    var cellNoHp = row.insertCell(4);
    var cellAlamat = row.insertCell(5);
    var cellKodePos = row.insertCell(6);
    var cellJenis = row.insertCell(7);
    var cellBerat = row.insertCell(8);
    var cellPaket = row.insertCell(9);
    var cellTotal = row.insertCell(10);

    cellId.appendChild(document.createTextNode(doc.id));
    cellResi.appendChild(document.createTextNode(doc.data().no_resi))
    cellPengirim.appendChild(document.createTextNode(doc.data().pengirim));
    cellPenerima.appendChild(document.createTextNode(doc.data().penerima));
    cellNoHp.appendChild(document.createTextNode(doc.data().nohp));
    cellAlamat.appendChild(document.createTextNode(doc.data().alamat));
    cellKodePos.appendChild(document.createTextNode(doc.data().kodepos));
    cellJenis.appendChild(document.createTextNode(doc.data().jenis));
    cellBerat.appendChild(document.createTextNode(doc.data().berat));
    cellPaket.appendChild(document.createTextNode(doc.data().paket));
    cellTotal.appendChild(document.createTextNode(doc.data().harga_total));

    rowIndex = rowIndex + 1;

    var rows = tbData.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = tbData.rows[i];
        var createClickHandler = function (row) {
            return function () {
                var cell1 = row.getElementsByTagName("td")[0];
                var cell2 = row.getElementsByTagName("td")[2];
                var cell3 = row.getElementsByTagName("td")[3];
                var cell4 = row.getElementsByTagName("td")[4];
                var cell5 = row.getElementsByTagName("td")[5];
                var cell6 = row.getElementsByTagName("td")[6];
                var cell7 = row.getElementsByTagName("td")[7];
                var cell8 = row.getElementsByTagName("td")[8];
                var cell9 = row.getElementsByTagName("td")[9];
                var cell10 = row.getElementsByTagName("td")[10];

                var textResi = row.getElementsByTagName("td")[1];

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
                var resi = textResi.innerHTML;

                document.getElementById('num_resi').innerHTML = resi;
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
}

function navigateTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
}

function reload_page(duration) {
    setTimeout(function () { window.location.reload(); }, duration);
}

function checkVal(){
    var id = document.getElementById('id').value;

    if (id == null || id == ''){
        alert('Pilih Resi terlebih dahulu');
    } else {
        generate_resi();
    }
}

// read data

db.collection('penjualan').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTrans(doc)
    })
})

function add_trans() {
    var pengirim = document.getElementById("input_pengirim").value;
    var penerima = document.getElementById("input_penerima").value;
    var alamat = document.getElementById("input_alamat_penerima").value;
    var nohp = document.getElementById("input_nohp_penerima").value;
    var kodepos = document.getElementById("input_kodepos").value;
    var jenis = document.getElementById("input_jenis_barang").value;
    var berat = document.getElementById("input_berat_barang").value;
    var paket = document.getElementById("input_jasa").value;

    function makeid() {
        var length = 8;
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return 'QS' + result;
    }

    db.collection('penjualan').add({
        no_resi: makeid(),
        pengirim: pengirim,
        penerima: penerima,
        alamat: alamat,
        nohp: nohp,
        kodepos: kodepos,
        jenis: jenis,
        berat: berat + " KG",
        paket: paket,
        harga_total: "Rp " + 9000,
    })

    alert("transaksi berhasil ditambahkan");
    reload_page(2000);

}

// add data resi

function generate_resi(){

    var resi = document.getElementById("num_resi").innerHTML;
    var pengirim = document.getElementById("pengirim").value;
    var penerima = document.getElementById("penerima").value;
    var alamat = document.getElementById("alamat").value;
    var nohp = document.getElementById("nohp").value;
    var kodepos = document.getElementById("kodepos").value;

    db.collection('resi').doc(resi).set({
        alamat: alamat,
        pengirim: pengirim,
        penerima: penerima,
        nohp: nohp,
        kodepos: kodepos,
        waktu1: "kosong",
        keterangan1: "kosong",
        waktu2: "diisi oleh kurir",
        keterangan2: "diisi oleh kurir",
        waktu3: "diisi oleh kurir",
        keterangan3: "diisi oleh kurir",
    })

    alert('Data Resi berhasil dibuat');

    reload_page(1500);  
}

// edit data trans

function edit_trans(){

    var id = document.getElementById("id").value;
    var pengirim = document.getElementById("pengirim").value;
    var penerima =  document.getElementById("penerima").value;
    var nohp = document.getElementById("nohp").value;
    var alamat = document.getElementById("alamat").value;
    var kodepos = document.getElementById("kodepos").value;
    var jenis = document.getElementById("jenis_barang").value;
    var berat = document.getElementById("berat_barang").value;
    // var paket = document.getElementById("paket_jasa").value;
    var harga = document.getElementById("harga_total").value;

    db.collection('penjualan').doc(id).update({
        pengirim : pengirim,
        penerima : penerima,
        nohp : nohp,
        alamat : alamat,
        kodepos : kodepos,
        jenis : jenis,
        berat : berat + ' KG',
        paket : 'HALU',
        harga_total : harga
    });

    alert('data berhasil di update');

    reload_page(1800);
}

// delete data trans

function delete_trans(){
    var id = document.getElementById('id').value;

    db.collection('penjualan').doc(id).delete();

    alert('Data berhasil dihapus');
    reload_page(1500);
}