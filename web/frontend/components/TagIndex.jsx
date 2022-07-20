import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  IndexTable,
  UnstyledLink,
  Filters,
  Select,
  ChoiceList,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

// Function to truncate long strings
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "…" : str;
}

export function TagIndex(props) {
  const debug = true;
  const navigate = useNavigate();

  ///// FILTERS ///// Category
  // Default values
  var categoryChoices = [
    { label: "Color", value: "Color" },
    { label: "Material", value: "Material" }
  ]

  // Mock values for testing
  if (debug) {
  }

  const [category, setCategory] = useState();

  const handleCategoryChange = useCallback(
    (value) => setCategory(value),
    []
  );

  const handleCategoryRemove = useCallback(() => setCategory(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleCategoryRemove();
    }, [
      handleCategoryRemove,
    ]
  );

  const filters = [
    {
      key: "category",
      label: "Category",
      filter: (
        <ChoiceList 
          title="Category"
          titleHidden
          choices={categoryChoices}
          selected={category || []}
          onChange={handleCategoryChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (category?.length) {
    const key = "category";
    appliedFilters.push({
      key,
      label: category.join(", "),
      onRemove: handleCategoryRemove,
    });
  }
  

  // SORTING // Name, Category, Assignments
  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Category", value: "category" },
    { label: "Assignments", value: "assignments" },
  ];
  const [sortValue, setSortValue] = useState("name");
  const handleSortChange = useCallback((value) => setSortValue(value), []);

  // Map entry and organize data into row cells. Each entry gets its own index page
  const rowMarkup = props.tags.map(
    ({ name, category, assignments, notes, actions }, index) => {

      return (
        <IndexTable.Row
          id={index}
          key={index}
          position={index}
          onClick={() => {
            navigate(`/tags/${index}`);
          }}
        >
          <IndexTable.Cell classname="nameCol">
            <UnstyledLink data-primary-link url={`/tags/${index}`}>
              {truncate(name, 25)}
            </UnstyledLink>
          </IndexTable.Cell>
          <IndexTable.Cell classname="categoryCol">
            {category}
          </IndexTable.Cell>
          <IndexTable.Cell classname="assignmentsCol">
            {assignments}
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
        itemCount={props.tags.length}
        headings={[
          { title: "Name" },
          { title: "Category" },
          { title: "Assignments" },
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
