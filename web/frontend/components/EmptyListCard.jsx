import { Card, EmptyState } from "@shopify/polaris";

export function EmptyListCard() {
  return (
    <Card sectioned>
      <EmptyState
        heading="There are currently no entries"
      >
        <p>Begin populating your database by adding entries using the top right button</p>
      </EmptyState>
    </Card>
  );
}

