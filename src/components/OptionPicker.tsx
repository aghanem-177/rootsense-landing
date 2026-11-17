import type { ChoiceGroup } from '../data/products'

interface OptionPickerProps {
  group: ChoiceGroup
  value: string | undefined
  onChange: (choiceId: string) => void
}

export default function OptionPicker({ group, value, onChange }: OptionPickerProps) {
  const selected = group.choices.find((c) => c.id === value)
  const isSwatch = group.choices.some((c) => c.swatch)

  return (
    <fieldset>
      <legend className="text-sm font-semibold">
        {group.legend}
        <span className="font-normal text-muted">{selected ? `: ${selected.label}` : ': choose one'}</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
        {group.choices.map((choice) => (
          <label key={choice.id} className={`choice ${isSwatch ? 'flex-col' : ''}`}>
            <input
              type="radio"
              name={group.id}
              value={choice.id}
              checked={value === choice.id}
              onChange={() => onChange(choice.id)}
              className="sr-only"
            />
            {isSwatch ? (
              <>
                <span className="choice-swatch" style={{ background: choice.swatch }} aria-hidden="true" />
                <span className="text-sm">{choice.label}</span>
              </>
            ) : (
              <span className="choice-pill">
                <span className="choice-dot" aria-hidden="true" />
                {choice.label}
              </span>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
