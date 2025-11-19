export function Settings() {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="text-2xl font-semibold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-600">Personalize DayFlow to match your routine.</p>
      </div>
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900">Auto-update</p>
            <p className="text-sm text-slate-600">The PWA checks for new versions and updates silently.</p>
          </div>
          <span className="pill bg-pastelBlue/70 text-slate-900">Enabled</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900">Offline mode</p>
            <p className="text-sm text-slate-600">Tasks stay available thanks to IndexedDB storage.</p>
          </div>
          <span className="pill bg-pastelLilac/70 text-slate-900">Ready</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900">Rounded style</p>
            <p className="text-sm text-slate-600">Cards use a soft 20px radius for a calm feel.</p>
          </div>
          <span className="pill bg-white/80 text-slate-800">On</span>
        </div>
      </div>
    </div>
  );
}
