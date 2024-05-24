window.addEventListener("load", async () => {
  const res = await fetch(`https://api.dastyar.io/express/weather?lat=35.715298&lng=51.404343&theme=auto`);
  const dataWeather = await res.json();
  ConvertLunarToSolarDate();
  addTableToDom(dataWeather);
  addTodayWeather(dataWeather);
  changeThem(dataWeather)
});

const ConvertLunarToSolarDate = () => {
  const dateElem = document.querySelector(".header__time");
  const today = Date.now();

  const todayFa = {
    day: getDateFormat(today, { day: "2-digit" }),
    monthTitle: getDateFormat(today, { month: "long" }),
    dayWeek: getDateFormat(today, { weekday: "long" }),
  };

  function getDateFormat(uDate, option) {
    let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
    return date;
  }

  dateElem.innerHTML = `${todayFa.dayWeek}  ${todayFa.day}  ${todayFa.monthTitle}`;
};

const addTableToDom = (dataWeather) => {
  const tableElem = document.querySelector("tbody");
  dataWeather.forEach((data) => {
    tableElem.insertAdjacentHTML(
      "beforeend",
      `
                  <tr class="table__head">
                    <td class="table__day">${data.dateTitle.replace(/[0-9]/g , '')}</td>
                    <td class="table__image-wrapper">
                      <img src="../image/icon/${data.weather.icon}.svg" class="table__image" alt="">
                    </td>
                    <td class="table__max-temp">${Math.round(
                      data.max
                    )}° حداکثر</td>
                    <td class="table__min-temp">${Math.round(
                      data.min
                    )}° حداقل</td>
                  </tr>
    `
    );
  });
};


const addTodayWeather = (data) => {
  const weatherTodayImageElem = document.querySelector('.weather-today__image')
  const todayTempElem = document.querySelector(".weather-today__temp");
  const weatherTodayConditionElem = document.querySelector(
    ".weather-today__condition"
  );
  const weatherMaxTempElem = document.querySelector(".weather-today__max-temp");
  const weatherMinTempElem = document.querySelector(".weather-today__min-temp");

  todayTempElem.innerHTML = `${Math.round(data[0].current)}°`;
  weatherTodayConditionElem.innerHTML = data[0].customDescription.text + data[0].customDescription.emoji;
  weatherMaxTempElem.innerHTML = `${Math.round(data[0].max)}° حداکثر`;
  weatherMinTempElem.innerHTML = `${Math.round(data[0].min)}° حداقل`;
  weatherTodayImageElem.src = `../image/icon/${data[0].weather.icon}.svg`
};

const changeThem = (dataWeather)=>{
  const backgroundColor = dataWeather[0].backgroundColor
  const bodyElem = document.querySelector('body')
  if(backgroundColor.includes('7D868E50')){
    bodyElem.style.background = '#33AADD'
  }
}
