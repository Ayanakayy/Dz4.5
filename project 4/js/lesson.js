const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');
const krwInput = document.querySelector('#krw');

const convertor = (element, to1, to2, to3) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/convertor.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            let som;

            if (element.id === "som") {
                som = parseFloat(element.value);
            } else if (element.id === "usd") {
                som = element.value * data.usd;
            } else if (element.id === "eur") {
                som = element.value * data.eur;
            } else if (element.id === "krw") {
                som = element.value * data.krw;
            }

            to1.value = (som / data.usd).toFixed(2); // USD
            to2.value = (som / data.eur).toFixed(2); // EUR
            to3.value = (som / data.krw).toFixed(2); // KRW
        };
    };
};

// подключаем все поля
convertor(somInput, usdInput, eurInput, krwInput);
convertor(usdInput, somInput, eurInput, krwInput);
convertor(eurInput, somInput, usdInput, krwInput);
convertor(krwInput, somInput, usdInput, eurInput);