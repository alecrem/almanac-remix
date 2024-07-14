import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

const siteTitle = process.env.SITE_TITLE || "Remix Almanac";
const siteDescription =
  process.env.SITE_DESCRIPTION ||
  "Daily almanac site made with Remix and supabase";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({
    url: request.url,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: siteTitle },
    { name: "description", content: siteDescription },
  ];
};

export default function Index() {
  const { url } = useLoaderData<typeof loader>();
  const iframeUrl = `${url}today`;
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <iframe
          title={siteTitle}
          src={iframeUrl}
          height="380"
          width="380"
          style={{ border: 0, overflow: "hidden" }}
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </div>
  );
}
