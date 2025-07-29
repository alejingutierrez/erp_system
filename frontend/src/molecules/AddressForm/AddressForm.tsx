import * as React from 'react';
import { Input } from '../../atoms/Input';
import { FormField } from '../FormField';
import { DropdownSelect } from '../DropdownSelect';

export interface Option {
  label: string;
  value: string;
  /** Regex string for postal code validation */
  postalPattern?: string;
  /** Placeholder/mask for postal code */
  postalMask?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  phone?: string;
}

export interface AddressFormProps {
  value: Address;
  onChange: (addr: Partial<Address>) => void;
  countries: Option[];
  showPhone?: boolean;
  className?: string;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  value,
  onChange,
  countries,
  showPhone = false,
  className,
}) => {
  const countryOption = React.useMemo(
    () => countries.find((c) => c.value === value.country),
    [countries, value.country],
  );
  const [zipError, setZipError] = React.useState<string | undefined>();

  const handleChange = (
    field: keyof Address,
  ): React.ChangeEventHandler<HTMLInputElement> => (e) => {
    const val = e.target.value;
    if (field === 'postalCode' && countryOption?.postalPattern) {
      const re = new RegExp(countryOption.postalPattern);
      setZipError(re.test(val) ? undefined : 'Código postal inválido');
    }
    onChange({ [field]: val } as Partial<Address>);
  };

  const handleCountryChange = (val: string | string[]) => {
    const newCountry = Array.isArray(val) ? val[0] : val;
    const option = countries.find((c) => c.value === newCountry);
    if (option?.postalPattern && value.postalCode) {
      const re = new RegExp(option.postalPattern);
      setZipError(re.test(value.postalCode) ? undefined : 'Código postal inválido');
    } else {
      setZipError(undefined);
    }
    onChange({ country: newCountry });
  };

  return (
    <form className={className} aria-label="address-form">
      <div className="space-y-4">
        <FormField id="line1" label="Dirección" required>
          <Input
            value={value.line1}
            onChange={handleChange('line1')}
            placeholder="Calle y número"
          />
        </FormField>
        <FormField id="line2" label="Apt/Suite">
          <Input
            value={value.line2 ?? ''}
            onChange={handleChange('line2')}
            placeholder="Opcional"
          />
        </FormField>
        <FormField id="city" label="Ciudad" required>
          <Input value={value.city} onChange={handleChange('city')} />
        </FormField>
        <FormField id="state" label="Estado/Provincia">
          <Input value={value.state ?? ''} onChange={handleChange('state')} />
        </FormField>
        <FormField id="country" label="País" required>
          <DropdownSelect
            options={countries.map((c) => c.label)}
            selected={countryOption?.label}
            onChange={(val) => {
              const option = countries.find((c) => c.label === val);
              if (option) handleCountryChange(option.value);
            }}
          />
        </FormField>
        <FormField
          id="postalCode"
          label="Código postal"
          required
          error={zipError}
        >
          <Input
            value={value.postalCode}
            placeholder={countryOption?.postalMask}
            onChange={handleChange('postalCode')}
            aria-invalid={zipError ? true : undefined}
          />
        </FormField>
        {showPhone && (
          <FormField id="phone" label="Teléfono">
            <Input value={value.phone ?? ''} onChange={handleChange('phone')} />
          </FormField>
        )}
      </div>
    </form>
  );
};
AddressForm.displayName = 'AddressForm';
