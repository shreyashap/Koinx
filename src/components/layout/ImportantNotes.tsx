import React from "react";
import { Info } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

export const ImportantNotes: React.FC = () => {
    return (
        <div className="mb-8">
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="border-none">
                    <div className="relative rounded-sm border border-blue-500/30 bg-blue-500/5 px-6 py-4 transition-all hover:bg-blue-500/10 dark:border-blue-500/10 dark:bg-blue-500/5">
                        <AccordionTrigger className="flex items-start gap-3 p-0 hover:no-underline [&[data-state=open]>div>svg]:rotate-180">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-blue-500 rounded-full p-0.5">
                                    <Info className="h-4 w-4 shrink-0 text-white" />
                                </div>
                                <div className="text-left">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 md:text-base">
                                        Important Notes & Disclaimers
                                    </span>
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="pt-4">
                            <ul className="space-y-3 lg:pl-9 text-justify">
                                {[
                                    "Tax loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.",
                                    "Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.",
                                    "Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.",
                                    "Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.",
                                    "Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted."
                                ].map((note, i) => (
                                    <li key={i} className="list-disc text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        {note}
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
