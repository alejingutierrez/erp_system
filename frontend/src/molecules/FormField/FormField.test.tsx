import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';
import { Input } from '@/atoms/Input';

describe('FormField', () => {
  it('renders label and helper', () => {
    render(
      <FormField id="name" label="Name" helperText="help">
        <Input />
      </FormField>,
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByText('help')).toBeInTheDocument();
  });

  it('shows error when set', () => {
    const { rerender } = render(
      <FormField id="name" label="Name" helperText="help">
        <Input />
      </FormField>,
    );
    const input = screen.getByLabelText('Name');
    fireEvent.blur(input);
    rerender(
      <FormField id="name" label="Name" error="required">
        <Input />
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('required');
  });

  it('associates label with control', () => {
    render(
      <FormField id="email" label="Email">
        <Input />
      </FormField>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
