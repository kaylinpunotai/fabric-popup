// Get fabrics and render Action Select for customer fabric selection
// Loaded in fabric-selector.liquid


///// WIP /////
// - add material filters

(function () {
  // get a specific element from liquid
  function getSelect(selector) {
    return document.querySelector(selector);
  }

  // get all fabrics filtered by allowed materials
  function getFabrics(filters) {
    const proxySubpath = "/apps/api";
    const url = proxySubpath + "/api/fabric_entries/index"; // "/api/fabric_entries/filter";
    const method = "GET"; // "POST"
    const headers = { "Content-Type": "application/json" };
    const body = ""; // {"fabric_entry": {"material": filters}};
    return fetch(url); // return fetch(url, {method: method, headers: headers, body: JSON.stringify(body),});
  }

  // creates an option inside the select input
  function createOption(fabric) {
    const option = document.createElement("option");
    option["value"] = fabric;
    option.innerHTML = fabric;

    return option;  
  }

  // set options for customers to select using fabric list
  async function setOptions() {
    const debug = false;
    const select = getSelect(".fabric-selector");

    if (debug) {
      const fabrics = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].sort();
      fabrics.forEach( (fabric) => {
        select.appendChild(createOption(fabric));
      });
    } else {
      const result = await getFabrics("filter");
      if (result.ok) {
        const fabrics = await result.json();
        console.log(fabrics);
        fabrics.forEach( (fabric) => {
          select.appendChild(createOption(fabric.title));
        });
      }
      return { status: "success" };
    }
  }

  setOptions();
})();