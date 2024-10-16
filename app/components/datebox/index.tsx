type Props = {
  date: string;
  month: string;
  event: string;
};

const DateBox = (props: Props) => {
  return (
    <article className={"bg-neutral-300 p-8 aspect-square min-w-96 max-w-96"}>
      <div className={"bg-white p-8 aspect-square"}>
        <div className={"text-black align-middle min-h-max h-max"}>
          <h2 className={"text-black text-5xl font-bold text-right"}>
            {props.date}/{props.month}
          </h2>
          <p className={"mt-16 text-lg font-light"}>{props.event}</p>
        </div>
      </div>
    </article>
  );
};

export { DateBox };
