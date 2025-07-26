import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { StepForm, StepFormProps, Step } from './StepForm';
import { FormField } from '@/molecules/FormField';
import { Input } from '@/atoms/Input';

const meta: Meta<StepFormProps> = {
  title: 'Molecules/StepForm',
  component: StepForm,
  tags: ['autodocs'],
  argTypes: {
    steps: { table: { disable: true } },
    current: { table: { disable: true } },
    validateStep: { table: { disable: true } },
    onChangeStep: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const MultiStepExample: Story = {
  render: () => {
    function Demo() {
      const [current, setCurrent] = useState(0);
      const [values, setValues] = useState<{ name: string; age: string }>({
        name: '',
        age: '',
      });

      const steps: Step[] = [
        {
          id: 'name',
          label: 'Nombre',
          content: (
            <FormField id="name" label="Nombre" required>
              <Input
                name="name"
                value={values.name}
                onChange={(e) =>
                  setValues((v) => ({ ...v, name: e.target.value }))
                }
              />
            </FormField>
          ),
        },
        {
          id: 'age',
          label: 'Edad',
          content: (
            <FormField id="age" label="Edad" required>
              <Input
                name="age"
                type="number"
                value={values.age}
                onChange={(e) =>
                  setValues((v) => ({ ...v, age: e.target.value }))
                }
              />
            </FormField>
          ),
        },
        {
          id: 'summary',
          label: 'Resumen',
          content: (
            <div className="space-y-1">
              <p className="text-sm">Nombre: {values.name}</p>
              <p className="text-sm">Edad: {values.age}</p>
            </div>
          ),
        },
      ];

      const validateStep = (idx: number) => {
        if (idx === 0) return values.name.trim().length > 0;
        if (idx === 1) return values.age.trim().length > 0;
        return true;
      };

      const handleSubmit = (vals: unknown) => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(vals));
      };

      return (
        <StepForm
          steps={steps}
          current={current}
          validateStep={validateStep}
          onChangeStep={setCurrent}
          onSubmit={handleSubmit}
        />
      );
    }
    return <Demo />;
  },
};
