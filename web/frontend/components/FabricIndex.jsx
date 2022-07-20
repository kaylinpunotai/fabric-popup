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
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { ImageMajor } from "@shopify/polaris-icons";

// Function to truncate long strings
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "…" : str;
}

export function FabricIndex(props) {
  const debug = true;
  const navigate = useNavigate();

  ///// FILTERS ///// Material, Color, Status
  // Default values
  var materialChoices = [];
  var colorChoices = [];
  var statusChoices = [
    { label: "Active", value: "Active" },
    { label: "Hidden", value: "Hidden" }
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
  }

  const [material, setMaterial] = useState();
  const [color, setColor] = useState();
  const [status, setStatus] = useState();

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

  const handleMaterialRemove = useCallback(() => setMaterial(null), []);
  const handleColorRemove = useCallback(() => setColor(null), []);
  const handleStatusRemove = useCallback(() => setStatus(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleMaterialRemove();
    handleColorRemove();
    handleStatusRemove();
    }, [
      handleMaterialRemove,
      handleColorRemove,
      handleStatusRemove,
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
  ];

  const appliedFilters = [];
  if (material?.length) {
    const key = "material";
    appliedFilters.push({
      key,
      label: material.join(", "),
      onRemove: handleMaterialRemove,
    });
  }
  if (color?.length) {
    const key = "color";
    appliedFilters.push({
      key,
      label: color.join(", "),
      onRemove: handleColorRemove,
    });
  }
  if (status?.length) {
    const key = "status";
    appliedFilters.push({
      key,
      label: status.join(", "),
      onRemove: handleStatusRemove,
    });
  }
  

  // SORTING // Name, Status, Index
  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Status", value: "status" },
    { label: "Index", value: "index" },
  ];
  const [sortValue, setSortValue] = useState("name");
  const handleSortChange = useCallback((value) => setSortValue(value), []);
  
  // Map entry and organize data into row cells. Each entry gets its own index page
  const rowMarkup = props.entries.map(
    ({ image, name, material, color, status, notes, actions }, index) => {

      return (
        <IndexTable.Row
          id={index}
          key={index}
          position={index}
          onClick={() => {
            navigate(`/fabrics/${index}`);
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
            <UnstyledLink data-primary-link url={`/fabrics/${index}`}>
              {truncate(name, 25)}
            </UnstyledLink>
          </IndexTable.Cell>
          <IndexTable.Cell classname="materialCol">
            {Array.from(material).join(", ")}
          </IndexTable.Cell>
          <IndexTable.Cell classname="colorCol">
            {Array.from(color).join(", ")}
          </IndexTable.Cell>
          <IndexTable.Cell classname="statusCol">
            {status == "Active" ? (
              <TextStyle variation="positive">{status}</TextStyle>
            ) : (
              <TextStyle variation="negative">{status}</TextStyle>
            )}
          </IndexTable.Cell>
          <IndexTable.Cell classname="notesCol">
            {truncate(notes, 25)}
          </IndexTable.Cell>
          <IndexTable.Cell classname="actionsCol">
            {actions}
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    }
  );

  // Display filter, sort, and table headers
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
        <div style={{ paddingLeft: "0.25rem" }}>
          <Select
            labelInline
            label="Sort by"
            options={sortOptions}
            value={sortValue}
            onChange={handleSortChange}
          />
        </div>
      </div>
      <IndexTable
        itemCount={props.entries.length}
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
