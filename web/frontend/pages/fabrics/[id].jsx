import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { FabricForm } from "../../components/FabricForm";


export default function EditFabric() {
  const debug = true;
  const navigate = useNavigate();
  const breadcrumbs = [{ content: "Fabric Data Table", url: "/fabrics/fabric-table" }];
  var Entry = null;

  if (debug) {
    // Mock values for testing
    Entry = {
      title: "test title",
      // image: "/Users/kaylinpunotai/Desktop/amiscreationsus/fabric-popup/web/frontend/assets/home-trophy.png",
      image: "",
      material: [],
      color: ["Black", "Purple"],
      status: "Hidden",
      notes: "notes test",
    };
  }

  return (
    <Page narrowWidth>
      <TitleBar
        title="Edit Entry"
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
      <FabricForm Entry={Entry} />
    </Page>
  );
}
