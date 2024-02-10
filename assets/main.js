//* ---------------------------------- */
//*             DEGISKENLER            */
//* ---------------------------------- */
const numberButtons = document.querySelectorAll(".num")
const operationButtons = document.querySelectorAll(".operator")
const equalButtons = document.querySelector(".equal")
const previousDisplay = document.querySelector(".previous-display")
const currentDisplay = document.querySelector(".current-display")



//^ OPERATOR DEGISKENLERI
let topScreenText = ""
let bottomScreenText = ""
let operation = ""

//todo eşittir yada percent e basıldıktan sonra yeni işleme yeni sayılar girmek için, tıklandı tıklanmadı boolean değişkeni hazırladık, eşittir (ve de percent) butonunda bu true yani tıklandı olacak
let equalAndPercentPressed = false




//^ HERHANGI BIR NUMBER"A BASILINCA
numberButtons.forEach((number) => {

    number.onclick = () => {

        ekranaHazirlik(number.textContent)

        updateDisplay()
    }

})




//^ EKRANA HAZIRLIK
const ekranaHazirlik = (num) => {
  //todo kullanıcı 0 girerse, sonrasında 0 ve . dışında bir sayı girerse, ekranda sadece girilen yeni sayı (0 iptal olsun) gözüksün
    if (bottomScreenText == "0" && num != "0" && num != ".") {

        bottomScreenText = num

  //! bu döngüden çık bu işini globaldeki değişkeni değiştirerek bitirdi ama bişey döndürmeyecek, daha önceki 0 ı da yok sayacak
        return
    }

  //todo kullanıcı herhangi bir yerde . girmişken, tekrar nokta girmeye kalkarsa giremesin
    if (num == "." && bottomScreenText.includes(".")) return

    
  //todo kullanıcı 10 haneden sonra girmesin
  if (bottomScreenText.length > 9) return
 
  //todo kullanıcı ilk başta 0 girer ardından tekrar 0 girerse, girilmesin, tek 0 döndürsün
    if (bottomScreenText == "0" && num == "0") return

  //todo eşittir yada percent a basıldıktan sonra girilen number tek başına ekranda görünsün,çünkü yeni işlem başlıyor(ekranda 72 yazan işlem sonucu varken 5 e basınca 725 olmasın sadece 5 olsun)
    if (equalAndPercentPressed) {
        equalAndPercentPressed=false
        bottomScreenText = num

    //! bu döngüden çık bu işini globaldeki değişkeni değiştirerek bitirdi ama bişey döndürmeyecek, daha önceki 0 ı da yok sayacak
        return
    }


  //?bütün şartları başarı ile geçtiyse basılan numaraları arka arkaya ekle
    bottomScreenText += num
}


//!BURADA YAPILANLARI EKRANA BASTIRMA
const updateDisplay = () => {
    result = currentDisplay.textContent = bottomScreenText

    if (operation) {

        result = previousDisplay.textContent = ` ${topScreenText} ${operation}`

    } else {
        result = previousDisplay.textContent = ""
    }

}


//?**************HERHANGİ BİR İŞLEME TIKLANDIĞINDA
operationButtons.forEach((op) => {
    op.onclick = () => {
    //?currentDisplay boşken, hiçbir şekilde sayı girişi yapılmamışsa, operatöre basılmasın. boş return yapmaya çalıştığınız işlemi yaptırmaz.
    //? return, fonksiyon içerisinde her yerde kullanılabilir. Kod return satırına eriştiğinde fonksiyon durur ve değer fonksiyonun çağırıldığı yere geri gönderilir. Bir fonksiyon içerisinde birden fazla return fonksiyonu da olabilir. return değer döndürmek zorunda değildir. boş return den sonra else if yerine if tercih etmeliyiz


        if (bottomScreenText == "") return


    //todo eşittire basılmadan arka arkaya işleme basılırsa (alt ve üst ekran doluyken işleme basılmaya devam edilirse)
        if (bottomScreenText && topScreenText) hesapla()

        operation = op.textContent

        topScreenText = bottomScreenText
        bottomScreenText = ""

        updateDisplay()
    }

})



//?**************eşittir butonuna tıklandığında
equalButtons.onclick = () => {
  //eşittire basınca istenilen işlem yapılması için fonksiyon
    hesapla()

  //buradaki değişkenlerle yapılna işlemlerin sonucu ekrana yansıtılsın
    updateDisplay()

    equalAndPercentPressed = true



}




//! HESAPLA FONKSİYONU
const hesapla = () => {
    switch (operation) {
        case "+":
            result = Number(topScreenText) + +bottomScreenText
            break;
        case "-":
            result = topScreenText - bottomScreenText
            break;
        case "x":
            result = topScreenText * bottomScreenText
            break;
        case "÷":
            result = topScreenText / bottomScreenText
            break;
        default:
            break;
    }
    bottomScreenText = result
    topScreenText = ""
    operation = ""

}

//? AC'ye basildiginda 
document.querySelector(".ac").onclick = () => {
operation =""
bottomScreenText=""
topScreenText=""

updateDisplay()

}

//? PM butonuna basıldığında
document.querySelector(".pm").onclick = () => {

    if (!bottomScreenText) return

    bottomScreenText=bottomScreenText*-1
    updateDisplay()

}


//?percent % butonuna basıldığında
document.querySelector(".percent").onclick = () => {

    bottomScreenText = bottomScreenText/100
    updateDisplay()
    bottomScreenText=""

    //& 2. yol
    // equalAndPercentPressed=true
}











