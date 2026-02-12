import Calculator from "@/app/calculators/[calculatorSlug]/page";
import "./globals.css";

export default function Page() {
    return <Calculator params={Promise.resolve({calculatorSlug: "cx-cost"})}/>;
}
