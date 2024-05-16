import CurrencyInputField, {
  CurrencyInputProps,
} from "react-currency-input-field";

const CurrencyInput = ({ value, onValueChange }: CurrencyInputProps) => {
  return (
    <CurrencyInputField
      /*  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" */
      className={
        " flex h-9 w-full rounded-md border border-input dark:border-blue-from " +
        " bg-transparent dark:bg-dark-additional-bg/40" +
        " px-3 py-1 text-sm shadow-sm " +
        " transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium " +
        " placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 " +
        " focus-visible:ring-blue-from " +
        " disabled:cursor-not-allowed disabled:opacity-50 "
      }
      value={value}
      onValueChange={onValueChange}
      /*   transformRawValue={(value) => {
        return value.replace(".", ",");
      }} */
      allowDecimals
      decimalSeparator="."
      groupSeparator=" "
      prefix="$"
      decimalsLimit={2}
      maxLength={15}
      placeholder="$1 000.00"
    />
  );
};

export default CurrencyInput;
