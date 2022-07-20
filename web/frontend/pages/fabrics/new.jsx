import { Card, Page, Layout, Checkbox } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { SelectImageCard } from "../../components/SelectImageCard";
import { SelectTagCard } from "../../components/SelectTagCard";
import { TextInputCard } from "../../components/TextInputCard";
import { useState, useCallback } from "react";

// Toggle active/hidden status
function HiddenCheckbox() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  
  return(
    <Card sectioned>
      <Checkbox label="Hide entry" checked={checked} onChange={handleChange}/>
    </Card>
  );
}

export default function NewFabric() {
  const navigate = useNavigate();

  return (
    <Page narrowWidth>
      <TitleBar
        title="New Entry"
        primaryAction={{
          content: "Save",
          onAction: () => console.log("saving fabric"),
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => navigate("/fabrics/fabric-table"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <TextInputCard CardTitle="Name" Caption="Try to keep succinct. This will be present in the fabric selection dropdown menus." MultiLine="false"/>
          <SelectImageCard CardTitle="Upload Image"/>
          <SelectTagCard TagType="Material"/>
          <SelectTagCard TagType="Color"/>
          <HiddenCheckbox/>
          <TextInputCard CardTitle="Notes" Caption="Anything written here will only be visible to you" MultiLine="true"/>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
