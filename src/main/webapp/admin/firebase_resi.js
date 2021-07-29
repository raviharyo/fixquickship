var tbData = document.getElementById("tb_data");

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

function reload_page() {
    setTimeout(function () { window.location.reload(); }, 1500);
}

function navigateTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
}

function renderResi(doc) {
    var rowIndex = 1;

    var row = tbData.insertRow(rowIndex);

    var cellResi = row.insertCell(0);
    var cellAlamat = row.insertCell(1);
    var cellKodePos = row.insertCell(2)
    var cellPengirim = row.insertCell(3);
    var cellPenerima = row.insertCell(4);
    var cellNoHp = row.insertCell(5)
    var cellWaktu1 = row.insertCell(6);
    var cellKeterangan1 = row.insertCell(7);
    var cellWaktu2 = row.insertCell(8);
    var cellKeterangan2 = row.insertCell(9);
    var cellWaktu3 = row.insertCell(10);
    var cellKeterangan3 = row.insertCell(11);

    cellResi.appendChild(document.createTextNode(doc.id));
    cellAlamat.appendChild(document.createTextNode(doc.data().alamat));
    cellKodePos.appendChild(document.createTextNode(doc.data().kodepos))
    cellPengirim.appendChild(document.createTextNode(doc.data().pengirim));
    cellPenerima.appendChild(document.createTextNode(doc.data().penerima));
    cellNoHp.appendChild(document.createTextNode(doc.data().nohp));
    cellWaktu1.appendChild(document.createTextNode(doc.data().waktu1));
    cellKeterangan1.appendChild(document.createTextNode(doc.data().keterangan1));
    cellWaktu2.appendChild(document.createTextNode(doc.data().waktu2));
    cellKeterangan2.appendChild(document.createTextNode(doc.data().keterangan2));
    cellWaktu3.appendChild(document.createTextNode(doc.data().waktu3));
    cellKeterangan3.appendChild(document.createTextNode(doc.data().keterangan3));

    rowIndex = rowIndex + 1;

    var rows = tbData.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = tbData.rows[i];
        var createClickHandler = function (row) {
            return function () {
                navigateTop(0);
                
                var cell1 = row.getElementsByTagName("td")[0];
                var cell2 = row.getElementsByTagName("td")[1];
                var cell3 = row.getElementsByTagName("td")[2];
                var cell4 = row.getElementsByTagName("td")[3];
                var cell5 = row.getElementsByTagName("td")[4];
                var cell6 = row.getElementsByTagName("td")[6];
                var cell7 = row.getElementsByTagName("td")[7];
                var cell8 = row.getElementsByTagName("td")[8];
                var cell9 = row.getElementsByTagName("td")[9];

                var resi = cell1.innerHTML;
                var alamat = cell2.innerHTML;
                var kodepos = cell3.innerHTML;
                var pengirim = cell4.innerHTML;
                var penerima = cell5.innerHTML;
                var waktu1 = cell6.innerHTML;
                var keterangan1 = cell7.innerHTML;
                var waktu2 = cell8.innerHTML;
                var keterangan2 = cell9.innerHTML;

                document.getElementById("no_resi").value = resi;
                document.getElementById("alamat").value = alamat;
                document.getElementById("kodepos").value = kodepos;
                document.getElementById("pengirim").value = pengirim;
                document.getElementById("penerima").value = penerima;
                document.getElementById("tanggal1").value = waktu1;
                document.getElementById("keterangan1").value = keterangan1;
                document.getElementById("waktu2").value = waktu2;
                document.getElementById("keterangan2").value = keterangan2;

            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
}

// read data

db.collection('resi').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderResi(doc)
        // console.log(doc.data())
    })
})

// update data

function edit_resi() {
    var id = document.getElementById("no_resi").value;
    var pengirim = document.getElementById("pengirim").value;
    var penerima = document.getElementById("penerima").value;
    var keterangan1 = document.getElementById("keterangan1").value;

    db.collection('resi').doc(id).update({
        waktu1: getDate(),
        pengirim: pengirim,
        penerima: penerima,
        keterangan1: keterangan1
    })

    reload_page(1200);
}

// delete data

function delete_resi(){
    var id = document.getElementById('no_resi').value;

    db.collection('resi').doc(id).delete();

    alert('Data berhasil dihapus');
    reload_page(1500);
}