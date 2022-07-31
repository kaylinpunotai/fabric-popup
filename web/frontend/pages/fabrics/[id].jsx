import { Page } from "@shopify/polaris";
import { LoadingCard } from "../../components/LoadingCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FabricForm } from "../../components/FabricForm";
import { useAppQuery } from "../../hooks";


export default function EditFabric() {
  const debug = false;
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const breadcrumbs = [{ content: "Fabric Data Table", url: "/fabrics/fabric-table" }];

  let refetchEntry;
  let loadingEntry;
  let isRefetchingEntry = false;
  var entry = null;
  if (debug) {
    // Mock values for testing
    entry = {
      title: "test title",
      image: "",
      material: [],
      color: ["Black", "Purple"],
      status: "Hidden",
      notes: "notes test",
    };
  }
  else {
    ({ data: entry,
      refetch: refetchEntry,
      isLoading: loadingEntry,
      isRefetching: isRefetchingEntry,
    } = useAppQuery({
      url: `/api/fabric_entries/show/${id}`,
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
        <FabricForm Entry={entry} Title="Edit Fabric" Breadcrumbs={breadcrumbs}/>
      </Page>
    );
  }
}
