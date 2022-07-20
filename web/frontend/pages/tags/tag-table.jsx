import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { EmptyListCard } from "../../components/EmptyListCard";
import { TagIndex } from "../../components";

export default function TagTable() {
  const debug = true;
  const navigate = useNavigate();

  // Entry order: {Name, Category, Assignments, Notes, Actions},
  var tagList = []
  if (debug) {
    // Mock tags for testing
    tagList = [
      {
        name: "tag0",
        category: "Color",
        assignments: 5,
        notes: "123456789012345678901234567890",
        actions: "",
      },
      {
        name: "askd",
        category: "Material",
        assignments: 0,
        notes: "12kjal asd",
        actions: "",
      },
      {
        name: "mkajsld",
        category: "Color",
        assignments: 16,
        notes: "",
        actions: "",
      },
    ]
  }

  // Show EmptyState card if there's no entries
  const emptyStateMarkup = !tagList?.length ? (
    <EmptyListCard/>
  ) : null;

  // Show TagIndex if there are tags
  const tagsMarkup = tagList?.length ? (
    <TagIndex tags={tagList} />
  ) : null;

  return (
    <Page>
      <TitleBar
        title="Tag Data Table"
        primaryAction={{
          content: "New Tag",
          onAction: () => navigate("/tags/new"),
        }}
        secondaryActions={[
          {
            content: "View All Fabrics",
            onAction: () => navigate("/fabrics/fabric-table"),
          }
        ]}
      />
      {emptyStateMarkup}
      {tagsMarkup}
    </Page>
  );
}
