import { Card, CardHeader, CardTitle, CardContent } from 'shadcn-ui';

export function WidgetRenderer({ widget }: { widget: { type: string; data: any } }) {
  if (widget.type === 'todo') {
    const items = widget.data.items || [];
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>📝 TODO</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1">
            {items.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
          </ul>
        </CardContent>
      </Card>
    );
  }

  if (widget.type === 'note') {
    return (
      <Card className="mb-4 bg-yellow-50">
        <CardHeader>
          <CardTitle>🗒️ Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{widget.data.text}</p>
        </CardContent>
      </Card>
    );
  }

  if (widget.type === 'chart') {
    const values = widget.data.values || [];
    return (
      <Card className="mb-4 bg-blue-50">
        <CardHeader>
          <CardTitle>📊 Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{values.join(', ')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 bg-red-100">
      <CardHeader>
        <CardTitle>❓ Unknown Widget</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-sm">{JSON.stringify(widget, null, 2)}</pre>
      </CardContent>
    </Card>
  );
}