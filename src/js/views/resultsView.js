import View from "./View";
import PreviewView from "./previewView";

class ResultsView extends View {
  _perentElement = document.querySelector(".results");
  _errorMessage = ' "No recipes found for your query! Please try again ;)';
  _successMessage = "";

  _generateMarkup() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
