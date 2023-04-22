import icons from '../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';
class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'NO bookmark found ..please find a rceipe and bookmark it';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkUp() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookMarksView();
