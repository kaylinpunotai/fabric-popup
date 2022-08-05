// Get fabrics and render Action Select for customer fabric selection
// Loaded in fabric-selector.liquid


(function () {
  const debug = false;
  const proxySubpath = "/apps/api";

  const blocks = document.getElementsByClassName("fabric_option_block");
  [...blocks].forEach( (block) => {
    setOptions(block);
    // handleOnChange(block);
  });


  // get filtered material from schema settings
  function getFilters(block) {
    const filterCheckboxes = block.getElementsByClassName("material_filters");
    let filters = [];
    [...filterCheckboxes].forEach( (checkbox) => {
      if (checkbox.getAttribute("checked") == "true") {
        filters.push(checkbox.getAttribute("label"));
      }
    });
    return filters;
  }
  
  // get all active fabrics filtered by allowed materials
  function getAllFabrics() {
    const url = proxySubpath + "/api/fabric_entries/active";
    return fetch(url);
  }

  // create an option to be appended to the select menu
  function createOption(name, imageUrl, height, width) {
    const option = document.createElement("div");
    const pic = document.createElement("img");
    const text = document.createElement("span");

    // if the option doesn't have an image, show a blank icon
    if (imageUrl == "") {
      pic["src"] = 'data:image/svg+xml;utf8,<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.6a1.6 1.6 0 0 1 1.6-1.6h3.4a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3.4zm14.4-1.6a1.6 1.6 0 0 1 1.6 1.6v3.4a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3.4zm0 16h-3.4a1 1 0 1 1 0-2h3v-3a1 1 0 1 1 2 0v3.4a1.6 1.6 0 0 1-1.6 1.6zm-12.8 0a1.6 1.6 0 0 1-1.6-1.6v-3.4a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3.4z"/></svg>';
    } else {
      pic["src"] = imageUrl;
    }
    pic["class"] = "option_pic";
    pic["alt"] = "";
    pic["height"] = height;
    pic["width"] = width;
    pic["loading"] = "lazy";
    option.appendChild(pic);

    // // add label
    const newInner = document.createElement("div");
    newInner.innerHTML = name;
    while (newInner.firstChild) {
      text.appendChild(newInner.firstChild);
    }
    text.setAttribute("class", "option_text");
    option.appendChild(text);

    // set option attributes
    option.setAttribute("class", "custom_option");
    // option.setAttribute("id", "custom_option_" + name + "{{ option_name }}");
    option.setAttribute("data-value", name);

    return option;  
  }

  // set options in menu for customers to select using fabric list
  async function setOptions(block) {
    const imgHeight = block.getAttribute("imgHeight");
    const imgWidth = block.getAttribute("imgWidth");
    const menus = block.getElementsByClassName("fabric_select_menu");
    const filters = getFilters(block);

    if (debug) {
      const fabrics = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].sort();
      fabrics.forEach( (fabric) => {
        menus.forEach( (select) => {
          select.appendChild(createOption(fabric));
        });
      });
    } else {
      const result = await getAllFabrics();
      if (result.ok) {
        let fabrics = await result.json();

        // add fabric to menu only if it has an allowed material (based on filter)
        fabrics.forEach( (fabric) => {
          [...menus].forEach( (menu) => {
            let materials = JSON.parse(fabric.material);
            let added = false;
            materials.forEach( (material) => {
              if (filters.includes(material) && added==false) {
                menu.appendChild(createOption(fabric.title, fabric.image, imgHeight, imgWidth));
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
  function handleOnChange(block) {
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
  }

  function handleClick(block) {

  }
})();
