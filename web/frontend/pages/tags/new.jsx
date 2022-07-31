import { Page } from "@shopify/polaris";
import { TagForm } from "../../components/TagForm";


export default function NewTag() {
  const breadcrumbs = [{ content: "Tag Data Table", url: "/tags/tag-table" }];

  return (
    <Page narrowWidth>
      <TagForm Title="New Tag" Breadcrumbs={breadcrumbs}/>
    </Page>
  );
}
