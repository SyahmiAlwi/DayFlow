const templates = [
  {
    name: 'Deep Work Morning',
    steps: ['Review goals', 'Block distractions', '90-min focus block', 'Short break'],
    color: 'bg-pastelBlue/60'
  },
  {
    name: 'Wellness Day',
    steps: ['Stretch', 'Hydrate', 'Walk outside', 'Reflect'],
    color: 'bg-pastelLilac/60'
  }
];

export function Templates() {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="text-2xl font-semibold text-slate-900">Templates</h2>
        <p className="text-sm text-slate-600">Save routines you revisit often and drop them into your day.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.name} className={`card p-4 space-y-3 ${template.color}`}>
            <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {template.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <button className="pill bg-white/80 text-slate-800">Use template</button>
          </div>
        ))}
      </div>
    </div>
  );
}
