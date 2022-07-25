import { Card, Page, Layout, TextContainer, Heading, ChoiceList, TextField, Filters, ResourceList, ResourceItem, TextStyle, Button, Avatar, SkeletonBodyText } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { LoadingCard } from "../../components/LoadingCard";
import { EmptyListCard } from "../../components/EmptyListCard";
import { FabricIndex } from "../../components";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";

export default function FabricTable() {
  const debug = false;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();


  let refetchEntries;
  let loadingEntries;
  let isRefetchingEntries = false;
  let entryList = [];
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
  } else {
    ({ data: entryList,
      refetch: refetchEntries,
      isLoading: loadingEntries,
      isRefetching: isRefetchingEntries,
    } = useAppQuery({
      url: "/api/fabric_entries/index",
      reactQueryOptions: {
        onSuccess: () => {
          setIsLoading(false);
        },
      },
    }));
  }

  // Show Loading card when getting data
  const loadingMarkup = isLoading ? (
    <LoadingCard/>
  ) : null;

  // Show EmptyState card if there's no entries
  const emptyStateMarkup = !isLoading && !entryList?.length ? (
    <EmptyListCard/>
  ) : null;

  // Show FabricIndex if there are entries
  const fabricsMarkup = !isLoading && entryList?.length ? (
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
      {loadingMarkup}
      {emptyStateMarkup}
      {fabricsMarkup}
    </Page>
  );
}
