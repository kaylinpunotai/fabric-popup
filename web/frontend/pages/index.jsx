import { Card, Page, Layout, TextContainer, Stack, Heading, Button } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { StatsCard } from "../components";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Page narrowWidth>
      <TitleBar title="Fabric Options Editor App" primaryAction={null}/>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Fabric Options Editor App</Heading>
                  <p>
                    This app will help you organize your fabric options so customers can view your inventory. 
                  </p>
                  <Button 
                    onClick = {() => navigate("/fabrics/fabric-table")}>
                    Click here to view fabric database
                  </Button>
                  <li>Add new fabrics</li>
                  <li>Upload pictures for each sample</li>
                  <li>Organize by color and material tags</li>
                  <li>Edit existing properties and images</li>
                  <li>Delete entries that are no longer available</li>
                  <li>Hide entries without deleting them</li>
                  <li>Automatically updates fabric list within Fabric Options Popup section</li>
                  <li>Modify and delete tags</li>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>        
        <Layout.Section>
          <StatsCard />
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Additional Details</Heading>
                  <li>Make sure tags are all typed exactly the same</li>
                  <li>Only one image allowed per entry</li>
                  <li>Notes are not viewable to the customer</li>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
