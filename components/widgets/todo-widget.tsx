export function TodoWidget({ data }) {
  return <div className="widget todo">TODO: {JSON.stringify(data)}</div>;
}