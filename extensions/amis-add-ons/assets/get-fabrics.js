// Get fabrics and render Action Select for customer fabric selection
// Loaded in fabric-selector.liquid

(function () {
  const debug = false;
  const proxySubpath = "/apps/api";
  setOptions();
  handleOnChange();


  // get filtered material from schema settings
  function getFilters() {
    const filterCheckboxes = document.getElementsByClassName("material_filters");
    let filters = [];
    [...filterCheckboxes].forEach( (checkbox) => {
      if (checkbox.getAttribute("checked") == "true") {
        filters.push(checkbox.getAttribute("label"));
      }
    });
    return filters;
  }
  
  // get all active fabrics filtered by allowed materials
  function getFabrics() {
    const url = proxySubpath + "/api/fabric_entries/active";
    return fetch(url);
  }

  // create an option to be appended to the select input
  function createOption(name, imageUrl) {
    const option = document.createElement("option");
    option["pic"] = imageUrl;
    option.innerHTML = name;

    return option;  
  }

  // set options for customers to select using fabric list
  async function setOptions() {
    let filters = getFilters();
    const selects = document.getElementsByClassName("fabric_select");

    if (debug) {
      const fabrics = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].sort();
      fabrics.forEach( (fabric) => {
        selects.forEach( (select) => {
          select.appendChild(createOption(fabric));
        });
      });
    } else {
      const result = await getFabrics(filters);
      if (result.ok) {
        let fabrics = await result.json();

        // add fabric only if it has an allowed material (based on filter)
        fabrics.forEach( (fabric) => {
          [...selects].forEach( (select) => {
            let materials = JSON.parse(fabric.material);
            let added = false;
            materials.forEach( (material) => {
              if (filters.includes(material) && added==false) {
                select.appendChild(createOption(fabric.title, fabric.image));
                // console.log("allowed");
                // console.log(fabric);
                added = true;
              } else {
                // console.log("excluded");
                // console.log(fabric);
              }
            })
          });
        });
      }
      return { status: "success" };
    }
  }

  // handle onchange for text input and select
  // if Custom: display textbox for user-defined value
  // for pic: display pic
  // if pic=undefined: do not display pic
  function handleOnChange() {
    const blocks = document.getElementsByClassName("fabric_option_block");
    [...blocks].forEach( (block) => {
      const select = block.getElementsByClassName("fabric_select")[0];
      const wrapper = block.getElementsByClassName("wrapper")[0];
      const image = block.getElementsByClassName("pic")[0];
      const textbox = block.getElementsByClassName("textbox")[0];
      const custom = block.getElementsByClassName("custom_option")[0];

      // set Custom value to textbox value
      textbox.onchange = function() {
        custom.value = "Custom: " + this.value;
      }

      select.onchange =  function() {
        if (this.options[this.selectedIndex].text === "-Custom-") {
          wrapper.style = "visibility: visible";
          image.style = "visibility: hidden";
        } else if (this.options[this.selectedIndex].pic === undefined) {
          wrapper.style = "visibility: hidden";
          image.style = "visibility: hidden";
        } else {
          wrapper.style = "visibility: hidden";
          image.src = this.options[this.selectedIndex].pic;
          image.style = "visibility: visible";
        }
      }      
    });
  }
})();
