type AlertProps = {
  title?: string;
  description: string;
};

export function Alert({ title = 'Ops!', description }: AlertProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900"
    >
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-sm">{description}</div>
    </div>
  );
}