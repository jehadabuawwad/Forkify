class SearchView {
  _perentElement = document.querySelector(".search");
  _errorMessage = "";
  _successMessage = "";

  addHandelerSearch(handler) {
    this._perentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._perentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._perentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
