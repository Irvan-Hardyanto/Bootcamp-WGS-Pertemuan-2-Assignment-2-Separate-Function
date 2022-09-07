//import module-module yang dibutuhkan
const validator = require('validator');
const readLine = require('readline');
const fs = require('fs');

//inisialisasi objek readline
const rl=readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

//direktori dan nama file kontak.
const dirPath='data';//bisa diimprove lebih lanjut
const dataPath='data/contacts.json';//bisa diimprove lebih lanjut

if(!fs.existsSync(dirPath)){//periksa apakah folder 'data' sudah dibuat
    //jika belum, maka buat folder data
    fs.mkdirSync(dirPath);
}

if(!fs.existsSync(dataPath)){//periksa apakah berkas contacts.json sudah dibuat
    //jika belum, maka buat file contacts.json
    fs.writeFileSync(dataPath,'[]');
}

//menyimpan pertanyaan di dalam function untuk menghindari callback hell.
//dan menggunakan promise
const pertanyaan=(question)=>{
    //Promise bisa dianalogikan sebagai sebuah "janji".
    return new Promise((resolve, reject) => {
        rl.question(question,(answer)=>{
            resolve(answer);//resolve itu callback (function)
        })
    });
}

//function untuk save data ke dalam berkas .json
const saveToJSONFile=(name,mobile,email)=>{
    if(!validator.isMobilePhone(mobile,'id-ID')){//validasi nomor telepon
        console.log("wrong phone number format!");
        rl.close();
        return;// di return supaya ketika nomor telfon nya salah, tidak dimasukkan ke contacts
    }
    if(!validator.isEmail(email)){//validasi email
        console.log("wrong email format!");
        rl.close();
        return;// di return supaya ketika email nya salah, tidak dimasukkan ke contacts
    }
    const contact={name,mobile,email};//buat sebuah objek yang memiliki atribut name,mobile, dan email.
    const file = fs.readFileSync('data/contacts.json','utf8');//baca isi file contacts
    const contacts = JSON.parse(file);//konversi dari format JSON
    contacts.push(contact);//tambahkan nama,nomor telepon, dan email yang baru saja dibaca dari cmd
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));//tulis data yang baru ke dalam berkas .json
    console.log('Terimakasih sudah memasukkan data!');//konfirmasi data sudah berhasil ditulis ke file json
    rl.close();
}

exports.pertanyaan=pertanyaan;//harus di export supaya bisa dipanggil dari file lain.
exports.saveToJSONFile=saveToJSONFile;