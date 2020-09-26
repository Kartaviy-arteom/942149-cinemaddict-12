import moment from "moment";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BaseSmartComponent from "./base-smart-component.js";

const BAR_HEIGHT = 50;
const Period = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const renderChart = (statisticCtx, filmLabels, genreCountLabels) => {
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: filmLabels,
      datasets: [{
        data: genreCountLabels,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    },
  });
};

const checkDatePeriod = (film, period) => {
  return moment(film.watchingDate).isBetween(period, new Date());
};

const isTodaysDate = (dateA) => {
  const dateB = new Date();
  return moment(dateA).isSame(dateB, `day`);
};

const calculateTotalDuration = (films) => {
  let duration = 0;
  films.forEach((el) => (duration += el.runtime));
  return duration;
};
const transformDuration = (minutesNumber) => {
  return moment.utc(moment.duration(minutesNumber, `minutes`).asMilliseconds()).format(`H mm`);
};

const createStatistic = (filmData, maxCountGenreName, interval = `all-time`) => {
  let totalDuration = calculateTotalDuration(filmData);
  totalDuration = transformDuration(totalDuration).split(` `);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${interval === Period.ALL ? `checked=""` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${interval === Period.TODAY ? `checked=""` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${interval === Period.WEEK ? `checked=""` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${interval === Period.MONTH ? `checked=""` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${interval === Period.YEAR ? `checked=""` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filmData.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDuration[0]} <span class="statistic__item-description">h</span> ${totalDuration[1]} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${maxCountGenreName}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistic extends BaseSmartComponent {
  constructor(data, currentPeriod) {
    super();
    this._data = data.slice();
    this._currentPeriod = currentPeriod;
    this._data = this._selectFilmsFromPeriod(this._data, currentPeriod);
    this._genresCount = [];
    this._genreNames = new Set();
    this._genres = {};
    this._maxCountGenreName = ``;
    this._getGenresStatistic();
    this._getMaxCountGenrename();
    this._getGenresCount();

    this._genreChart = null;
  }

  _getTemplate() {
    return this._currentPeriod ? createStatistic(this._data, this._maxCountGenreName, this._currentPeriod) : createStatistic(this._data, this._maxCountGenreName);
  }

  setFormChangeHandler(callback) {
    this._callback.change = callback;
    this.getElement().querySelector(`form.statistic__filters`).addEventListener(`change`, this._callback.change);
  }

  _selectFilmsFromPeriod(data, interval) {
    let startDate = new Date();

    switch (interval) {
      case Period.TODAY:
        data = data.filter((film) => isTodaysDate(film.watchingDate));
        break;
      case Period.WEEK:
        startDate.setDate(startDate.getDate() - 7);
        data = data.filter((film) => checkDatePeriod(film, startDate));
        break;
      case Period.MONTH:
        startDate.setMonth(startDate.getMonth() - 1);
        data = data.filter((film) => checkDatePeriod(film, startDate));
        break;
      case Period.YEAR:
        startDate.setFullYear(startDate.getFullYear() - 1);
        data = data.filter((film) => checkDatePeriod(film, startDate));
        break;
      default:
        data = data;
    }

    return data;
  }

  _getGenresStatistic() {
    this._data.forEach((el) => el.genre.forEach((genre) => {
      if (!this._genres[genre]) {
        this._genres[genre] = 0;
      }
      this._genreNames.add(genre);
      this._genres[genre]++;
    }
    ));
  }

  _getGenresCount() {
    this._genreNames.forEach((el) => this._genresCount.push(this._genres[el]));
  }

  _getMaxCountGenrename() {
    let prevMaxCount = 0;
    for (let key in this._genres) {
      if (this._genres[key] > prevMaxCount) {
        this._maxCountGenreName = key;
        prevMaxCount = this._genres[key];
      }
    }
  }

  remove() {
    super.remove();
    if (this._genreChart !== null) {
      this._genreChart = null;
    }
  }

  setChart() {
    if (this._genreChart !== null) {
      this._genreChart = null;
    }

    const genreNames = Array.from(this._genreNames);

    let statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * genreNames.length;

    this._genreChart = genreNames.length ? renderChart(statisticCtx, genreNames, this._genresCount) : null;
  }
}
