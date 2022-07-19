import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { StatsCard as StatsCard } from "../components";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Fabric Options Editor" primaryAction={null} />
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
                  <Heading>Fabric Options Editor</Heading>
                  <p>
                    This app will help you organize your fabric options so customers can view your inventory. 

                    {/* Your app is ready to explore! It contains everything you
                    need to get started including the{" "}
                    <Link url="https://polaris.shopify.com/" external>
                      Polaris design system
                    </Link>
                    ,{" "}
                    <Link url="https://shopify.dev/api/admin-graphql" external>
                      Shopify Admin API
                    </Link>
                    , and{" "}
                    <Link
                      url="https://shopify.dev/apps/tools/app-bridge"
                      external
                    >
                      App Bridge
                    </Link>{" "}
                    UI library and components.
                  </p>
                  <p>
                    Ready to go? Start populating your app with some sample
                    products to view and test in your store.{" "}
                  </p>
                  <p>
                    Learn more about building out your app in{" "}
                    <Link
                      url="https://shopify.dev/apps/getting-started/add-functionality"
                      external
                    >
                      this Shopify tutorial
                    </Link>{" "}
                    📚{" "} */}



                  </p>
                  <button></button>
                  <li>Add new fabrics</li>
                  <li>Upload pictures for each sample</li>
                  <li>Organize by color and material tags</li>
                  <li>Edit existing properties and images</li>
                  <li>Delete entries that are no longer available</li>
                  <li>Hide entries without deleting them</li>
                  <li>Automatically updates fabric list within Fabric Options Popup section</li>
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
