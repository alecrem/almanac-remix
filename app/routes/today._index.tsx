import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { DateBox } from "~/components";
import { prisma } from "~/lib/db.server";

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
const dateFormatter = new Intl.DateTimeFormat("es-ES", options);

const getDateStringForTargetTimezone = (): string => {
  const [rawDay, rawMonth, year] = dateFormatter.format(new Date()).split("/");
  const month = Number(rawMonth) > 9 ? rawMonth : `0${rawMonth}`;
  const day = Number(rawDay) > 9 ? rawDay : `0${rawDay}`;
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

type AlmanacEvent = {
  events: {
    id: number;
    date: string | Date;
    title: string | null;
    notes: string | null;
  } | null;
};

export const loader = async () => {
  const date = getDateStringForTargetTimezone();
  const data: AlmanacEvent = await json({
    events: await prisma.almanac.findFirst({
      where: {
        date: {
          equals: date,
        },
      },
    }),
  }).json();
  const returnedDate: string | Date | undefined = data.events?.date;
  if (typeof returnedDate !== "string") {
    return { month: "00", day: "00", title: "Error" };
  }
  return {
    month: returnedDate.substring(5, 7),
    day: returnedDate.substring(8, 10),
    title: data.events?.title,
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: siteTitle },
    { name: "description", content: siteDescription },
  ];
};

export default function Today() {
  const { month, day, title } = useLoaderData<typeof loader>();
  return (
    <>
      <DateBox date={day} month={month} event={title || ""} />
    </>
  );
}
