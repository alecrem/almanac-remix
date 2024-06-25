import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const siteTitle = process.env.SITE_TITLE || "Remix Almanac";
const siteDescription =
  process.env.SITE_DESCRIPTION ||
  "Daily almanac site made with Remix and supabase";
const timezone = process.env.TIMEZONE;
const options: Intl.DateTimeFormatOptions = {
  timeZone: timezone,
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
const formatter = new Intl.DateTimeFormat(undefined, options);
const getDateStringForTargetTimezone = (): string => {
  const [rawMonth, rawDay, year] = formatter.format(new Date()).split("/");
  const month = Number(rawMonth) > 9 ? rawMonth : `0${rawMonth}`;
  const day = Number(rawDay) > 9 ? rawDay : `0${rawDay}`;
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const loader = async () => {
  const date = getDateStringForTargetTimezone();
  return json({
    events: await prisma.almanac.findFirst({
      where: {
        date: {
          equals: date,
        },
      },
    }),
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: siteTitle },
    { name: "description", content: siteDescription },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{siteTitle}</h1>
      <ul>
        <li>{JSON.stringify(data.events)}</li>
      </ul>
    </div>
  );
}
