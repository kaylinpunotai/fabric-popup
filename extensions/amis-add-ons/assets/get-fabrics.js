// Get fabrics and render Action Select for customer fabric selection
// Loaded in fabric-selector.liquid

(function () {
  // get a specific element from liquid
  function getSelect(selector) {
    return document.querySelector(selector);
  }

  // get all fabrics filtered by allowed materials
  function getFabrics(filters) {
    const url = "/apps/api/fabric_entries/index"; // "/api/fabric_entries/filter";
    const method = "GET"; // "POST"
    const headers = { "Content-Type": "application/json" };
    const body = ""; // {"fabric_entry": {"material": filters}};
    return fetch(url); // return fetch(url, {method: method, headers: headers, body: JSON.stringify(body),});
  }

  // set options for customers to select using fabric list
  async function setOptions() {
    const select = getSelect(".fabric-selector");
    const result = await getFabrics("filter");
    if (result.ok) {
      console.log("ok");
    }
    return { status: "success" };
  }

  setOptions();
})();