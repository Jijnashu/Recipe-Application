import icons from '../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No Recipe Found..Please try again';
  _message = '';
  _generateMarkUp() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new ResultView();
