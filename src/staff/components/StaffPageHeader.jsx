function StaffPageHeader({ title, subtitle, action }) {
  return (
    <header className="rounded-2xl border border-blue-100 bg-white px-6 py-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </header>
  );
}

export default StaffPageHeader;
