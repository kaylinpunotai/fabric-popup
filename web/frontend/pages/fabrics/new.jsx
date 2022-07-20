import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { FabricForm } from "../../components/FabricForm";


export default function NewFabric() {
  const navigate = useNavigate();
  const breadcrumbs = [{ content: "Fabric Data Table", url: "/fabrics/fabric-table" }];

  return (
    <Page narrowWidth>
      <TitleBar
        title="New Entry"
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Save",
          onAction: () => console.log("saving fabric"),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => navigate("/fabrics/fabric-table"),
          },
        ]}
      />
      <FabricForm/>
    </Page>
  );
}
