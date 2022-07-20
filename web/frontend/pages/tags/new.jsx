import { Card, Page, Layout, ChoiceList } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { TextInputCard } from "../../components/TextInputCard";
import { useState, useCallback } from "react";

// Radio button card to select tag category (Material or Color)
function CategoryCard() {
  const [selected, setSelected] = useState(["color"]);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <Card title="Category" sectioned>
      <ChoiceList
        choices={[
          { label: "Color", value: "color" },
          { label: "Material", value: "material" },
        ]}
        selected={selected}
        onChange={handleChange}
      />
    </Card>
  );
}

export default function NewTag() {
  const navigate = useNavigate();

  return (
    <Page narrowWidth>
      <TitleBar
        title="New Tag"
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
      <Layout>
        <Layout.Section>
          <TextInputCard CardTitle="Name" MultiLine="false"/>
          <CategoryCard/>
          <TextInputCard CardTitle="Notes" Caption="Anything written here will only be visible to you" MultiLine="true"/>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
