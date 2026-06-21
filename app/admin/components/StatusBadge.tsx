interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  let classes =
    "px-3 py-1 rounded-full text-sm font-semibold";

  switch (status) {
    case "NEW":
      classes += " bg-blue-600 text-white";
      break;

    case "CONTACTED":
      classes += " bg-yellow-500 text-black";
      break;

    case "COMPLETED":
      classes += " bg-green-600 text-white";
      break;

    default:
      classes += " bg-slate-600 text-white";
  }

  return (
    <span className={classes}>
      {status}
    </span>
  );
}