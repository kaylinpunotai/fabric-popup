import { Card, Page, Layout, TextContainer, Heading, SkeletonBodyText } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { LoadingCard } from "../../components/LoadingCard";
import { EmptyListCard } from "../../components/EmptyListCard";
import { TagIndex } from "../../components";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { useState } from "react";


export default function TagTable() {
  const debug = false;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();

  let refetchTags;
  let loadingTags;
  let isRefetchingTags = false;
  let tagList = [];
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
    setIsLoading(false);
  } else {
    ({ data: tagList,
      refetch: refetchTags,
      isLoading: loadingTags,
      isRefetching: isRefetchingTags,
    } = useAppQuery({
      url: "/api/tag_entries/index",
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
  const emptyStateMarkup = !isLoading && !tagList?.length ? (
    <EmptyListCard/>
  ) : null;

  // Show TagIndex if there are tags
  const tagsMarkup = !isLoading && tagList?.length ? (
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
      {loadingMarkup}
      {emptyStateMarkup}
      {tagsMarkup}
    </Page>
  );
}
