import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { LoadingCard } from "../../components/LoadingCard";
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { TagForm } from "../../components/TagForm";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";


export default function EditTag() {
  const debug = false;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const fetch = useAuthenticatedFetch();
  const { id } = useParams();
  const breadcrumbs = [{ content: "Tag Data Table", url: "/tags/tag-table" }];

  let refetchTag;
  let loadingTag;
  let isRefetchingTag = false;
  var tag = null;
  if (debug) {
    // Mock values for testing
    tag = {
      name: "test title",
      category: "Material",
      notes: "notes test",
    };
  }
  else {
    ({ data: tag,
      refetch: refetchTag,
      isLoading: loadingTag,
      isRefetching: isRefetchingTag,
    } = useAppQuery({
      url: `/api/tag_entries/show/${id}`,
      reactQueryOptions: {
        onSuccess: () => {
          setIsLoading(false);
        },
      },
    }));
  }

  if (isLoading) {
    return (
    <Page narrowWidth>
      <TitleBar
        title="Edit Tag"
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Save",
          onAction: () => console.log(tag),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => navigate("/tags/tag-table"),
          },
        ]}
      />
      <LoadingCard />
    </Page>
  );
  } else {
    return (
    <Page narrowWidth>
      <TitleBar
        title="Edit Tag"
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Save",
          // onAction: () =>{ fetch(`/api/tag_entries/show/${id}`); },
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
  );}
}
