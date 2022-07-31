import { Page } from "@shopify/polaris";
import { FabricForm } from "../../components/FabricForm";


export default function NewFabric() {
  const breadcrumbs = [{ content: "Fabric Data Table", url: "/fabrics/fabric-table" }];

  return (
    <Page narrowWidth>
      <FabricForm Title="New Fabric" Breadcrumbs={breadcrumbs}/>
    </Page>
  );
}
