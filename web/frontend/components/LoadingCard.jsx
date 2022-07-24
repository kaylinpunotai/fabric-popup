import { Card, SkeletonBodyText } from "@shopify/polaris";
import { Loading } from "@shopify/app-bridge-react";

export function LoadingCard() {
  return (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  );
}

