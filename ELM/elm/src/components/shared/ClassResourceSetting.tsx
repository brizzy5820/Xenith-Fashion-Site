"use client";

interface ClassResourceSettingsProps {
  audioVisualEnabled: boolean;
  materialsEnabled: boolean;

  onAudioVisualChange: (enabled: boolean) => void;
  onMaterialsChange: (enabled: boolean) => void;
}

export function ClassResourceSettings({
  audioVisualEnabled,
  materialsEnabled,
  onAudioVisualChange,
  onMaterialsChange,
}: ClassResourceSettingsProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Class Resources
        </h2>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          Choose which learning resources are shown for
          this subject.
        </p>
      </div>

      <div className="space-y-3">
        <SettingRow
          title="Audio / Visual"
          description="Show videos, audio lessons and other visual resources."
          enabled={audioVisualEnabled}
          onChange={onAudioVisualChange}
        />

        <SettingRow
          title="Lecture Materials"
          description="Show PDFs, notes and other downloadable materials."
          enabled={materialsEnabled}
          onChange={onMaterialsChange}
        />
      </div>
    </div>
  );
}

interface SettingRowProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-3 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-800">
          {title}
        </p>

        <p className="mt-0.5 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-brand-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}