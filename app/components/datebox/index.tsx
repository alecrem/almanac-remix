import "../css/reset.css";
import "../css/remixflex.css";

type Props = {
  date: string;
  month: string;
  event: string;
};

const DateBox = (props: Props) => {
  return (
    <article className={"layout"}>
      <div>
          <h2>
            {props.date}/{props.month}
          </h2>
          <p>{props.event}</p>
      </div>
    </article>
  );
};

export { DateBox };
