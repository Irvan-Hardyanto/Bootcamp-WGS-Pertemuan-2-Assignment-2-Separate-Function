const {pertanyaan,saveToJSONFile}= require('./function.js');

//await harus berada di dalam async
const main=async ()=>{
    const name = await pertanyaan("what is your name?");//menunggu promise nya resolve, lalu lanjutkan ke baris berikutnya
    const email = await pertanyaan("what is your email?");//menunggu promise nya resolve, lalu lanjutkan ke baris berikutnya
    const mobile = await pertanyaan("what is your mobile phone number?");//menunggu promise nya resolve, lalu lanjutkan ke baris berikutnya

    saveToJSONFile(name,mobile,email);
}

main();