import { useNavigate } from "@shopify/app-bridge-react";
import {
  Card,
  IndexTable,
  UnstyledLink,
  Filters,
  ChoiceList,
  Button,
  Icon
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { DeleteMajor } from "@shopify/polaris-icons";
import { useAuthenticatedFetch } from "../hooks";

// Function to truncate long strings
function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "…" : str;
}

export function TagIndex(props) {
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();
  let tags = props.tags;

  ///// FILTERS ///// Category, Notes
  // Default values
  var categoryChoices = [
    { label: "Color", value: "Color" },
    { label: "Material", value: "Material" }
  ]
  var notesChoices = [
    { label: "Notes", value: "Notes" },
    { label: "No Notes", value: "No Notes" }
  ]

  const [category, setCategory] = useState();
  const [notes, setNotes] = useState();

  const handleCategoryChange = useCallback(
    (value) => setCategory(value),
    []
  );
  const handleNotesChange = useCallback(
    (value) => setNotes(value),
    []
  );

  const handleCategoryRemove = useCallback(() => setCategory(null), []);
  const handleNotesRemove = useCallback(() => setNotes(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleCategoryRemove();
    handleNotesRemove();
    }, [
      handleCategoryRemove,
      handleNotesRemove,
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
  if (category?.length) {
    const key = "category";
    appliedFilters.push({
      key,
      value: category,
      label: category.join(", "),
      onRemove: handleCategoryRemove,
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
  let rowMarkup = tags.map(
    ({ name, category, assignments, notes, id }, index) => {
      var show = true;

      // Check against filters. Only return row if values match filters.
      for (let filter in appliedFilters) {
        var key = appliedFilters[filter]["key"];
        var value = appliedFilters[filter]["value"];
        if (key == "category") {
          if (!value.includes(category)) {
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
          const response = await fetch(`/api/tag_entries/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            navigate(`/tags/tag-table`);
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
              navigate(`/tags/${id}`);
            }}
          >
            <IndexTable.Cell classname="nameCol">
              <UnstyledLink data-primary-link url={`/tags/${id}`}>
                {truncate(name, 25)}
              </UnstyledLink>
            </IndexTable.Cell>
            <IndexTable.Cell classname="categoryCol">
              {category}
            </IndexTable.Cell>
            {/* <IndexTable.Cell classname="assignmentsCol">
              {assignments}
            </IndexTable.Cell> */}
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
        itemCount={tags.length}
        headings={[
          { title: "Name" },
          { title: "Category" },
          // { title: "Assignments" },
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
