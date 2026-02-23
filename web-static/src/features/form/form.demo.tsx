// npm i react-hook-form zod @hookform/resolvers
"use client";

import { cn } from "@/lib/utils";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormModel, FormSchema } from "./form.model";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { CButton } from "@/components/custom/CButton";
import { CInput } from "@/components/custom/CInput";
import { COtpInput } from "@/components/custom/COtpInput";
import { CTextarea } from "@/components/custom/CTextarea";
import { CSelect } from "@/components/custom/CSelect";
import { CComboBox } from "@/components/custom/CComboBox";
import {
  CDatePicker,
  CDateRangePicker,
  CInputDatePicker,
  CMultiDatePicker,
  toDate,
  toDateString,
} from "@/components/custom/CDatePicker";
import { CStateComponent } from "@/components/custom/CStateComponent";
import { CCheckBoxGroup } from "@/components/custom/CCheckBox";
import { CRadioGroup } from "@/components/custom/CRadioGroup";
import { CChips } from "@/components/custom/CChips";
import { Slider } from "@/components/ui/slider";

export const DemoForm = (props: { className?: string }) => {
  const optionList = ["Seçenek 0", "Seçenek 1", "Seçenek 2"];

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: FormModel) => {
    console.log(`[C_data]: `, data);
  };

  const onReset = async () => {
    form.reset({});
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="relative">
        <FieldSet>
          <FieldLegend>Form Başlık</FieldLegend>
          <FieldDescription>Form Açıklama</FieldDescription>
          <InputsBlock form={form} />
          <SelectBlock form={form} optionList={optionList} />
          <DateBlock form={form} />
          <OthersBlock form={form} optionList={optionList} />
          <SliderBlock form={form} />
        </FieldSet>
        <Field orientation="horizontal">
          <CButton type="submit">Yazdır</CButton>
          <CButton variant="outline" onClick={onReset}>
            Temizle
          </CButton>
        </Field>
      </FieldGroup>
    </form>
  );
};

const InputsBlock = ({ form }: { form: UseFormReturn }) => {
  return (
    <FieldGroup className="flex flex-row flex-wrap gap-2">
      <Controller
        name="EmailAddress"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex-1 gap-1">
            <FieldLabel htmlFor="form-email">E-Posta</FieldLabel>
            <CInput
              {...field}
              id="form-email"
              type="email"
              autoComplete="email"
              placeholder="E-Posta"
              value={field.value ?? ""}
              aria-errormessage={fieldState.error?.message}
            />
          </Field>
        )}
      />
      <Controller
        name="Password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="flex-1 gap-1">
            <FieldLabel htmlFor="form-password">Şifre</FieldLabel>
            <CInput
              {...field}
              id="form-password"
              type="password"
              autoComplete="current-password"
              placeholder="Şifre"
              value={field.value ?? ""}
              aria-errormessage={fieldState.error?.message}
            />
          </Field>
        )}
      />
      <Controller
        name="OtpInput"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1 gap-1">
            <FieldLabel htmlFor="form-otp">OtpInput</FieldLabel>
            <COtpInput
              {...field}
              id="form-otp"
              maxLength={6}
              value={field.value ?? ""}
            />
          </Field>
        )}
      />
      <Controller
        name="Textarea"
        control={form.control}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel htmlFor="form-textarea">Textarea</FieldLabel>
            <CTextarea
              {...field}
              id="form-textarea"
              placeholder="Textarea..."
              className="h-20 text-sm"
              value={field.value ?? ""}
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
};

const SelectBlock = ({
  form,
  optionList,
}: {
  form: UseFormReturn;
  optionList: string[];
}) => {
  return (
    <FieldGroup className="flex flex-row flex-wrap gap-2">
      <Controller
        name="Select"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1 min-w-50 gap-1">
            <FieldLabel htmlFor="form-select">Select</FieldLabel>
            <CSelect
              {...field}
              id="form-select"
              items={optionList.map((v, i) => ({
                key: i.toString(),
                label: v,
              }))}
              value={(field.value as KeyLabel)?.key ?? ""}
            />
          </Field>
        )}
      />
      <Controller
        name="ComboBox"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1 min-w-50 gap-1">
            <FieldLabel htmlFor="form-combobox">ComboBox</FieldLabel>
            <CComboBox
              {...field}
              id="form-combobox"
              items={optionList.map((v, i) => ({
                key: i.toString(),
                label: v,
              }))}
              value={(field.value as KeyLabel)?.key ?? ""}
            />
          </Field>
        )}
      />
    </FieldGroup>
  );
};

const DateBlock = ({ form }: { form: UseFormReturn }) => {
  return (
    <FieldGroup className="flex flex-row flex-wrap gap-2">
      <Controller
        name="InputDatePicker"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-2 min-w-52 gap-1">
            <FieldLabel htmlFor="form-inputdatepicker">
              InputDatePicker
            </FieldLabel>
            <CInputDatePicker
              {...field}
              id="form-inputdatepicker"
              minDate={new Date(2000, 1, 10)}
              maxDate={new Date(2030, 11, 20)}
              className="flex-2 min-w-52"
              value={field.value ?? null}
            />
          </Field>
        )}
      />
      <Controller
        name="DatePicker"
        control={form.control}
        render={({ field }) => {
          return (
            <Field className="flex-2 min-w-52 gap-1">
              <FieldLabel htmlFor="form-datepicker">DatePicker</FieldLabel>
              <CStateComponent<string>>
                {({ state }) => {
                  return (
                    <CInput
                      {...field}
                      id="form-datepicker"
                      placeholder="Tarih Seç"
                      maxLength={10}
                      value={
                        field.value === undefined ? "" : (state.value ?? "")
                      }
                      onChange={(e) => {
                        state.set(e.target.value);
                        if (e.target.value === "") {
                          field.onChange(undefined);
                          return;
                        }
                        const newDate = toDate(e.target.value);
                        if (newDate) field.onChange(newDate);
                      }}
                      className="overflow-x-auto pr-10"
                    >
                      <CDatePicker
                        minDate={new Date(2000, 1, 10)}
                        maxDate={new Date(2030, 11, 20)}
                        value={field.value ?? null}
                        onChange={(e) => {
                          field.onChange(e);
                          state.set(toDateString(e));
                        }}
                      />
                    </CInput>
                  );
                }}
              </CStateComponent>
            </Field>
          );
        }}
      />
      <Controller
        name="DateRangePicker"
        control={form.control}
        render={({ field }) => {
          return (
            <Field className="flex-3 min-w-64 gap-1">
              <FieldLabel htmlFor="form-daterangepicker">
                DateRangePicker
              </FieldLabel>
              <CStateComponent<string>>
                {({ state }) => {
                  return (
                    <CInput
                      {...field}
                      id="form-daterangepicker"
                      placeholder="Tarih Aralığı Seç"
                      maxLength={23}
                      value={
                        field.value === undefined ? "" : (state.value ?? "")
                      }
                      onChange={(e) => {
                        state.set(e.target.value);
                        if (e.target.value === "") {
                          field.onChange(undefined);
                          return;
                        }
                        const newDate = toDate(e.target.value);
                        if (newDate) field.onChange(newDate);
                      }}
                      className="overflow-x-auto pr-10"
                    >
                      <CDateRangePicker
                        minDate={new Date(2000, 1, 10)}
                        maxDate={new Date(2030, 11, 20)}
                        value={field.value ?? null}
                        onChange={(e) => {
                          field.onChange(e);
                          state.set(toDateString(e));
                        }}
                      />
                    </CInput>
                  );
                }}
              </CStateComponent>
            </Field>
          );
        }}
      />
      <Controller
        name="MultiDatePicker"
        control={form.control}
        render={({ field }) => {
          return (
            <Field className="flex-5 min-w-80 gap-1">
              <FieldLabel htmlFor="form-multidatepicker">
                MultiDatePicker
              </FieldLabel>
              <CInput
                {...field}
                id="form-multidatepicker"
                placeholder="Tarihleri Seç"
                value={toDateString(field.value)}
                className="overflow-x-auto pr-10"
                readOnly
              >
                <CMultiDatePicker
                  minDate={new Date(2000, 1, 10)}
                  maxDate={new Date(2030, 11, 20)}
                  value={field.value ?? null}
                  onChange={field.onChange}
                />
              </CInput>
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
};

const OthersBlock = ({
  form,
  optionList,
}: {
  form: UseFormReturn;
  optionList: string[];
}) => {
  return (
    <FieldGroup className="flex flex-row flex-wrap gap-2">
      <Controller
        name="Checkbox"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1 min-w-64 gap-1 w-fit">
            <FieldTitle>Checkbox</FieldTitle>
            <CCheckBoxGroup
              {...field}
              className="flex flex-wrap border rounded-sm py-1"
              itemList={optionList.map((value, index) => ({
                key: index.toString(),
                value: value,
              }))}
              value={field.value ?? []}
            >
              {({ item }) => <div>{item.value}</div>}
            </CCheckBoxGroup>
          </Field>
        )}
      />
      <Controller
        name="RadioGroup"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1 min-w-64 gap-1 w-fit">
            <FieldTitle>RadioGroup</FieldTitle>
            <CRadioGroup
              {...field}
              className="flex flex-wrap border rounded-sm py-1"
              itemClassName="px-2 py-1 rounded-full hover:bg-accent transition-colors"
              itemList={optionList.map((value, index) => ({
                key: index.toString(),
                value: value,
              }))}
              value={field.value ?? null}
            >
              {({ item }) => <div>{item.value}</div>}
            </CRadioGroup>
          </Field>
        )}
      />
      <Controller
        name="Chips"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1 min-w-64 gap-1 w-fit">
            <FieldTitle>Chips</FieldTitle>
            <CChips
              {...field}
              className="flex flex-wrap border rounded-sm py-1 px-1"
              name="Chips"
              itemList={optionList.map((value, index) => ({
                key: index.toString(),
                value: value,
              }))}
              value={field.value ?? []}
            >
              {({ item, isSelected }) => (
                <div
                  className={cn(
                    "border rounded-full px-3 py-1 border-gray-300 hover:bg-accent",
                    isSelected && "border-(--color-primary)",
                  )}
                >
                  {item.value.toString()}
                </div>
              )}
            </CChips>
          </Field>
        )}
      />
    </FieldGroup>
  );
};

const SliderBlock = ({ form }: { form: UseFormReturn }) => {
  return (
    <FieldGroup className="flex flex-row flex-wrap gap-2">
      <Controller
        name="Slider"
        control={form.control}
        defaultValue={[5, 25]}
        render={({ field }) => {
          return (
            <Field className="flex-1 min-w-52 gap-1">
              <FieldTitle>
                Slider: ({` ${field.value?.[0]} : ${field.value?.[1]} `})
              </FieldTitle>
              <FieldContent>
                <Slider
                  name={field.name}
                  min={0}
                  max={100}
                  step={1}
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                  className="w-full"
                />
              </FieldContent>
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
};
