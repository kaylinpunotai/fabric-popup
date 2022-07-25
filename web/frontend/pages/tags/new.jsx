import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import { TagForm } from "../../components/TagForm";


export default function NewTag() {
  const navigate = useNavigate();
  const breadcrumbs = [{ content: "Tag Data Table", url: "/tags/tag-table" }];

  return (
    <Page narrowWidth>
      <TagForm Title="New Tag" Breadcrumbs={breadcrumbs}/>
    </Page>
  );
}
