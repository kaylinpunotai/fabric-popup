import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { EmptyListCard } from "../../components/EmptyListCard";

export default function TagTable() {
  const navigate = useNavigate();

  const tagList = [];

  // Show EmptyState card if there's no entries
  const emptyStateMarkup = !tagList?.length ? (
    <EmptyListCard/>
  ) : null;

  return (
    <Page>
      <TitleBar
        title="Tag Table"
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
    </Page>
  );
}
