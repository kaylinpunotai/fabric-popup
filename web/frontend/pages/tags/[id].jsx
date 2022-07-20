import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { TagForm } from "../../components/TagForm";


export default function EditTag() {
  const debug = true;
  const navigate = useNavigate();
  const breadcrumbs = [{ content: "Tag Data Table", url: "/tags/tag-table" }];
  var tag = null;

  if (debug) {
    // Mock values for testing
    tag = {
      name: "test title",
      category: "Material",
      notes: "notes test",
    };
  }

  return (
    <Page narrowWidth>
      <TitleBar
        title="Edit Tag"
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Save",
          onAction: () => console.log("saving tag"),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => navigate("/tags/tag-table"),
          },
        ]}
      />
      <TagForm Tag={tag} />
    </Page>
  );
}
