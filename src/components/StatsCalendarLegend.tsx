export function StatsCalendarLegend() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 bg-green-200"></div>
        <span>优秀 (≥8h)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 bg-green-100"></div>
        <span>良好 (7-8h)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 bg-yellow-200"></div>
        <span>一般 (6-7h)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 bg-red-200"></div>
        <span>{"不足 (<6h)"}</span>
      </div>
    </div>
  );
}
