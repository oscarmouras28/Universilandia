import { type InputHTMLAttributes, forwardRef } from "react";

export interface DefaultInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const DefaultInput = forwardRef<HTMLInputElement, DefaultInput>(
  ({ label, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="font-semibold text-[18px]">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className="w-full rounded-full border border-black px-3 py-1.5 outline-none focus:border-[#555454]"
          {...props}
        />
      </div>
    );
  }
);

export default DefaultInput;
