import { Card, Page, Layout, TextContainer, Heading, ChoiceList, TextField, Filters, ResourceList, ResourceItem, TextStyle, Button, Avatar } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { EmptyListCard } from "../../components/EmptyListCard";

export default function FabricTable() {
  const navigate = useNavigate();

  // Entry order: [Image, Name, Material, Color, Status, Notes, Edit, Delete],
  const entryList = [];

  // Show EmptyState card if there's no entries
  const emptyStateMarkup = !entryList?.length ? (
    <EmptyListCard/>
  ) : null;


  // Data table with sorting and filters
  function FabricDataTable() {
    const [taggedWith, setTaggedWith] = useState("VIP");
    const [queryValue, setQueryValue] = useState(null);

    const handleTaggedWithChange = useCallback(
      (value) => setTaggedWith(value),
      []
    );
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleClearAll = useCallback(() => {
      handleTaggedWithRemove();
      handleQueryValueRemove();
    }, [handleQueryValueRemove, handleTaggedWithRemove]);

    const resourceName = {
      singular: "customer",
      plural: "customers",
    };

    const items = [
      {
        id: 108,
        url: "customers/341",
        name: "Mae Jemison",
        location: "Decatur, USA",
      },
      {
        id: 208,
        url: "customers/256",
        name: "Ellen Ochoa",
        location: "Los Angeles, USA",
      },
    ];

    const filters = [
      {
        key: "taggedWith1",
        label: "Tagged with",
        filter: (
          <TextField
            label="Tagged with"
            value={taggedWith}
            onChange={handleTaggedWithChange}
            autoComplete="off"
            labelHidden
          />
        ),
        shortcut: true,
      },
    ];

    const appliedFilters = !isEmpty(taggedWith)
      ? [
          {
            key: "taggedWith1",
            label: disambiguateLabel("taggedWith1", taggedWith),
            onRemove: handleTaggedWithRemove,
          },
        ]
      : [];

    const filterControl = (
      <Filters
        queryValue={queryValue}
        filters={filters}
        appliedFilters={appliedFilters}
        onQueryChange={setQueryValue}
        onQueryClear={handleQueryValueRemove}
        onClearAll={handleClearAll}
      >
        <div style={{ paddingLeft: "8px" }}>
          <Button onClick={() => console.log("New filter saved")}>Save</Button>
        </div>
      </Filters>
    );

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          filterControl={filterControl}
        />
      </Card>
    );

    function renderItem(item) {
      const { id, url, name, location } = item;
      const media = <Avatar customer size="medium" name={name} />;

      return (
        <ResourceItem id={id} url={url} media={media}>
          <h3>
            <TextStyle variation="strong">{name}</TextStyle>
          </h3>
          <div>{location}</div>
        </ResourceItem>
      );
    }

    function disambiguateLabel(key, value) {
      switch (key) {
        case "taggedWith1":
          return `Tagged with ${value}`;
        default:
          return value;
      }
    }

    function isEmpty(value) {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return value === "" || value == null;
      }
    }
  }



  return (
    <Page>
      <TitleBar
        title="Fabric Data Table"
        primaryAction={{
          content: "New Entry",
          onAction: () => navigate("/fabrics/new"),
        }}
        secondaryActions={[
          {
            content: "View All Tags",
            onAction: () => navigate("/tags/tag-table"),
          }
        ]}
      />
      {emptyStateMarkup}
      <FabricDataTable/>
    </Page>
  );
}
