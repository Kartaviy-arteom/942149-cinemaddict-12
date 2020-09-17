import BaseComponent from "./base-component.js";

const createFilmsBlockTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
        </div>
      </section>
    </section>`
  );
};

export default class FilmsBlock extends BaseComponent {
  _getTemplate() {
    return createFilmsBlockTemplate();
  }
}
