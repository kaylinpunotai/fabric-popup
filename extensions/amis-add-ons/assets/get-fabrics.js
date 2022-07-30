// Get fabrics and render Action Select for customer fabric selection
// Loaded in fabric-selector.liquid


///// WIP /////
// - add material filters

(function () {
  const debug = false;
  const proxySubpath = "/apps/api";
  setOptions();
  
  // get a specific element from liquid
  function getElement(selector) {
    return document.querySelector(selector);
  }

  // get filtered material from schema settings
  function getFilters() {
    const filters = `{{ cotton }}`;
    console.log(filters)
  }
  
  // get all active fabrics filtered by allowed materials
  function getFabrics(filters) {
    const url = proxySubpath + "/api/fabric_entries/active"; // "/api/fabric_entries/filter";
    const method = "GET"; // "POST"
    const headers = { "Content-Type": "application/json" };
    const body = ""; // {"fabric_entry": {"material": filters}};
    return fetch(url); // return fetch(url, {method: method, headers: headers, body: JSON.stringify(body),});
  }

  // create an option to be appended to the select input
  function createOption(name, imageUrl) {
    const option = document.createElement("option");
    // option["value"] = name;
    option["pic"] = imageUrl;
    option.innerHTML = name;

    return option;  
  }

  // set options for customers to select using fabric list
  async function setOptions() {
    // const filters = getFilters();
    const selects = getElement(".fabric-selector");

    selects.forEach( (select) => {
      if (debug) {
        const fabrics = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].sort();
        fabrics.forEach( (fabric) => {
          select.appendChild(createOption(fabric));
        });
      } else {
        const result = await getFabrics("filters");
        if (result.ok) {
          let fabrics = await result.json();
          fabrics.forEach( (fabric) => {
            console.log(fabric);
            select.appendChild(createOption(fabric.title, fabric.image));
          });
        }
        return { status: "success" };
      }
    });
  }

  function handleSelectOnChange() {
    const select = getElement(".fabric-selector");

  }
})();
