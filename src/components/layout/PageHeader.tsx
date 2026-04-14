interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, badge, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
      <div>
        {badge && (
          <span className="inline-block text-xs font-medium text-brand-green
            bg-brand-green/10 px-2 py-1 rounded-full mb-2">
            {badge}
          </span>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-xl">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
