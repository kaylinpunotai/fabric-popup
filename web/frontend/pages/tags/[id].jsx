import { Page } from "@shopify/polaris";
import { LoadingCard } from "../../components/LoadingCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TagForm } from "../../components/TagForm";
import { useAppQuery } from "../../hooks";


export default function EditTag() {
  const debug = false;
  const [isLoading, setIsLoading] = useState(true);
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
      <LoadingCard />
    </Page>
  );
  } else {
    return (
      <Page narrowWidth>
        <TagForm Tag={tag} Title="Edit Tag" Breadcrumbs={breadcrumbs}/>
      </Page>
    );
  }
}
