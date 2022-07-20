import { Card, Page, Layout, TextContainer, Heading, ChoiceList, TextField, Filters, ResourceList, ResourceItem, TextStyle, Button, Avatar } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { EmptyListCard } from "../../components/EmptyListCard";
import { FabricIndex } from "../../components";

export default function FabricTable() {
  const debug = true;
  const navigate = useNavigate();

  // Entry order: {Image, Name, Material, Color, Status, Notes, Actions},
  var entryList = []
  if (debug) {
    // Mock entries for testing
    entryList = [
      {
        image: "",
        name: "entry0",
        material: ["Velvet", "Sponge", "Silk"],
        color: ["Beige", "Black"],
        status: "Active",
        notes: "123456789012345678901234567890",
        actions: "",
      },
      {
        image: "",
        name: "entry1",
        material: [],
        color: ["Beige", "Green"],
        status: "Hidden",
        notes: "testnotes",
        actions: "",
      },
      {
        image: "",
        name: "aasjdlf",
        material: [],
        color: [],
        status: "Active",
        notes: "taksjdljfaks",
        actions: "",
      },
    ]
  }

  // Show EmptyState card if there's no entries
  const emptyStateMarkup = !entryList?.length ? (
    <EmptyListCard/>
  ) : null;

  // Show FabricIndex if there are entries
  const fabricsMarkup = entryList?.length ? (
    <FabricIndex entries={entryList} />
  ) : null;


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
      {fabricsMarkup}
    </Page>
  );
}
