import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  Icon,
  IndexTable,
  Filters,
  Select,
  useIndexResourceState,
  TextStyle,
  Thumbnail,
  UnstyledLink,
  Button,
  TextField,
  ChoiceList,
  Badge
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { ImageMajor, DeleteMajor } from "@shopify/polaris-icons";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";


// Function to truncate long strings
function truncate(str, n) {
  if (str == null) {return}
  return str.length > n ? str.substr(0, n - 1) + "…" : str;
}

export function FabricIndex(props) {
  const debug = false;
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  let entries = props.entries;

  ///// FILTERS ///// Material, Color, Status, Notes
  // Default values
  let materialChoices = [];
  let colorChoices = [];
  let statusChoices = [
    { label: "Active", value: "Active" },
    { label: "Hidden", value: "Hidden" }
  ]
  let notesChoices = [
    { label: "Notes", value: "Notes" },
    { label: "No Notes", value: "No Notes" }
  ]

  // Mock values for testing
  if (debug) {
    materialChoices = [
      { label: "Cotton", value: "Cotton" },
      { label: "Velvet", value: "Velvet" },
    ]
    colorChoices = [
      { label: "Green", value: "Green" },
      { label: "Beige", value: "Beige" },
    ]
    console.log(materialChoices);
  } else {
    let allMats = [];
    let allCols = [];
    ({data: allMats} = useAppQuery( {
      url: `/api/tag_entries/Material`,
    }));
    ({data: allCols} = useAppQuery( {
      url: `/api/tag_entries/Color`,
    }));
    for (let x in allMats) {materialChoices.push({label: allMats[x], value: allMats[x]})}
    for (let x in allCols) {colorChoices.push({label: allCols[x], value: allCols[x]})}
  }

  const [material, setMaterial] = useState();
  const [color, setColor] = useState();
  const [status, setStatus] = useState();
  const [notes, setNotes] = useState();

  const handleMaterialChange = useCallback(
    (value) => setMaterial(value),
    []
  );
  const handleColorChange = useCallback(
    (value) => setColor(value),
    []
  );
  const handleStatusChange = useCallback(
    (value) => setStatus(value),
    []
  );
  const handleNotesChange = useCallback(
    (value) => setNotes(value),
    []
  );

  const handleMaterialRemove = useCallback(() => setMaterial(null), []);
  const handleColorRemove = useCallback(() => setColor(null), []);
  const handleStatusRemove = useCallback(() => setStatus(null), []);
  const handleNotesRemove = useCallback(() => setNotes(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleMaterialRemove();
    handleColorRemove();
    handleStatusRemove();
    handleNotesRemove();
    }, [
      handleMaterialRemove,
      handleColorRemove,
      handleStatusRemove,
      handleNotesRemove,
    ]
  );

  const filters = [
    {
      key: "material",
      label: "Material",
      filter: (
        <ChoiceList 
          title="Material"
          titleHidden
          choices={materialChoices}
          selected={material || []}
          onChange={handleMaterialChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "color",
      label: "Color",
      filter: (
        <ChoiceList 
          title="Color"
          titleHidden
          choices={colorChoices}
          selected={color || []}
          onChange={handleColorChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "status",
      label: "Status",
      filter: (
        <ChoiceList 
          title="Status"
          titleHidden
          choices={statusChoices}
          selected={status || []}
          onChange={handleStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "notes",
      label: "Notes",
      filter: (
        <ChoiceList 
          title="Notes"
          titleHidden
          choices={notesChoices}
          selected={notes || []}
          onChange={handleNotesChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (material?.length) {
    const key = "material";
    appliedFilters.push({
      key,
      value: material,
      label: material.join(", "),
      onRemove: handleMaterialRemove,
    });
  }
  if (color?.length) {
    const key = "color";
    appliedFilters.push({
      key,
      value: color,
      label: color.join(", "),
      onRemove: handleColorRemove,
    });
  }
  if (status?.length) {
    const key = "status";
    appliedFilters.push({
      key,
      value: status,
      label: status.join(", "),
      onRemove: handleStatusRemove,
    });
  }
  if (notes?.length) {
    const key = "notes";
    var notesValue = [];
    if (notes.includes("Notes")) {notesValue.push(true)}
    if (notes.includes("No Notes")) {notesValue.push(false)}
    appliedFilters.push({
      key,
      value: notesValue,
      label: notes.join(", "),
      onRemove: handleNotesRemove,
    });
  }

  
  // Map entry and organize data into row cells. Each entry gets its own index page
  const rowMarkup = props.entries.map(
    ({ image, title, material, color, status, notes, actions, id }, index) => {
      var show = true;

      const parsedMaterial = JSON.parse(material);
      const parsedColor = JSON.parse(color);

      // Check against filters. Only return row if values match filters.
      for (let filter in appliedFilters) {
        var key = appliedFilters[filter]["key"];
        var value = appliedFilters[filter]["value"];
        if (key == "material") {
          if (!parsedMaterial.some(i => value.includes(i))) {
            show = false;
            break;
          }
        }
        else if (key == "color") {
          if (!parsedColor.some(i => value.includes(i))) {
            show = false;
            break;
          }
        }
        else if (key == "status") {
          if (!value.includes(status)) {
            show = false;
            break;
          }
        }
        else if (key == "notes") {
          var noteExists = true;
          if (notes.length == 0) {
            noteExists = false;
          }
          if (!value.includes(noteExists)) {
            show = false;
            break;
          }
        }
      }

      const handleDelete = useCallback(
        async () => {
          const response = await fetch(`/api/fabric_entries/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            navigate(`/fabrics/fabric-table`);
          }
        }, []
      );

      if (show) {
        return (
          <IndexTable.Row
            id={index}
            key={index}
            position={index}
            onClick={() => {
              navigate(`/fabrics/${id}`);
            }}
          >
            <IndexTable.Cell classname="imageCol">
              <Thumbnail
                source={image?.url || ImageMajor}
                alt="placeholder"
                color="base"
                size="small"
              />
            </IndexTable.Cell>
            <IndexTable.Cell classname="nameCol">
              <UnstyledLink data-primary-link url={`/fabrics/${id}`}>
                {truncate(title, 25)}
              </UnstyledLink>
            </IndexTable.Cell>
            <IndexTable.Cell classname="materialCol">
              {Array.from(parsedMaterial).join(", ")}
            </IndexTable.Cell>
            <IndexTable.Cell classname="colorCol">
              {Array.from(parsedColor).join(", ")}
            </IndexTable.Cell>
            <IndexTable.Cell classname="statusCol">
              {status == "Active" ? (
                <Badge status="success">{status}</Badge>
              ) : (
                <Badge status="critical">{status}</Badge>
              )}
            </IndexTable.Cell>
            <IndexTable.Cell classname="notesCol">
              {truncate(notes, 25)}
            </IndexTable.Cell>
            <IndexTable.Cell classname="actionsCol">
              <Button destructive onClick={handleDelete}>
                <Icon source={DeleteMajor} />
              </Button>
            </IndexTable.Cell>
          </IndexTable.Row>
        );
      }
      else { return null; }
    }
  );

  // Display filter and table headers
  return (
    <Card>
      <div style={{ padding: "16px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filters
            filters={filters}
            appliedFilters={appliedFilters}
            onClearAll={handleFiltersClearAll}
            hideQueryField
          />
        </div>
      </div>
      <IndexTable
        itemCount={entries.length}
        headings={[
          { title: "Image", hidden: true },
          { title: "Name" },
          { title: "Material" },
          { title: "Color" },
          { title: "Status" },
          { title: "Notes" },
          { title: "Actions" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
