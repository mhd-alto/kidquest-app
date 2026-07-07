'use client';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
  value?: any;
  onChange?: (value: any) => void;
}

interface AdminFormProps {
  fields: FormField[];
  values: Record<string, any>;
  onFieldChange: (name: string, value: any) => void;
}

export default function AdminForm({
  fields,
  values,
  onFieldChange,
}: AdminFormProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block font-display font-600 text-sm text-ink mb-2">
            {field.label}
            {field.required && <span className="text-coral">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              value={values[field.name] || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-creamdeep rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
              rows={4}
            />
          ) : field.type === 'select' ? (
            <select
              value={values[field.name] || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              className="w-full px-3 py-2 border border-creamdeep rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <input
              type="checkbox"
              checked={values[field.name] || false}
              onChange={(e) => onFieldChange(field.name, e.target.checked)}
              className="w-4 h-4 accent-coral rounded"
            />
          ) : (
            <input
              type={field.type}
              value={values[field.name] || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-creamdeep rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral"
            />
          )}
        </div>
      ))}
    </div>
  );
}
