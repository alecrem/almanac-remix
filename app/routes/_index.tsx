import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const siteTitle = process.env.SITE_TITLE || "Remix Almanac";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return {
    url: request.url,
  };
};

export default function Index() {
  const { url } = useLoaderData<typeof loader>();
  const iframeUrl = `${url}today`;
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.8",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 0,
          margin: 0,
        }}
      >
        <iframe
          title={siteTitle}
          src={iframeUrl}
          height="384"
          width="384"
          style={{ border: 0, overflow: "hidden" }}
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </div>
  );
}
