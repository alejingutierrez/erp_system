import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AddressForm, Address } from './AddressForm';

const countries = [
  { label: 'España', value: 'ES', postalPattern: '^\\d{5}$', postalMask: '28013' },
  { label: 'Estados Unidos', value: 'US', postalPattern: '^\\d{5}(?:-\\d{4})?$', postalMask: '90210' },
];

const baseAddress: Address = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  country: 'ES',
  postalCode: '',
  phone: '',
};

describe('AddressForm', () => {
  it('fires onChange for each field', () => {
    const changes: Array<Partial<Address>> = [];
    render(
      <AddressForm
        value={baseAddress}
        countries={countries}
        onChange={(val) => changes.push(val)}
        showPhone
      />,
    );
    fireEvent.change(screen.getByLabelText('Dirección'), { target: { value: 'Calle 1' } });
    fireEvent.change(screen.getByLabelText('Apt/Suite'), { target: { value: '2A' } });
    fireEvent.change(screen.getByLabelText('Ciudad'), { target: { value: 'Madrid' } });
    fireEvent.change(screen.getByLabelText('Estado/Provincia'), { target: { value: 'M' } });
    fireEvent.change(screen.getByLabelText('Código postal'), { target: { value: '28013' } });
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '123' } });

    expect(changes.length).toBe(6);
  });

  it('validates postal code using regex', () => {
    render(
      <AddressForm value={baseAddress} countries={countries} onChange={() => {}} />,
    );
    const zip = screen.getByLabelText('Código postal');
    fireEvent.change(zip, { target: { value: 'abc' } });
    expect(screen.getByRole('alert')).toHaveTextContent('Código postal inválido');
    fireEvent.change(zip, { target: { value: '28013' } });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
