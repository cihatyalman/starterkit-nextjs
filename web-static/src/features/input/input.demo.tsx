"use client";

import { useRef, useState } from "react";
import {
  CInput,
  CInputController,
  CInputHandle,
  getValueById,
  getValueByName,
  getValuesByGroup,
} from "@/components/custom/CInput";
import { CButton } from "@/components/custom/CButton";
import {
  COtpInputController,
  COtpInputHandle,
} from "@/components/custom/COtpInput";
import {
  CTextareaController,
  CTextareaHandle,
} from "@/components/custom/CTextarea";
import { CSelectController, CSelectHandle } from "@/components/custom/CSelect";
import {
  CComboBoxController,
  CComboBoxHandle,
} from "@/components/custom/CComboBox";
import {
  CDatePickerController,
  CDatePickerHandle,
  CDateRangePickerController,
  CDateRangePickerHandle,
  CInputDatePickerController,
  CInputDatePickerHandle,
  CMultiDatePickerController,
  CMultiDatePickerHandle,
  toDate,
  toDateString,
} from "@/components/custom/CDatePicker";
import { CStateComponent } from "@/components/custom/CStateComponent";
import { DateRange } from "react-day-picker";
import {
  CCheckBoxGroupController,
  CCheckBoxGroupHandle,
  getCheckBoxData,
} from "@/components/custom/CCheckBox";
import {
  CRadioGroupController,
  CRadioHandle,
  getRadioData,
} from "@/components/custom/CRadioGroup";
import {
  CChipsController,
  CChipsHandle,
  getChipsData,
} from "@/components/custom/CChips";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export const DemoInputs = (props: { className?: string }) => {
  const optionList = ["Seçenek 0", "Seçenek 1", "Seçenek 2"];

  return (
    <div className="flex flex-col gap-2">
      <InputsBlock />
      <OTPInputBlock />
      <TextareaBlock />
      <SelectBlock optionList={optionList} />
      <DateBlock />
      <CheckBoxBlock optionList={optionList} />
      <RadioGroupBlock optionList={optionList} />
      <ChipsBlock optionList={optionList} />
      <SliderBlock />
    </div>
  );
};

const InputsBlock = (props: { className?: string }) => {
  const emailInputRef = useRef<CInputHandle>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <CInputController
        ref={emailInputRef}
        id="input-email"
        autoComplete="email"
        type="email"
        group="group1"
        aria-label="E-Posta"
        name="EmailAddress"
        aria-errormessage="Bu bir hata mesajı örneğidir"
        required
      />
      <CInput
        id="input-password"
        group="group1"
        aria-label="Şifre"
        name="Password"
        type="password"
      />
      <CButton
        onClick={() => {
          if (!emailInputRef.current?.check()) return;
          console.log(`[C_emailRef]: `, emailInputRef.current?.value);
          console.log(
            `[C_emailid]: `,
            getValueById("input-email", { isCheck: false }),
          );
          console.log(
            `[C_emailName]: `,
            getValueByName("EmailAddress", { isCheck: false }),
          );
          console.log(
            `[C_dataGroup]: `,
            getValuesByGroup("group1", { isCheck: false }),
          );
          emailInputRef.current?.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const OTPInputBlock = () => {
  const otpInputRef = useRef<COtpInputHandle>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <COtpInputController
        ref={otpInputRef}
        name="Input-OtpInput"
        maxLength={6}
        onEnter={(v) => console.log(v)}
        required
      />
      <CButton
        onClick={() => {
          if (!otpInputRef.current?.check()) return;
          console.log(otpInputRef.current.value);
          otpInputRef.current.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const TextareaBlock = () => {
  const textareaRef = useRef<CTextareaHandle>(null);

  return (
    <div className="flex gap-2">
      <CTextareaController
        ref={textareaRef}
        name="Textarea"
        placeholder="Textarea..."
        className="h-20 text-sm"
        onChange={(e) => console.log("[C_textarea]: ", e.target.value)}
      />
    </div>
  );
};

const SelectBlock = (props: { optionList: string[] }) => {
  const selectRef = useRef<CSelectHandle>(null);
  const comboboxRef = useRef<CComboBoxHandle>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <CSelectController
        ref={selectRef}
        name="Input-Select"
        items={props.optionList.map((v, i) => ({
          key: i.toString(),
          label: v,
        }))}
        className="flex-1 min-w-52"
      />
      <CComboBoxController
        ref={comboboxRef}
        name="Input-ComboBox"
        items={props.optionList.map((v, i) => ({
          key: i.toString(),
          label: v,
        }))}
        className="flex-1 min-w-52"
      />
      <CButton
        onClick={() => {
          console.log(
            `[C_Select-ComboBox]: `,
            selectRef.current?.value,
            " - ",
            comboboxRef.current?.value,
          );
          selectRef.current?.clear();
          comboboxRef.current?.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const DateBlock = () => {
  const inputDatePickerRef = useRef<CInputDatePickerHandle>(null);
  const datePickerRef = useRef<CDatePickerHandle>(null);
  const dateRangePickerRef = useRef<CDateRangePickerHandle>(null);
  const multiDatePickerRef = useRef<CMultiDatePickerHandle>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <CInputDatePickerController
        ref={inputDatePickerRef}
        name="Input-InputDatePicker"
        minDate={new Date(2000, 1, 10)}
        maxDate={new Date(2030, 11, 20)}
        className="flex-1"
      />
      <div className="flex-1">
        <CStateComponent<string>>
          {({ state }) => {
            return (
              <CInput
                name="Input-DatePicker"
                placeholder="Tarih Seç"
                maxLength={10}
                value={state.value ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  state.set(v);
                  const newDate = toDate<Date>(v);
                  if (newDate) {
                    datePickerRef.current?.setValue(newDate);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    datePickerRef.current?.open();
                  }
                }}
                className="overflow-x-auto pr-10"
              >
                <CDatePickerController
                  ref={datePickerRef}
                  minDate={new Date(2000, 1, 10)}
                  maxDate={new Date(2030, 11, 20)}
                  onChange={(date) => state.set(toDateString(date))}
                />
              </CInput>
            );
          }}
        </CStateComponent>
      </div>
      <div className="flex-2 min-w-52">
        <CStateComponent<string>>
          {({ state }) => {
            return (
              <CInput
                name="Input-DateRangePicker"
                placeholder="Tarih Aralığı Seç"
                maxLength={23}
                value={state.value ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  state.set(v);
                  const newDate = toDate<DateRange>(v);
                  if (newDate) {
                    dateRangePickerRef.current?.setValue(newDate);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    dateRangePickerRef.current?.open();
                  }
                }}
                className="overflow-x-auto pr-10"
              >
                <CDateRangePickerController
                  ref={dateRangePickerRef}
                  minDate={new Date(2000, 1, 10)}
                  maxDate={new Date(2030, 11, 20)}
                  onChange={(date) => state.set(toDateString(date))}
                />
              </CInput>
            );
          }}
        </CStateComponent>
      </div>
      <div className="flex-3 min-w-64">
        <CStateComponent<string>>
          {({ state }) => {
            return (
              <CInput
                name="Input-MultiDatePicker"
                placeholder="Tarihleri Seç"
                className="overflow-x-auto pr-10"
                value={state.value ?? ""}
                readOnly
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    multiDatePickerRef.current?.open();
                  }
                }}
              >
                <CMultiDatePickerController
                  ref={multiDatePickerRef}
                  minDate={new Date(2000, 1, 10)}
                  maxDate={new Date(2030, 11, 20)}
                  onChange={(date) => state.set(toDateString(date))}
                />
              </CInput>
            );
          }}
        </CStateComponent>
      </div>
      <CButton
        onClick={() => {
          console.log(
            `[C_InputDatePicker]: `,
            inputDatePickerRef.current?.date,
          );
          console.log(`[C_DatePicker]: `, datePickerRef.current?.value);
          console.log(
            `[C_DateRangePicker]: `,
            dateRangePickerRef.current?.value,
          );
          console.log(
            `[C_MultiDatePicker]: `,
            multiDatePickerRef.current?.value,
          );

          inputDatePickerRef.current?.clearInput();
          inputDatePickerRef.current?.clear();
          datePickerRef.current?.clear();
          dateRangePickerRef.current?.clear();
          multiDatePickerRef.current?.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const CheckBoxBlock = (props: { optionList: string[] }) => {
  const checkboxRef = useRef<CCheckBoxGroupHandle>(null);
  return (
    <div className="flex flex-wrap gap-2">
      <CCheckBoxGroupController
        ref={checkboxRef}
        name="Input-CheckBox"
        itemClassName="px-2 py-1 rounded-sm hover:bg-accent transition-colors"
        itemList={props.optionList.map((value, index) => ({
          key: index.toString(),
          value: value,
        }))}
      >
        {({ item }) => <div>{item.value.toString()}</div>}
      </CCheckBoxGroupController>
      <CButton
        className="h-8"
        onClick={() => {
          console.log(`[C_Checkbox_Data]: `, getCheckBoxData("Input-CheckBox"));
          checkboxRef.current?.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const RadioGroupBlock = (props: { optionList: string[] }) => {
  const radioRef = useRef<CRadioHandle>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <CRadioGroupController
        ref={radioRef}
        name="Input-RadioGroup"
        className="flex flex-wrap"
        itemClassName="px-2 py-1 rounded-full hover:bg-accent transition-colors"
        itemList={props.optionList.map((value, index) => ({
          key: index.toString(),
          value: value,
        }))}
      >
        {({ item }) => <div>{item.value}</div>}
      </CRadioGroupController>
      <CButton
        className="h-8"
        onClick={() => {
          console.log(`[C_Radio_Data]: `, getRadioData("Input-RadioGroup"));
          radioRef.current?.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const ChipsBlock = (props: { optionList: string[] }) => {
  const chipsRef = useRef<CChipsHandle>(null);

  return (
    <div className="flex flex-wrap gap-2">
      <CChipsController
        ref={chipsRef}
        name="Input-Chips"
        className="flex flex-wrap items-center gap-2 text-sm"
        itemList={props.optionList.map((value, index) => ({
          key: index.toString(),
          value: value,
        }))}
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
      </CChipsController>
      <CButton
        className="h-8"
        onClick={() => {
          console.log(`[C_Chips_Data]: `, getChipsData("Input-Chips"));
          chipsRef.current?.clear();
        }}
      >
        Yazdır
      </CButton>
    </div>
  );
};

const SliderBlock = () => {
  const [sliderValue, setSliderValue] = useState([5, 25]);

  return (
    <div className="flex gap-2">
      <div className="flex flex-col w-full gap-2">
        <p className="mb-1">Slider: ({sliderValue.join(" : ")})</p>
        <Slider
          name="Slider"
          min={0}
          max={100}
          step={1}
          defaultValue={[5, 25]}
          value={sliderValue}
          className="w-full"
          onValueChange={setSliderValue}
        />
      </div>
    </div>
  );
};
